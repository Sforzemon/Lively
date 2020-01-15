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
            $("#bandName").text(recentSearch.bandName);
            $("#bandBio").append($("<p>", {id: "bandSummary"}));
            var editedBio = response.artist.bio.slice(0,-68)
            $("#bandSummary").text(editedBio);
            console.log(response.artist.name)
            console.log(response.artist.bio.content.slice(0,-68))

            



        });
    };
});