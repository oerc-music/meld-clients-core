Climb! MELD Client
===========
To install:
-----------
	npm install

To run: (default port: 8080)
----------------------------
	npm start

To start a game:
----------------
- 	Ensure meld server is running (seeAlso: [http://github.com/oerc-music/meld](http://github.com/oerc-music/meld) )
- 	Go to http://127.0.0.1:8080/startTheClimb
- 	Click on "Start the Climb"
- 	A new session for the basecamp stage will be created and loaded

On stage load:
--------------
- 	MELD-client will post the current session identifier to http://localhost:3000/input
	* modify muzicodesUri at the top of meld-client/src/container/climb.js if necessary
-  In response, muzicodes should post a createNextSession annotation to MELD (see "Creating a session" below)

When a muzicode triggers:
-------------------------
- 	Determine **$MC_URI** as the score, stage name, "#", and mc name (as per [https://github.com/cgreenhalgh/fast-performance-demo/blob/master/scoretools/test/mkGameEngine-meld.json](https://github.com/cgreenhalgh/fast-performance-demo/blob/master/scoretools/test/mkGameEngine-meld.json))
	* e.g. http://127.0.0.1:5000/score/basecamp#BC_Ending1
* 	 GET the current session, determine **$ETag** by the ETag response header
* 	 POST annotation to the current session as follows:

---------
	#headers
	{
		"Content-Type": "application/ld+json", 
		"If-None-Match": $ETag
	}
---
	#body
	{
		"oa:hasTarget": { "@id": $MC_URI },
		"oa:motivatedBy": { "@id": "motivation:muzicodeTriggered" }
	}
	
* check the response status.
	* if it's 201 (CREATED) we are done
	* if it's 412 (PRECONDITION FAILED), the file changed before our POST got through - so repeat GET and POST steps, updating $ETag
* When the POST gets through (i.e. 201 CREATED), the MELD-Client will:
	* highlight the appropriate MEI elements in a colour determined based on the MC's type (choice, challenge, disklavier)
	* create and queue a new session for the stage determined by the MC's **cue**
	

When the footpedal triggers:
-------------------------------
-	 Repeat the above steps for when a muzicode triggers, but use the following body (where **$Session_URI** is the *current* session's identifier as POSTed to Muzicodes on stage load):

----
	#body for footpedal annotation
	{
		"oa:hasTarget": { "@id": $Session_URI},
		"oa:motivatedBy": { "@id": "motivation:nextPageOrPiece" }
	}


Creating a session
------------------
- MELD will automatically create new sessions to present stages that are cued in response to muzicode triggerings. But we still need a default for the case where no muzicode triggers.
- To set this up, muzicodes must POST the following annotation on each stage load after receiving the session identifer from MELD (headers as above). $NextStageURI is score URI path plus stage name, e.g. 'http://127.0.0.1:5000/score/1a':
----
	#body for queueing up default next stage on stage load
	{
		"oa:hasTarget": { "@id": $Session_URI},
		"oa:motivatedBy": { "@id": "motivation:createNextSession" },
		"oa:hasBody": { "@id": $NextScoreURI}
	}
