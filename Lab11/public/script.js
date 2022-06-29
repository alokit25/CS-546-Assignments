$("#showList").hide();
$("#show").hide();
$("#homeLink").hide();
let tvShows = [];
let httpRequest = new XMLHttpRequest();

httpRequest.onload = function () {
  tvShows = JSON.parse(this.responseText);

  for (let i = 0; i < tvShows.length; i++) {
    let tvShow = tvShows[i];
    let name = tvShow.name;
    let url = tvShow._links.self.href;

    let listEle = $("<li>");
    let linkEle = $("<a>", { html: name, href: url });

    listEle.on("click", function (event) {
      clickLink(event);
    });
    linkEle.appendTo(listEle);
    listEle.appendTo("#showList");
    $("#show").hide();
    $("#showList").show();
  }
};

httpRequest.open("GET", "http://api.tvmaze.com/shows");
httpRequest.send();

$("#searchForm").submit(function (event) {
  let searchTerm = $("#search_term").val();

  searchTerm = searchTerm.trim();

  if (!searchTerm) {
    alert("Search term is required and cannot be empty spaces");
    return;
  }

  event.preventDefault();

  $("#showList").empty();

  let searchRequest = new XMLHttpRequest();

  searchRequest.onload = function () {
    tvShows = JSON.parse(this.responseText);

    for (let i = 0; i < tvShows.length; i++) {
      let show = tvShows[i];
      let showName = show.show.name;
      let showUrl = show.show._links.self.href;

      let listEle = $("<li>");
      let linkEle = $("<a>", { html: showName, href: showUrl });

      listEle.on("click", function (event) {
        clickLink(event);
      });
      linkEle.appendTo(listEle);
      listEle.appendTo("#showList");
      $("#show").hide();
      $("#showList").show();
    }
  };

  searchRequest.open(
    "GET",
    "http://api.tvmaze.com/search/shows?q=" + searchTerm
  );
  searchRequest.send();
});

function clickLink(event) {
  event.preventDefault();

  $("#showList").hide();
  $("#show").empty();

  let url = event.target.href;
  let getShowRequest = new XMLHttpRequest();

  getShowRequest.onload = function () {
    if (this.responseText) {
      let show = JSON.parse(this.responseText);
      let naText = "N/A";

      let h1 = $("<h1>", { html: show.name });
      h1.appendTo("#show");

      let image = show.image;
      if (image && image.medium) {
        image = image.medium;
      } else {
        image = "noimage.jpeg";
      }
      let img = $("<img>", { src: image });
      img.appendTo("#show");

      let dl = $("<dl>");

      let dtLang = $("<dt>", { html: "Language:" });
      let ddLang = $("<dd>", { html: show.language || naText });
      dtLang.appendTo(dl);
      ddLang.appendTo(dl);

      let dtGenres = $("<dt>", { html: "Genres:" });
      let ulGenre = $("<ul>");

      for (let j = 0; j < show.genres.length; j++) {
        let genre = show.genres[j];
        let li = $("<li>", { html: genre });
        li.appendTo(ulGenre);
      }
      dtGenres.appendTo(dl);
      ulGenre.appendTo(dl);

      let rating = show.rating;
      if (rating && rating.average) {
        rating = rating.average;
      } else {
        rating = naText;
      }
      let dtRating = $("<dt>", { html: "Average Rating:" });
      let ddRating = $("<dd>", { html: rating });
      dtRating.appendTo(dl);
      ddRating.appendTo(dl);

      let dtNetwork = $("<dt>", { html: "Network:" });
      let network = show.network;
      if (network && network.name) {
        network = show.network.name;
      } else {
        network = "N/A";
      }
      let ddNetwork = $("<dd>", { html: network });
      dtNetwork.appendTo(dl);
      ddNetwork.appendTo(dl);

      let dtSummary = $("<dt>", { html: "Summary:" });
      let ddSummary = $("<dd>", { html: show.summary || naText });
      dtSummary.appendTo(dl);
      ddSummary.appendTo(dl);

      dl.appendTo("#show");

      $("#show").show();
      $("#homeLink").show();
    }
  };

  getShowRequest.open("GET", url);
  getShowRequest.send();
}
