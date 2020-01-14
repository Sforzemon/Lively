Criteria to be met:
Must use at least two server-side APIs
Must use a CSS framework other than Bootstrap
Must be interactive (i.e: accept and respond to user input)
Use at least one new third-party API
Must have a polished UI
Must meet good quality coding standards
Does not use alerts, confirms or prompts (look into modals)
Must be deployed to GitHub Pages

Presentation Requirements
Use this project presentation template (https://docs.google.com/presentation/d/1_u8TKy5zW5UlrVQVnyDEZ0unGI2tjQPDEpA0FNuBKAw/edit#slide=id.p) to address the following:
Elevator pitch: a one minute description of your application
Concept: What is your user story? What was your motivation for development?
Process: What were the technologies used? How were tasks and roles broken down and assigned? What challenges did you encounter? What were your successes?
Demo: Show your stuff!
Directions for Future Development
Links to the deployed application and the GitHub repository

Grading Metrics:
Metric  -    Concept    Design      Functionality   Collaboration   Presentation
Weight  -    10%        20%         30%             30%             10%




Navbar header with Brand name, search bar, and button.  On mobile screen, will become two centered bars that will span the screen.
Search a band name to display: Band image - Band name and a brief bio, a list of top songs, a link to a youtube video to have embedded and then a list of similar artists.

Navbar Search reach out to APIs LastFM, TasteDive, Giphy?

Last FM will retrieve top songs for the band, band Bio, and band picture.
TasteDive will retrieve similar artists and youtube videos
Giphy, maybe to bring up a gif of the band.

Div row
Div Col-3 <-- this is for a side bar that I would like to append to.
div Col-9 <-- Main body will contain band name, info, ordered list of top songs, and an embedded youtube video of #1
div row
div col-12 <-- hold 3-5 similar artist cards
footer 

lastfm documentation - https://www.last.fm/api/intro
TasteDive documentation - https://tastedive-api-documentation.readthedocs.io/en/latest/
giphy documentation - https://developers.giphy.com/docs/api/
genius documentation - https://docs.genius.com/

Pressing the search button, or hitting enter will take the value of the search bar and use it as our keyterm for searching.

lastfm - artist name(response.artist.name) - bio(response.artist.bio.summary) - top tracks[this will need a different ajax query](response.toptracks.track[i].name & response.toptracks.track.playcount & response.toptracks.track.url)
tastedive - similar artists(response.Similar.Results[i].Name & response.Similar.Results[i].Name) - youtube video(response.Similar.Info.yUrl)
giphy - random gif of artist(response.data[0].images.original.url)
