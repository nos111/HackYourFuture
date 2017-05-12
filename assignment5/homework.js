
// Home work using only JavaScript with an extra condition to check if the search box is empty
var searchBox = document.getElementById("search-box");
searchBox.onkeyup = function(){
    var searchTerm = document.getElementById('search-box').value;
    if (searchTerm != "") {
        getJsonFile(searchTerm);
        } else {
        alert("Please enter a movie name");
        var listDiv = document.getElementById("container");
        listDiv.innerHTML = " ";
    }

};

function getJsonFile (term) {
    var jsonFile = "http://www.omdbapi.com/?s=" + term;
    var jsonRequest = new XMLHttpRequest();
    jsonRequest.onreadystatechange = function () {
        if (jsonRequest.readyState === 4) {
            createMoviesList(jsonRequest);
        }
    }  
    jsonRequest.open("GET",jsonFile);
    jsonRequest.send();

};

function createMoviesList (data) {
    var parsedJson = JSON.parse(data.responseText);
    var moviesInfo = parsedJson.Search;
    var output = '<ul id= "list">';
    for (var i = 0; i < moviesInfo.length; i++ ) {
        output += '<li class="item" id="item' + i + '">';
        output += '<a href=' + "http://www.imdb.com/title/" + moviesInfo[i].imdbID +'>';
        output += '<h2 id="text' +i + '">' + moviesInfo[i].Title +' ' + moviesInfo[i].Year + '</h2>';
        output += '<img id="img' + i + '" class="images"  src=' + moviesInfo[i].Poster +'>'
        output += '</a>'
        output += '</li>';
    };
    output += '</ul>'
    var listDiv = document.getElementById("container");
    listDiv.innerHTML = output;
    document.onmouseover = function (e) {
        for (var i =0; i<moviesInfo.length; i++) {
            if (e.target.id == ("text" + i)) {
                document.getElementById(("img"+i)).style.visibility = "visible";
                document.getElementById(("item"+i)).style.height = "500px";
            } else {
                document.getElementById(("img"+i)).style.visibility = "hidden";
                document.getElementById(("item" + i)).style.height = "auto";
                }
        }
    }

};




/*
// HomeWork using Jquery (makes it much shorter)
$("#search-box").keyup(function(){
    var searchTerm = $("#search-box").val();
    var jsonFile = "http://www.omdbapi.com/?s=" + searchTerm;
    $.getJSON(jsonFile,function(data){
    
        var items = [];
        $.each(data,function(key,value) {
            items.push(value);
        });
        var output = '<ul id= "list">';
        $.each(items[0], function(key,value){
            output += '<li class="item">';
            output += '<a href=' + "http://www.imdb.com/title/" + value.imdbID +'>';
            output += '<h2 class="text">' + value.Title +' ' + value.Year + '</h2>';
            output += '<img class="images" src=' + value.Poster +'>'
            output += '</a>'
            output += '</li>';
        });
        output += '</ul>'
        $("#container").html(output);
        $(".images").addClass("images");
        $(".item").hover(function(){
            console.log("Hovered");
            $( this ).find("img").removeClass("images");
        }, function(){
            $( this ).find("img").addClass("images");
        })
        
        
    });

});
*/

// My old homework 
/*
var searchResults = {"Search":[{"Title":"Black Cat, White Cat","Year":"1998","imdbID":"tt0118843","Type":"movie","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BMmExZTZhN2QtMzg5Mi00Y2M5LTlmMWYtNTUzMzUwMGM2OGQ3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"},{"Title":"The Cat in the Hat","Year":"2003","imdbID":"tt0312528","Type":"movie","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BMTI5MDU3MTYyMF5BMl5BanBnXkFtZTYwODgyODc3._V1_SX300.jpg"},{"Title":"Cat on a Hot Tin Roof","Year":"1958","imdbID":"tt0051459","Type":"movie","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BMzFhNTMwNDMtZjY3Yy00NzY3LWI1ZWQtZTQxMWJmODVhZWFkXkEyXkFqcGdeQXVyNjQzNDI3NzY@._V1_SX300.jpg"},{"Title":"The Cat Returns","Year":"2002","imdbID":"tt0347618","Type":"movie","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BMTQ5ODMyNTgzOV5BMl5BanBnXkFtZTcwNDM4ODAyNw@@._V1_SX300.jpg"},{"Title":"Cat People","Year":"1982","imdbID":"tt0083722","Type":"movie","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BMTQ1MjI5MDE2M15BMl5BanBnXkFtZTgwMTY0MjEyMDE@._V1_SX300.jpg"},{"Title":"Cat People","Year":"1942","imdbID":"tt0034587","Type":"movie","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BNzI4YWY0NWQtNWI5YS00MGE4LWE4YTgtMzBmOWIwMzdiYTRiL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg"},{"Title":"A Street Cat Named Bob","Year":"2016","imdbID":"tt3606888","Type":"movie","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BMTY5MTI1MzE5Nl5BMl5BanBnXkFtZTgwMjQzNjEzOTE@._V1_SX300.jpg"},{"Title":"Cat Ballou","Year":"1965","imdbID":"tt0059017","Type":"movie","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BMTQ2MDA4MzA5Nl5BMl5BanBnXkFtZTcwMjQ1NjkxMQ@@._V1._CR0,0,267,428_SX89_AL_.jpg_V1_SX300.jpg"},{"Title":"A Cat in Paris","Year":"2010","imdbID":"tt1673702","Type":"movie","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BMTAzODU0NDExMTNeQTJeQWpwZ15BbWU3MDk2NjMxMzc@._V1_SX300.jpg"},{"Title":"Fritz the Cat","Year":"1972","imdbID":"tt0068612","Type":"movie","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BODAzMjI5YzMtNWI5Yy00NTllLWE0MWQtOWMzZTRjMmYyYTFlL2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"}],"totalResults":"1057","Response":"True"};
console.log(searchResults.Search[2].Title);

function createList () {
    for(var i = 0; i < searchResults.Search.length; i++) {
        var arrayHolder = searchResults.Search[i];
        var probertiesList = document.createElement("ul");
        probertiesList.setAttribute("style","height:300px");
        var titleItem = document.createElement("li");
        titleItem.setAttribute("style","width:50%;float:left");
        var titleItemText = document.createTextNode("Title:" + " " +arrayHolder.Title);
        container.appendChild(probertiesList);
        probertiesList.appendChild(titleItem);
        titleItem.appendChild(titleItemText);
        var yearItem = document.createElement("li");
        yearItem.setAttribute("style","width:50%;float:right;clear:right");
        var yearItemtext = document.createTextNode("Year:" + " "+ arrayHolder.Year);
        yearItem.appendChild(yearItemtext);
        probertiesList.appendChild(yearItem);
        var urlItem = document.createElement("li");
        urlItem.setAttribute("style","width:50%;float:right;clear:right");
        var urlAncor = document.createElement("a");
        urlAncor.setAttribute("id", "link_holder");
        urlAncor.setAttribute("href", "http://www.imdb.com/title/" + arrayHolder.imdbID);
        var urlText = document.createTextNode("URL: http://www.imdb.com/title/" + arrayHolder.imdbID);
        urlAncor.appendChild(urlText);
        urlItem.appendChild(urlAncor);
        probertiesList.appendChild(urlItem);
        var imageItem = document.createElement("li");
        imageItem.setAttribute("style","width:50%;float:right;clear:right");
        var imageHolder = document.createElement("img");
        imageHolder.setAttribute("src",arrayHolder.Poster);
        imageHolder.setAttribute("style","width:50%");
        imageItem.appendChild(imageHolder);
        probertiesList.appendChild(imageItem);
     }
    
}
createList(); */


