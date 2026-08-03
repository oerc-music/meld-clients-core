MELD Clients Core
=================
A React.js library providing common MELD web page elements, graph traversal actions, rendering and interaction handlers, and state reducers. 

For an overview of the MELD (Music Encoding and Linked Data) Framework, please see: [oerc-music/meld](http://github.com/oerc-music/meld). 

To include the MELD Clients Core in your MELD app, add the following entry to the dependencies in your application's package.json file:

```
"meld-clients-core": "oerc-music/meld-clients-core"
```

MELD Clients Core depends on a number of npm modules, including React, Redux, and Redux-Thunk (web application framework), solid-auth-client (authenticated HTTP communication with Solid Pods), and "jsonld" and "n3" (Linked Data functionalities around RDF graph handling and JSON-LD conversion). A full list of dependencies is available in the package.json file.

Distribution
------------

This library is normally installed directly via github so we include the compiled output in the respositopry.
Recompile the source and commit it when you make a change.

```
npm ci
npm run build
```

Use `npm ci` rather than `npm install` to install dependencies from package-lock.

To upgrade a dependency, change `package.json`, run `npm install` once, and commit `package-lock.json`

Credits
-------

MELD Clients Core also includes JavaScript components of Verovio, a music engraving library developed by the RISM Digital Center (see [rism-digital/verovio](http://github.com/rism-digital/verovio) repository).
