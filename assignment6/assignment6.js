'use strict';
var info;
var userName = 'nos111';
var reposInfo;
var hoverEvent;

document.getElementById("user-name-button").addEventListener('click',initSearch);

// function to initiate the search when clicked on the search button
function initSearch (){
    document.getElementById("info").innerHTML = "";
    var link = inputCatcher();
    dataRequest(link,processData);    
}

// this function will load the page with my profile
function initOnLoad (){
    var link = 'https://api.github.com/users/nos111';
    dataRequest(link,processData);    
}

//Make a data request to the API
function dataRequest(link,callBack) { 
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(request.readyState === 4) {
            if(typeof callBack == 'function')
                callBack(request.responseText);
        }
    };
    request.open('GET',link);
    request.send();
}

//catches username and check for good user input
function inputCatcher () {  
    userName = document.getElementById("user-name").value;
    if (userName === " " || userName === "/" || userName ==="?" || userName ===''){
        document.getElementById("info").innerHTML = "";
        document.getElementById("warning-message").innerHTML = "Please enter a valid search term";
    }else{
        return 'https://api.github.com/users/' + userName;
    } 
}

//Processes the returned data from the profile search
//When the request is done this function will be activated
function processData (response) { 
            var dataFile = JSON.parse(response);
            if (dataFile.message == "Not Found") {
                document.getElementById("info").innerHTML = "";
                document.getElementById("warning-message").innerHTML = "Please enter a valid user name";
        } else {
            document.getElementById("warning-message").innerHTML = "";
            createProfile(dataFile);
            }
    }

//Creates profile html elements
function createProfile (data) {
    info = data;
    createElement("section","info",'<a href="#">'+data.name+" profile",[["id","name"]]).addEventListener('click',nameClick);
    createElement("section","info",'<a href="#">'+"Number of public repos is "+data.public_repos,[["id","repos"]]);
    createElement("a","info",'<img src="'+data.avatar_url+'">',[["href",data.html_url],["target","_blank"]]);
    document.getElementById("repos").addEventListener('click',reposInit);
}

//creates extra info elements when clicked on the name
function nameClick(){ 
    if (document.getElementById("memeber-since") === null) { //Make sure the list is loaded only once
        createElement("p","name","Git member since "+info.created_at,[["id","memeber-since"]]);
        createElement('p','name','Git ID:'+info.id);
    }
}

//Start building repos section
function reposInit(){
    var link = 'https://api.github.com/users/'+ userName + '/repos';
    if (document.getElementById('repos-list') === null) //Make sure the list is only created once
        dataRequest(link,createReposElements);
}

//Initiate repos
function createReposElements(data) {
    reposInfo = JSON.parse(data);
    if(reposInfo[0] !== undefined) {
        createElement('ul','repos',undefined,[['id','repos-list']]);
        reposInfo.forEach( function(object,i){
            createElement('li','repos-list',object.name,[['id',i],['class','repo']]).addEventListener('mouseover',reposHover);
        });
    }
}


//Create HTML elements on hover over repos
function reposHover(mouseHover){
    hoverEvent = mouseHover;
    document.getElementById(hoverEvent.target.id).removeEventListener('mouseover',reposHover);
    //make sure we have got data back from the request
    if (reposInfo[parseInt(mouseHover.target.id)] !== undefined) { 
        createElement('aside',mouseHover.target.id,reposInfo[parseInt(mouseHover.target.id)].description,[['class','repos-description']]);
        createElement('aside',mouseHover.target.id,'Created at ' + reposInfo[parseInt(mouseHover.target.id)].created_at,[['class','repos-description']]);
        createElement('aside',mouseHover.target.id,'Number of open issues ' + reposInfo[parseInt(mouseHover.target.id)].created_at,[['class','repos-description']]);
        requestCollaboratorsInfo();
    }
    
    
}

//Make APIT call to get collaborators info
function requestCollaboratorsInfo () {
    var link = 'https://api.github.com/repos/' + userName + '/' + reposInfo[parseInt(hoverEvent.target.id)].name +'/events';
    dataRequest(link,collaboratorsRequest);
}

//process extra repos data when hovered over repoName
function collaboratorsRequest(data) {
    var collaboratorsInfo = JSON.parse(data);
    //Make sure we have got data 
    if(collaboratorsInfo[0] !== undefined){
        createElement('p',hoverEvent.target.id,'Latest event:');
        collaboratorsInfo.forEach(function(object,index){
            createElement('p',hoverEvent.target.id,'Type of evevnt: ' + object.type,[['id',index+'collaborator']]);
            if (object.type == "PushEvent") {
            createElement('p',hoverEvent.target.id,'Committ: ' + object.payload.commits[0].message);
            }
        });
    }
    
}


initOnLoad();