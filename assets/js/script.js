
$( document ).ready(function() {
    var artistName = "";
    var savedSearches = [];

    function setArtist(){
        artistSaved = JSON.parse(localStorage.setItem('#getArtistName'))
    }
    function localeGet(){
        if (localStorage.getItem('savedSearches') !== null) {
            savedSearches = JSON.parse(localStorage.getItem('savedSearches'));  
        } 
    }
        
    

    $(document).on('keypress',function(event) {
        if(event.which == 13) {
            event.preventDefault();
            artistName = $("#getArtistName").val().trim();
            getBand();
            setArtist();
            localeGet();
        }
    });

    $("#topNavSearch").on("click", function(event) {
        event.preventDefault();
        artistName = $("#getArtistName").val().trim();
        getBand();
        getGiphy();
    });
    // function myFavorites() {

    //     savedSearches.unshift(recentSearch)
    //     localStorage.setItem("savedSearches", JSON.stringify(savedSearches));
    // }



    function getBand() {
        var lastFMURL = "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + artistName + "&api_key=7ee5b384da21658ce5fd68901750d490&format=json";        
        $.ajax({
            url: lastFMURL,
            method: "GET"
        }).then(function(response) {
            var recentSearch = {
                bandName: response.artist.name,
                id: response.artist.stats.listeners
            }

            $("#bandName").text(recentSearch.bandName);

            $("#bandBio").append($("<p>", {id: "bandSummary"}));

            var editedBio = response.artist.bio.slice(0,-68)

            $("#bandSummary").text(editedBio);

            console.log(response.artist.name);
<<<<<<< HEAD
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
                    var lastFMURLAlbumInfo = "http://ws.audioscrobbler.com/2.0/?method=album.getinfo&artist=" + artistName + "&album=" + albumName + "&api_key=7ee5b384da21658ce5fd68901750d490&format=json"
                    console.log(response.topalbums.album[0].name)
                    $.ajax({
                        url: lastFMURLAlbumInfo,
                        method: "GET"
                    }).then(function(response) {
                        var albumImg = response.album.image[2]["#text"];
                        $("#topAlbum").attr("src", albumImg)
                        console.log(albumImg)
                        // document.querySelector("#kvov2 > span.blockInner > span:nth-child(3) > span.blockInner > span:nth-child(1) > span.s > span > a")
                                                    $.ajax({
                                                        url: tasteURL,
                                                        crossOrigin: true,
                                                        dataType: "jsonp",
                                                        method: "GET"
                                                    }).then(
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
                                                               $("#youtube-left").attr("data-theVideo", "mainSearchArtistYURL");
                                                            console.log(response.Similar)

                                                        }));
                
                });
            });
=======

            console.log(response.artist.bio.content.slice(0,-68));

            
            



>>>>>>> 679aeb58008b150eeea722ac0922fce31f61f5b4
        });
    };
});

function getGiphy(){
    artistName = $("#getArtistName").val().trim();
    var giphyURL = "http://api.giphy.com/v1/gifs/search?q=" + artistName + "&api_key=UyP7yHq6GHhRpGn3p7vtXmNOnjY2UMXT";
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

