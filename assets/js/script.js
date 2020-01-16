
$( document ).ready(function() {
    var artistName = "";
    var savedSearches = [];
        if (localStorage.getItem('savedSearches') !== null) {
            savedSearches = JSON.parse(localStorage.getItem('savedSearches'));  
        } 
    

    $(document).on('keypress',function(event) {
        if(event.which == 13) {
            event.preventDefault();
            artistName = $("#getArtistName").val().trim();
            getBand();
        }
    });
    $("#topNavSearch").on("click", function(event) {
        event.preventDefault();
        artistName = $("#getArtistName").val().trim();
        getBand();
    });
    // function myFavorites() {

    //     savedSearches.unshift(recentSearch)
    //     localStorage.setItem("savedSearches", JSON.stringify(savedSearches));
    // }



    function getBand() {
        var lastFMURLbio = "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + artistName + "&api_key=7ee5b384da21658ce5fd68901750d490&format=json";        
        var lastFMURLTopTracks = "http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=" + artistName + "&api_key=7ee5b384da21658ce5fd68901750d490&format=json";
        $.ajax({
            url: lastFMURLbio,
            method: "GET"
        }).then(function(response) {
            $("h4").remove();
            var theBand = $("<h4>", {"class": "ml-2 d-inline-block my-auto"});
            $("#bandName").append(theBand)
            theBand.empty()
            theBand.text(response.artist.name);
            $("#bandBio").text(response.artist.bio.content);
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
            });
        });
    };
});

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

