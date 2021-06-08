"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prefix = void 0;

var _prefix;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var prefix = (_prefix = {
  annotation: "https://meld.linkedmusic.org/annotations/",
  compVocab: "https://meld.linkedmusic.org/companion/vocab/",
  mei: "https://meld.linkedmusic.org/mei/",
  meldterm: "https://meld.linkedmusic.org/terms/",
  workset: "https://meld.linkedmusic.org/worksets/",
  rdf: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
  popRoles: "http://pop.linkedmusic.org/roles/",
  mo: "http://purl.org/ontology/mo/",
  ldp: "http://www.w3.org/ns/ldp#",
  mp: "http://id.loc.gov/authorities/performanceMediums/",
  oa: "http://www.w3.org/ns/oa#",
  dct: "http://purl.org/dc/terms/",
  frbr: "http://purl.org/vocab/frbr/core#",
  rdfs: "http://www.w3.org/2000/01/rdf-schema#",
  meld: "https://meld.linkedmusic.org/terms/",
  motivation: "https://meld.linkedmusic.org/motivation/",
  so: "http://www.linkedmusic.org/ontologies/segment/"
}, _defineProperty(_prefix, "dct", "http://purl.org/dc/terms/"), _defineProperty(_prefix, "climb", "http://meld.linkedmusic.org/climb/terms/"), _defineProperty(_prefix, "mc", "http://meld.linkedmusic.org/climb/muzicodeTypes/"), _defineProperty(_prefix, "dbp", "http://dbpedia.org/page/"), _prefix);
exports.prefix = prefix;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWJyYXJ5L3ByZWZpeGVzLmpzIl0sIm5hbWVzIjpbInByZWZpeCIsImFubm90YXRpb24iLCJjb21wVm9jYWIiLCJtZWkiLCJtZWxkdGVybSIsIndvcmtzZXQiLCJyZGYiLCJwb3BSb2xlcyIsIm1vIiwibGRwIiwibXAiLCJvYSIsImRjdCIsImZyYnIiLCJyZGZzIiwibWVsZCIsIm1vdGl2YXRpb24iLCJzbyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBTyxJQUFNQSxNQUFNO0FBQ2xCQyxFQUFBQSxVQUFVLEVBQUUsMkNBRE07QUFFbEJDLEVBQUFBLFNBQVMsRUFBRSwrQ0FGTztBQUdsQkMsRUFBQUEsR0FBRyxFQUFFLG1DQUhhO0FBSWxCQyxFQUFBQSxRQUFRLEVBQUUscUNBSlE7QUFLbEJDLEVBQUFBLE9BQU8sRUFBRSx3Q0FMUztBQU1sQkMsRUFBQUEsR0FBRyxFQUFFLDZDQU5hO0FBT2xCQyxFQUFBQSxRQUFRLEVBQUUsbUNBUFE7QUFRbEJDLEVBQUFBLEVBQUUsRUFBRSw4QkFSYztBQVNsQkMsRUFBQUEsR0FBRyxFQUFFLDJCQVRhO0FBVWxCQyxFQUFBQSxFQUFFLEVBQUUsbURBVmM7QUFXbEJDLEVBQUFBLEVBQUUsRUFBRSwwQkFYYztBQVlsQkMsRUFBQUEsR0FBRyxFQUFFLDJCQVphO0FBYWxCQyxFQUFBQSxJQUFJLEVBQUUsa0NBYlk7QUFjbEJDLEVBQUFBLElBQUksRUFBRSx1Q0FkWTtBQWVsQkMsRUFBQUEsSUFBSSxFQUFFLHFDQWZZO0FBZ0JsQkMsRUFBQUEsVUFBVSxFQUFFLDBDQWhCTTtBQWlCbEJDLEVBQUFBLEVBQUUsRUFBRTtBQWpCYyxtQ0FrQmIsMkJBbEJhLHFDQW1CWCwwQ0FuQlcsa0NBb0JkLGtEQXBCYyxtQ0FxQmIsMEJBckJhLFdBQVoiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgcHJlZml4ID0ge1xuXHRhbm5vdGF0aW9uOiBcImh0dHBzOi8vbWVsZC5saW5rZWRtdXNpYy5vcmcvYW5ub3RhdGlvbnMvXCIsXG5cdGNvbXBWb2NhYjogXCJodHRwczovL21lbGQubGlua2VkbXVzaWMub3JnL2NvbXBhbmlvbi92b2NhYi9cIixcblx0bWVpOiBcImh0dHBzOi8vbWVsZC5saW5rZWRtdXNpYy5vcmcvbWVpL1wiLFxuXHRtZWxkdGVybTogXCJodHRwczovL21lbGQubGlua2VkbXVzaWMub3JnL3Rlcm1zL1wiLFxuXHR3b3Jrc2V0OiBcImh0dHBzOi8vbWVsZC5saW5rZWRtdXNpYy5vcmcvd29ya3NldHMvXCIsXG5cdHJkZjogXCJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjXCIsXG5cdHBvcFJvbGVzOiBcImh0dHA6Ly9wb3AubGlua2VkbXVzaWMub3JnL3JvbGVzL1wiLFxuXHRtbzogXCJodHRwOi8vcHVybC5vcmcvb250b2xvZ3kvbW8vXCIsXG5cdGxkcDogXCJodHRwOi8vd3d3LnczLm9yZy9ucy9sZHAjXCIsXG5cdG1wOiBcImh0dHA6Ly9pZC5sb2MuZ292L2F1dGhvcml0aWVzL3BlcmZvcm1hbmNlTWVkaXVtcy9cIixcblx0b2E6IFwiaHR0cDovL3d3dy53My5vcmcvbnMvb2EjXCIsXG5cdGRjdDogXCJodHRwOi8vcHVybC5vcmcvZGMvdGVybXMvXCIsXG5cdGZyYnI6IFwiaHR0cDovL3B1cmwub3JnL3ZvY2FiL2ZyYnIvY29yZSNcIixcblx0cmRmczogXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwLzAxL3JkZi1zY2hlbWEjXCIsXG5cdG1lbGQ6IFwiaHR0cHM6Ly9tZWxkLmxpbmtlZG11c2ljLm9yZy90ZXJtcy9cIixcblx0bW90aXZhdGlvbjogXCJodHRwczovL21lbGQubGlua2VkbXVzaWMub3JnL21vdGl2YXRpb24vXCIsXG5cdHNvOiBcImh0dHA6Ly93d3cubGlua2VkbXVzaWMub3JnL29udG9sb2dpZXMvc2VnbWVudC9cIixcblx0ZGN0OiBcImh0dHA6Ly9wdXJsLm9yZy9kYy90ZXJtcy9cIixcblx0Y2xpbWI6IFwiaHR0cDovL21lbGQubGlua2VkbXVzaWMub3JnL2NsaW1iL3Rlcm1zL1wiLFxuXHRtYzogXCJodHRwOi8vbWVsZC5saW5rZWRtdXNpYy5vcmcvY2xpbWIvbXV6aWNvZGVUeXBlcy9cIixcblx0ZGJwOiBcImh0dHA6Ly9kYnBlZGlhLm9yZy9wYWdlL1wiXG59XG4iXX0=