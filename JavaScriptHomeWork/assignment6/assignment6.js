'use strict';
var info = {};
var userName = 'nos111';
var reposInfo;
var hoverEvent;
var interval;
var loaderEl = document.getElementById("resultLoader");
var reposlink;

document.getElementById("user-name-button").addEventListener('click',initSearch);

// function to initiate the search when clicked on the search button
function initSearch (){
    document.getElementById("info").innerHTML = "";
    var link = inputCatcher();
    var promise = Promise.resolve(link);
    promise.then(function(resolve,reject){
        loaderEl.classList.remove("invisible");
        return dataRequest(resolve);
    }).then(processData).then(function(resolve,reject){
         loaderEl.classList.add("invisible");
        return createProfile(resolve);
    }); 
}

// this function will load the page with my profile
function initOnLoad (){
    var link = 'https://api.github.com/users/' + userName;
    var promise = Promise.resolve(link);
    promise.then(function(resolve,reject){
        loaderEl.classList.remove("invisible");
        return dataRequest(resolve);
    }).then(processData).then(function(resolve,reject){
         loaderEl.classList.add("invisible");
        return createProfile(resolve);
    }); 
}

//Make a data request to the API
function dataRequest(link) { 
    return new Promise(function(resolve,reject){
        var request = new XMLHttpRequest();
        request.onreadystatechange = function(){
            if(request.readyState === 4) {
                resolve(request.responseText);
            }
        };
        request.open('GET',link);
        request.onerror = function(){
            reject(Error('Network error'));
        };
        request.send();
    })
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
            info.name = dataFile.name;
            info.public_repos = dataFile.public_repos;
            info.avatar_url = dataFile.avatar_url;
            info.html_url = dataFile.html_url;
            info.created_at = dataFile.created_at;
            info.id = dataFile.id;
            return info;
            }
    }

//Creates profile html elements
function createProfile (data) {
   
    
    var profileSection = {type:'section',
                          parentId:'info',
                          text:'<a href="#">'+info.name+" profile",
                          attribute:[["id","name"]]
                         };
    createElement(profileSection).addEventListener('click',nameClick);
    var reposSection = {type:'section',
                        text:'<a href="#">'+"Number of public repos is "+info.public_repos,
                        parentId:'info',
                        attribute:[["id","repos"]]
                       };
    createElement(reposSection);
    var profileImg = {type:'a',
                      parentId:'info',
                      text:'<img src="'+info.avatar_url+'">',
                      attritbute:[["href",info.html_url],["target","_blank"]]
                     };
    createElement(profileImg);
    document.getElementById("repos").addEventListener('click',reposInit);
    document.getElementById('repos').addEventListener('click',interval);
}

//creates extra info elements when clicked on the name
function nameClick(){ 
    if (document.getElementById("memeber-since") === null) { //Make sure the list is loaded only once
        var paragraphMemberSince = {type:'p',
                                    parentId:'name',
                                    text:"Git member since "+info.created_at,
                                    attribute:[["id","memeber-since"]]
                                   };
        createElement(paragraphMemberSince);
        var paragraphGitId = {type:'p',
                              parentId:'name',
                              text:'Git ID:'+info.id
                             };
        createElement(paragraphGitId);
    }
}

//Start building repos section

function reposInit(){
    reposlink = 'https://api.github.com/users/'+ userName + '/repos';
    var promise = Promise.resolve(reposlink);
    if (document.getElementById('repos-list') === null){ //Make sure the list is only created once
        promise.then(dataRequest).then(createReposElements);
    }else{
        var parent = document.getElementById('repos');
        var child = document.getElementById('repos-list');
        parent.removeChild(child);
        promise.then(dataRequest).then(createReposElements);
    }
}

// checks if there is a change on the repos. Will check for deleted and added repos. Will also check for new push and update the list.
function checkReposChange(){
    // first make a copy of the current repos push events.
    var reposUpdatedOriginal = reposInfo.map(repo => repo.pushed_at)
    console.log(reposUpdatedOriginal)
    var link = reposlink;
    var promise = Promise.resolve(link);
    // make a new API call to get new data over the repos
    promise.then(dataRequest).then(function(resolve,reject){
        var reposUpdatedNew = JSON.parse(resolve).map(repo => repo.pushed_at);
        return reposUpdatedNew;
    }).then(function(resolve,reject){
        console.log(resolve)
        // check for added or removed repos
        if(resolve.length !== reposUpdatedOriginal.length){
            console.log('extra repo');
            reposInit();
        }
        // if the number of repos didn't change, check for new push events
        if(resolve.length === reposUpdatedOriginal.length){
            for (var i =0; i < reposUpdatedOriginal.length; i++){
                if(resolve[i] !== reposUpdatedOriginal[i]){
                    console.log('repo updated')
                    reposInit()
                }
            }
        }
    })

    
}


//poll the repos section data every minute to make sure it's up to date
function interval (){
    document.getElementById('repos').removeEventListener('click',interval);
    clearInterval(interval);
    interval = setInterval(checkReposChange,20000);
    
    console.trace(interval)
}
//Initiate repos
function createReposElements(data) {
    reposInfo = JSON.parse(data);
    console.log(reposInfo)
    if(reposInfo[0] !== undefined) {
        var reposUl = {type:'ul',
                       parentId:'repos',
                       attribute:[['id','repos-list']]
                      };
        createElement(reposUl);
        reposInfo.map( function(object,i){
            var repoLi = {type:'li',
                          parentId:'repos-list',
                          attribute:[['id',i],['class','repo']]
                         };
            createElement(repoLi).addEventListener('mouseover',reposHover);
            var repoNameElement = {type:'h4',
                                   parentId:i,
                                   text:object.name
                                  };
            createElement(repoNameElement)
        });
    }
}


//Create HTML elements on hover over repos
function reposHover(mouseHover){
    hoverEvent = mouseHover;
    document.getElementById(hoverEvent.target.id).removeEventListener('mouseover',reposHover);
    //make sure we have got data back from the request
    if (reposInfo[parseInt(mouseHover.target.id)] !== undefined) { 
        var repoDescriptionAside = {type:'aside',
                                    parentId:mouseHover.target.id,
                                    text:reposInfo[parseInt(mouseHover.target.id)].description,
                                    attribute:[['class','repos-description']]
                                   };
        createElement(repoDescriptionAside);
        var repoCreatedAt = {type:'aside',
                             parentId:mouseHover.target.id,
                             text:'Created at ' + reposInfo[parseInt(mouseHover.target.id)].created_at,
                             attribute:[['class','repos-description']]
                            };
        createElement(repoCreatedAt);
        var openIssues = {type:'aside',
                          parentId:mouseHover.target.id,
                          text:'Number of open issues ' + reposInfo[parseInt(mouseHover.target.id)].open_issues,
                          attribute:[['class','repos-description']]
                         };
        createElement(openIssues);
        requestCollaboratorsInfo();
    }
    
    
}

//Make APIT call to get collaborators info
function requestCollaboratorsInfo () {
    var link = 'https://api.github.com/repos/'
        + userName 
        + '/'
        + reposInfo[parseInt(hoverEvent.target.id)].name
        +'/events';
    var promise = new Promise(function(resolve,reject){
        resolve(link);
    })
    promise.then(dataRequest).then(buildExtraReposInfo);
}

//process extra repos data when hovered over repoName
function buildExtraReposInfo(data) {
    var collaboratorsInfo = JSON.parse(data);
    //Make sure we have got data 
    if(collaboratorsInfo[0] !== undefined){
        var latestEvent = {type:'p',
                           parentId:hoverEvent.target.id,
                           text:'Latest events:'
                          };
        createElement(latestEvent);
        collaboratorsInfo.map(function(object,index){
            var typeOfEvent = {type:'p',
                               parentId:hoverEvent.target.id,
                               text:object.type,
                               attribute:[['id',index+'collaborator']]
                              };
            createElement(typeOfEvent);
            if (object.type == "PushEvent") {
                var latestCommit = {type:'p',
                                    parentId:hoverEvent.target.id,
                                    text:'Committ: ' + object.payload.commits[0].message}
                createElement(latestCommit);
            }
        });
    }
    
}


initOnLoad();