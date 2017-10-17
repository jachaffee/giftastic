
var topics = ["Charlie Chaplin", "elephants", "Tom Waits", "dogs", "X-Men", "reading", "Bob's Burgers", "Parks and Rec"]

function renderButtons() {

	$("#button-area").empty();

	for (var i = 0; i < topics.length; i++) {

		var a = $("<button class='btn'>");

		a.addClass("topic");

		a.attr("data-name", topics[i]);

		a.text(topics[i]);

		$("#button-area").append(a);
	}
}

$("#submit-button").on("click", function(event) {

	 event.preventDefault();

	 var newTopic = $("#new-topic").val().trim();

	 topics.push(newTopic);

	 renderButtons();
}); 

function displayGifs() {

	var favoriteThing = $(this).attr("data-name");

	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + favoriteThing + "&api_key=dc6zaTOxFJmzC&limit=10";

	$.ajax({
          url: queryURL,
          method: "GET"
        })

	.done(function(response) {
		var results = response.data;

		for (var i = 0; i < results.length; i++) {

			if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
				
				var gifDiv = $("<div class ='item'>");

				var rating = results[i].rating;

				var p = $("<p>").text("Rating: " + rating);

				var favThingImage = $("<img>");

				favThingImage.attr("src", results[i].images.fixed_height_still.url);

				favThingImage.attr("data-animate", results[i].images.fixed_height.url);

				favThingImage.attr("data-still", results[i].images.fixed_height_still.url)

				favThingImage.attr("state","still");

				favThingImage.addClass("gif");

				gifDiv.append(p);

				gifDiv.append(favThingImage);

				$("#gif-area").prepend(gifDiv);

			}
		} 
	});
}

$(document).on("click", ".gif", function() {
	
	var state = $(this).attr("state");
	
	if (state === "still") {
		console.log("still firing off");
		$(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("state", "animate");
      } 
    else {
    	
    	console.log("animate firing off");
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("state", "still");
	}
});

$(document).on("click", ".topic", displayGifs);

renderButtons();