
$( document ).ready(function() {
    var initialArtistArray = ['Adele' , 'blink-182', 'Lana Del Rey', 'Ninja Sex Party', '"Weird Al” Yankovic', 'Max Richter', 'Eminem', 'Sizzla', 'Sonu Nigam', 'Young Thug', 'R. D. Burman', 'slayer', 'rush', '雅-miyavi-', 'Johnny cash'];
   // Setting the varible for the locale storage 
    var artistName = "";
    var savedSearches = [];
    // Grabbing items from locale storage
        if (localStorage.getItem('savedSearches') !== null) {
            savedSearches = JSON.parse(localStorage.getItem('savedSearches'));      
        } 
    
    // Allows user to press enter to see search results
    $(document).on('keypress',function(event) {
        if(event.which == 13) {
            event.preventDefault();
            artistName = $("#getArtistName").val().trim();
            getBand();
        }
    });
    // click listener for the saved artist 
    $(document).on('click', '.dropdown-item', function(event){
        event.preventDefault();
        // artistName = $('#getArtistName').val().trim();

        artistName = $(this).text();
        console.log(artistName);
        getBand();
    });

    // click listener for the search 
    $("#topNavSearch").on("click", function(event) {
        event.preventDefault();
        artistName = $("#getArtistName").val().trim();
        getBand();
    });
    // click to save artist searched 
    $("#loveThisBand").on("click", function(e) {
        e.preventDefault();
        console.log($(this));
        myFavorites()
    });

    // function for saved search
    function myFavorites() {
        var loveTheseGuys = $('h4').text()
        var favoriteBands = {
            name: loveTheseGuys,
            value: $('h4').text()
        }
        
        console.log($('h4').text())
        savedSearches.unshift(favoriteBands)
        localStorage.setItem("savedSearches", JSON.stringify(savedSearches));
        addFav();
      
    }
    // function for the artist selected in the favorited artist menu
    function addFav() {
        if (savedSearches.length == 0){
            console.log("saved searches is 0")
            randoStartup();
        }
        else { $("#putFavoritesHere").find('*').not('.dropdown-header').remove();
        for (i=0; i<savedSearches.length; i++) {
            var newAnchor = $("<a>", {"class": "dropdown-item"})
            $("#putFavoritesHere").append(newAnchor);
            newAnchor.text(savedSearches[i].value);
            console.log("add dem divs... well anchors")
        } 
        artistName = savedSearches[0].name;
        getBand();  
        }

    }
    
    $(window).on('load', function(event){
        event.preventDefault();
        addFav();
        // console.log('string');
    })



    $(document).on("click", ".anotherArtist", function(event) {
        event.preventDefault();
        artistName = $(this).siblings().children("h3").text();
        getBand();
   
    })

    function randoStartup() {
        artistName = initialArtistArray[Math.floor(Math.random()*initialArtistArray.length)];
        getBand()
    }

    // Gets band info with 5 api 
    function getBand() {
        var lastFMURLbio = "https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + artistName + "&api_key=7ee5b384da21658ce5fd68901750d490&format=json";        
        var lastFMURLTopTracks = "https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=" + artistName + "&api_key=7ee5b384da21658ce5fd68901750d490&format=json";
        var lastFMURLTopAlbum = "https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=" + artistName + "&api_key=7ee5b384da21658ce5fd68901750d490&format=json";
        var tasteURL = "https://tastedive.com/api/similar?q=" + artistName + "&k=353205-Lively-TT1A0QYZ&verbose=1"
        $(".facebook").attr("href", "https://www.facebook.com/search/pages/?q=" + artistName);
        $(".twitter").attr("href", "https://twitter.com/search?q=" + artistName);
        $(".instagram").attr("href", "https://www.instagram.com/explore/tags/" + artistName);
        $.ajax({
            url: lastFMURLbio,
            method: "GET"
        }).then(function(response) {
            $("h4").remove();
            var theBand = $("<h4>", {"class": "ml-2 d-inline-block my-auto"});
            $("#bandName").append(theBand)
            theBand.empty()
            theBand.text(response.artist.name);
            var bandBioTest = response.artist.bio.content;
            bandBioTest = bandBioTest.split(', C')[0];
            console.log(bandBioTest)
            if (bandBioTest === "WRONG NAME") {
                bandBioTest = "Sorry, this artist is lacking an up to date Bio."
                $("#bandBio").text(bandBioTest)
            }
            else {
                $("#bandBio").text(response.artist.bio.content);
            }
            console.log(response.artist.name);
            console.log(response.artist.bio.content);
            $.ajax({
                url: lastFMURLTopTracks,
                method: "GET"
            }).then(function(response) {
                var trackGold = response.toptracks.track[0].name;
                var scrobblesOne = response.toptracks.track[0].playcount;
                var trackSilver = response.toptracks.track[1].name;
                var scrobblesTwo = response.toptracks.track[1].playcount;
                var trackBronze = response.toptracks.track[2].name;
                var scrobblesThree = response.toptracks.track[2].playcount;
                $(".oneTrack").text(trackGold);
                $(".oneScrobble").text (scrobblesOne + " times!");
                $(".twoTrack").text(trackSilver);
                $(".twoScrobble").text (scrobblesTwo + " times!");
                $(".threeTrack").text(trackBronze);
                $(".threeScrobble").text (scrobblesThree + " times!");
                $.ajax({
                    url: lastFMURLTopAlbum,
                    method: "GET"
                }).then(function(response) {
                    var albumName = response.topalbums.album[0].name;
                    var lastFMURLAlbumInfo = "https://ws.audioscrobbler.com/2.0/?method=album.getinfo&artist=" + artistName + "&album=" + albumName + "&api_key=7ee5b384da21658ce5fd68901750d490&format=json"
                    console.log(response.topalbums.album[0].name)
                    $.ajax({
                        url: lastFMURLAlbumInfo,
                        method: "GET"
                    }).then(function(response) {
                        var albumImg = response.album.image[2]["#text"];
                        $("#topAlbum").attr("src", albumImg)
                        console.log(albumImg)
                            $.ajax({
                                url: tasteURL,
                                crossOrigin: true,
                            dataType: "jsonp",
                                method: "GET"
                            }).then(function(response) {
                                var similarArtistOne = response.Similar.Results[0].Name;
                                var similarArtistTwo = response.Similar.Results[1].Name;
                                var similarArtistThree = response.Similar.Results[2].Name;
                                var mainSearchArtistYURL = response.Similar.Info[0].yUrl;
                                    $("#youtube-left").attr("data-theVideo", mainSearchArtistYURL);
                                console.log(response.Similar.Info[0].yUrl)  
                                console.log(response)
                                $(".similarArtistOne").text(similarArtistOne)
                                $(".similarArtistTwo").text(similarArtistTwo)
                                $(".similarArtistThree").text(similarArtistThree)
                            })
                        });
                
                });
            });
        });
    };
});
// giph will be implemented in a later build 
function getGiphy(){
    artistName = $("#getArtistName").val().trim();
    var giphyURL = "https://api.giphy.com/v1/gifs/search?q=" + artistName + "&api_key=UyP7yHq6GHhRpGn3p7vtXmNOnjY2UMXT";
    $.ajax({
        url: giphyURL,
        method: "GET"
    }).then(function(data){
        
        console.log(data);
        
    })
}


autoPlayYouTubeModal();

//FUNCTION TO GET AND AUTO PLAY YOUTUBE VIDEO FROM DATATAG
function autoPlayYouTubeModal() {
    var trigger = $("body").find('[data-toggle="modal"]');
    trigger.click(function () {
        var theModal = $(this).data("target"),
            videoSRC = $(this).attr("data-theVideo"),
            videoSRCauto = videoSRC + "?autoplay=1";
        $(theModal + ' iframe').attr('src', videoSRCauto);
        $(theModal + ' button.close').click(function () {
            $(theModal + ' iframe').attr('src', videoSRC);
        });
    });
}

