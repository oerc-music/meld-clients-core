# v. 2.0.0
## 2021-05-21
* Graph Traversal:
  * Deprecate old (pre-v1.0.0) traversal functions
  * Refactor traversal options for JSON-LD and RDF serialisations
  * Skolemize blank nodes during traversal to prevent (bnode) identifier clashes across multiple documents
  * Improvements to traversal engine efficiency
  * Add traversalPool reducer for improved traversal management
  * Simplify mechanism for checking for processing completion of traversal outcomes
  * Rename parameters for traversal constraint specification; warn and map when old names are used.
  * Update timeSensitiveImage component to use MELD traversal engine
* New components:
  * Essay, EssayLinks (TEI)
  * Video, VideoLinks
  * Orchestral ribbon
* Updated components:
  * Add caching support and improve performance of Score component
  * Improved Verovio options tracking and setting for Score reducer
  * Add onScroll callback to TEI component
  * Fork Carousel component to support newer react version
* Solid pods and authentication:
  * Integrate solid-auth-client to support authenticated HTTP access to Solid pods
  * Ensure HTTP POSTed resources (e.g., Web Annotations) are not blank nodes
* Other updates and functionality changes:
  * Support running callback functions after postAnnotation calls
  * Add hooks to annotate scores at render time
  * Add prefix file
  * Update versions of all core dependencies, most notably react, redux, babel, jsonld
