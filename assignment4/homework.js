var searchResults = {"Search":[{"Title":"Black Cat, White Cat","Year":"1998","imdbID":"tt0118843","Type":"movie","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BMmExZTZhN2QtMzg5Mi00Y2M5LTlmMWYtNTUzMzUwMGM2OGQ3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"},{"Title":"The Cat in the Hat","Year":"2003","imdbID":"tt0312528","Type":"movie","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BMTI5MDU3MTYyMF5BMl5BanBnXkFtZTYwODgyODc3._V1_SX300.jpg"},{"Title":"Cat on a Hot Tin Roof","Year":"1958","imdbID":"tt0051459","Type":"movie","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BMzFhNTMwNDMtZjY3Yy00NzY3LWI1ZWQtZTQxMWJmODVhZWFkXkEyXkFqcGdeQXVyNjQzNDI3NzY@._V1_SX300.jpg"},{"Title":"The Cat Returns","Year":"2002","imdbID":"tt0347618","Type":"movie","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BMTQ5ODMyNTgzOV5BMl5BanBnXkFtZTcwNDM4ODAyNw@@._V1_SX300.jpg"},{"Title":"Cat People","Year":"1982","imdbID":"tt0083722","Type":"movie","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BMTQ1MjI5MDE2M15BMl5BanBnXkFtZTgwMTY0MjEyMDE@._V1_SX300.jpg"},{"Title":"Cat People","Year":"1942","imdbID":"tt0034587","Type":"movie","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BNzI4YWY0NWQtNWI5YS00MGE4LWE4YTgtMzBmOWIwMzdiYTRiL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg"},{"Title":"A Street Cat Named Bob","Year":"2016","imdbID":"tt3606888","Type":"movie","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BMTY5MTI1MzE5Nl5BMl5BanBnXkFtZTgwMjQzNjEzOTE@._V1_SX300.jpg"},{"Title":"Cat Ballou","Year":"1965","imdbID":"tt0059017","Type":"movie","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BMTQ2MDA4MzA5Nl5BMl5BanBnXkFtZTcwMjQ1NjkxMQ@@._V1._CR0,0,267,428_SX89_AL_.jpg_V1_SX300.jpg"},{"Title":"A Cat in Paris","Year":"2010","imdbID":"tt1673702","Type":"movie","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BMTAzODU0NDExMTNeQTJeQWpwZ15BbWU3MDk2NjMxMzc@._V1_SX300.jpg"},{"Title":"Fritz the Cat","Year":"1972","imdbID":"tt0068612","Type":"movie","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BODAzMjI5YzMtNWI5Yy00NTllLWE0MWQtOWMzZTRjMmYyYTFlL2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"}],"totalResults":"1057","Response":"True"};
console.log(searchResults.Search[2].Title);

var click = document.getElementById("click");
setTimeout(createList,5000);
function createList () {
    alert("Congratulation you have clicked and you may see the cat's movie list :)")
    document.getElementById("click").innerHTML = ("")
    var container = document.createElement("div");
    container.setAttribute("style", "width:700px");
    document.body.appendChild(container);
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


