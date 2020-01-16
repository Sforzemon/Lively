
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
        var lastFMURL = "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + artistName + "&api_key=7ee5b384da21658ce5fd68901750d490&format=json";        $.ajax({
            url: lastFMURL,
            method: "GET"
        }).then(function(response) {
            var recentSearch = {
                bandName: response.artist.name,
                id: response.artist.stats.listeners
            }
            $("h4").remove();
            var theBand = $("<h4>", {"class": "ml-2 d-inline-block my-auto"});
           
            $("#bandName").append(theBand)
            theBand.empty()
            theBand.text(recentSearch.bandName);
            $("#bandBio").text(response.artist.bio.content)
            console.log(response.artist.name)
            console.log(response.artist.bio.content)
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

