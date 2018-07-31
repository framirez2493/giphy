// Initial array of movies
$(".container").css("background-image", "url('assets/images/back.jpg')");
var giphys = ["the simpson","super sayain blue","cat", "dog", "bird", "lion", "tiger", "chile verde", "you are fired", "baby rockstar", "donald trump", "zombie", "the lion king", "the wizard of oz"];

$('input:text').focus(
    function () {
        $(this).val('');
    });


// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayGiphy() {

    var giphy = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        giphy + "&api_key=1wdTAPbsTvxF5DZPiPYF38UAJORoxjzC&limit=3";

    // Creating an AJAX call for the specific  button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        var results = response.data
        // ========================
        console.log(results);
        for (var i = 0; i < results.length; i++) {
            var giphyDiv = $("<div>");//id='gifimg' class='col-md-4'
            var p = $("<p>").text(results[i].rating);
            var t = $("<p>").text(results[i].title);
            var giphyImage = $("<img>");
            giphyImage.attr({ 'data-animate': results[i].images.fixed_height.url });
            giphyImage.attr("src", results[i].images.fixed_height_still.url);
            giphyImage.attr({ 'data-state': "still" });
            giphyImage.attr({ 'data-still': results[i].images.fixed_height_still.url });
            giphyImage.addClass('giphyImage');
            giphyDiv.append(p, t, giphyImage);
            $("#gifs-appear-here").prepend(giphyDiv);
        }
        //put on click button for animating the image

        // Putting the entire movie above the previous movies
    });

}

// Function for displaying movie data
function renderButtons() {

    // Deleting the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();


    // Looping through the array of movies
    for (var i = 0; i < giphys.length; i++) {

        // Then dynamicaly generating buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of movie-btn to our button
        a.addClass("giphy-btn");
        // Adding a data-attribute
        a.attr("data-name", giphys[i]);
        // Providing the initial button text
        a.text(giphys[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
    }
    //    $(".giphyImage").on("click", function () {
    //          
    // //        console.log(state);
    //       if (state === "still") {
    //             $(this).attr("src", $(this).attr("data-animate"));
    //           $(this).attr("data-state", "animate");
    //       } else {
    //           $(this).attr("src", $(this).attr("data-still"));
    //           $(this).attr("data-state", "still");
    //           
    //        }
    //        console.log(state);
    // });
}

// This function handles events where a movie button is clicked
$("#add-giphy").on("click", function (event) {
    event.preventDefault();

    // This line grabs the input from the textbox
    var giphy = $("#giphy-input").val().trim();
    //value equals 0 alert your input is empty or you can delete alaert and stop from submitting empy
    if (giphy == "") {
        alert("your input is empty");
        return false;
        console.log(this);
    };



    // Adding movie from the textbox to our array
    giphys.push(giphy);


    // Calling renderButtons which handles the processing of our movie array
    renderButtons();

});

// Adding a click event listener to all elements with a class of "movie-btn"
$(document).on("click", ".giphy-btn", displayGiphy)
$(document).on("click", ".giphyImage", function () {

    var state = $(this).attr("data-state");
    console.log(state);
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");

    }
    console.log(this);
});





// Calling the renderButtons function to display the intial buttons
renderButtons();
