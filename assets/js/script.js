
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

            console.log(response.artist.bio.content.slice(0,-68));

            
            



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

