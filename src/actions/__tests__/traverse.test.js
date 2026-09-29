/**
 * @jest-environment jsdom
 */
import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";

// jsonld's node entry point loads through the `esm` shim, which does not run
// under jest. The traversal only needs expand/flatten to pass data through.
jest.mock("jsonld", () => ({
  __esModule: true,
  default: {
    expand: jest.fn(async (doc) => doc),
    flatten: jest.fn(async (doc) => doc),
    frame: jest.fn(),
  },
}));

import {
  registerTraversal,
  traverse,
  setFetchFunction,
  FETCH_GRAPH_DOCUMENT,
  TRAVERSAL_FAILED,
} from "../index";
import TraversalPoolReducer from "../../reducers/reducer_traversalPool";
import SessionControlReducer from "../../reducers/reducer_sessionControl";
import GraphReducer from "../../reducers/reducer_graph";

const DOC = "https://usera.solidcommunity.net/timeline/1.jsonld";

function jsonResponse(status, body) {
  const headers = { "content-type": "application/ld+json" };
  return {
    status,
    ok: status >= 200 && status < 300,
    headers: { get: (name) => headers[name.toLowerCase()] ?? null },
    json: () => Promise.resolve(body),
    text: () => Promise.resolve(JSON.stringify(body)),
  };
}

function makeStore() {
  const actions = [];
  const recorder = () => (next) => (action) => {
    if (typeof action !== "function") {
      actions.push(action);
    }
    return next(action);
  };
  const store = createStore(
    combineReducers({
      traversalPool: TraversalPoolReducer,
      sessionControl: SessionControlReducer,
      graph: GraphReducer,
    }),
    applyMiddleware(thunk, recorder),
  );
  return { store, actions };
}

// One node with only literal values, so no further hops are registered.
const document1 = [
  {
    "@id": DOC + "#it",
    "http://example.org/label": [{ "@value": "hello" }],
  },
];

const flush = () => new Promise((resolve) => setTimeout(resolve, 0));

let log;
beforeEach(() => {
  log = jest.spyOn(console, "log").mockImplementation(() => {});
});
afterEach(() => {
  log.mockRestore();
});

function startTraversal(store) {
  store.dispatch(registerTraversal(DOC, { numHops: 1 }));
  const params = store.getState().traversalPool.pool[DOC];
  expect(params).toBeDefined();
  store.dispatch(traverse(DOC, params));
  expect(store.getState().traversalPool.running).toBe(1);
}

test("a successful hop adds the document to the graph and finishes with running at 0", async () => {
  const { store, actions } = makeStore();
  store.dispatch(
    setFetchFunction(jest.fn().mockResolvedValue(jsonResponse(200, document1))),
  );
  startTraversal(store);
  await flush();
  await flush();
  expect(actions.filter((a) => a.type === FETCH_GRAPH_DOCUMENT)).toHaveLength(
    1,
  );
  expect(store.getState().graph.graphDocs).toEqual([DOC]);
  expect(store.getState().traversalPool.running).toBe(0);
});

test("a non-2xx response fails the hop cleanly with running at 0", async () => {
  const { store, actions } = makeStore();
  // A 429 body has no Content-Type we can parse; before the guard this threw
  // inside the content-type handling.
  const response = {
    status: 429,
    ok: false,
    headers: { get: () => null },
    json: () => Promise.reject(new Error("no body")),
  };
  store.dispatch(setFetchFunction(jest.fn().mockResolvedValue(response)));
  startTraversal(store);
  await flush();
  expect(actions.filter((a) => a.type === TRAVERSAL_FAILED)).toHaveLength(1);
  expect(actions.filter((a) => a.type === FETCH_GRAPH_DOCUMENT)).toHaveLength(
    0,
  );
  expect(store.getState().traversalPool.running).toBe(0);
});
