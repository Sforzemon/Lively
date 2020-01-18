# Lively
One place to find your favorite artist and new ones at the same time.

## User Story

As a music listener 

I want to know artist top tracks and similar artist

So I can listen to song I love but also want to discover new artist at the same time.

### Description 

This application works by having the user enter a artist name and Lively makes 5 different api calls from 2 sites; https://www.last.fm/api/, and https://tastedive.com/read/api. The first three calls from last.fm api get artist Bio, Top Tracks, Top Albums, and the last call tastedive gathers similar artists and youtube videos.

#### Installation/Usage
http://sforzemon.github.io
Pressing the search button, or hitting enter will take the value of the search bar and use it as our keyterm for searching.
 Search a band name to display: Band image - Band name and a brief bio, a list of top songs, a link to a youtube video to have embedded and then a list of similar artists.
Last FM will retrieve top songs for the band, band Bio, and band picture. TasteDive will retrieve similar artists and youtube videos.
![alt test](assets/images/Lively.png)
![alt test](assets/images/Lively2.png)
##### Built With

* JQUERY
* Live.fm API
* TasteDiv API
* LOVE

###### Authors 

* **ZVLU**
* **Sforzemon**
* **elee0888**

##### MIT License

Copyright (c) 2020 Sforzemon, ZVLU, elee0888

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

