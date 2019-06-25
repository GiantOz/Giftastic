$(document).ready(function() {

  var people = [
    "Barack Obama", "Michelle Obama", "Ghandi", "Malcolm X", "Beyonce", "goldfish",
    "Jay Z", "ferNotorious B.I.G.", "2pac", "Allen Ierson", "Magic Johnson",
    "Michael Jackson", "Janet Jackson", "Missy Elliot", "Prince", "Sam Cooke",
    "Alex Haley", "Serena Williams", "Angela Davis", "Venus Williams",
  ];

  // function to make buttons and add to page
  function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
    $(areaToAddTo).empty();

    for (var i = 0; i < arrayToUse.length; i++) {
      var a = $("<button>");
      a.addClass(classToAdd);
      a.attr("data-type", arrayToUse[i]);
      a.text(arrayToUse[i]);
      $(areaToAddTo).append(a);
    }

  }

  $(document).on("click", ".person-button", function() {
    $("#people").empty();
    $(".person-button").removeClass("active");
    $(this).addClass("active");

    var type = $(this).attr("data-type");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=v0yHsYdIO2zGiKOj7SerqK9sHmEt3xaX&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          var personDiv = $("<div class=\"person-item\">");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var animated = results[i].images.fixed_height.url;
          var still = results[i].images.fixed_height_still.url;

          var personImage = $("<img>");
          personImage.attr("src", still);
          personImage.attr("data-still", still);
          personImage.attr("data-animate", animated);
          personImage.attr("data-state", "still");
          personImage.addClass("person-image");

          personDiv.append(p);
          personDiv.append(personImage);

          $("#people").append(personDiv);
        }
      });
  });

  $(document).on("click", ".person-image", function() {

    var state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  $("#add-person").on("click", function(event) {
    event.preventDefault();
    var newperson = $("input").eq(0).val();

    if (newperson.length > 2) {
      people.push(newperson);
    }

    populateButtons(people, "person-button", "#person-buttons");

  });

  populateButtons(people, "person-button", "#person-buttons");
});
