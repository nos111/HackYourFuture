var info;
document.getElementById("user-name-button").addEventListener('click',page);

function page (){
    document.getElementById("info").innerHTML = "";
    var username = userNameCatcher();
    dataRequest(username,processData);
    
    
}
function dataRequest(searchTerm,callBack) { //Make a data request to the API
    var request = new XMLHttpRequest;
    request.onreadystatechange = function(){
        if(request.readyState === 4) {
            if(typeof callBack == 'function')
            callBack(request.responseText);
            console.log("searching")
        }
    };
    request.open('GET',searchTerm);
    request.send();
}

function userNameCatcher () { //catches username 
    var userName = 'https://api.github.com/users/' + document.getElementById("user-name").value;
    if (userName == " " || userName == "/" || userName=="?"){
         document.getElementById("info").innerHTML = "";
        document.getElementById("warning-message").innerHTML = "Please enter a valid search term";
    }else if (userName === 'https://api.github.com/users/'){ //to make the page go to my repository on start
        userName = 'https://api.github.com/users/nos111'
        return userName;
    }else{
        return userName;
    }
    
}

function processData (asd) { //processes the returned data from the request
         //When the request is done this will be activated
            var dataFile = JSON.parse(asd);
            console.log(dataFile.url);
            if (dataFile.message == "Not Found") {
                document.getElementById("info").innerHTML = "";
                document.getElementById("warning-message").innerHTML = "Please enter a valid user name";
        } else {
            document.getElementById("warning-message").innerHTML = "";
            createList(dataFile);
            }
    }

function createList (data) {//creates html elements
    info = data;
    createElement("h1","info",'<a href="#">'+data.name+" profile","id","name").addEventListener('click',nameClick);
    createElement("h3","info",'<a href="#">'+"Number of public repos is "+data.public_repos,"id","repos");
    createElement("a","info",'<img src="'+data.avatar_url+'">',"href",data.html_url,"target","_blank");
}

function nameClick(){ //creates extra info elements when clicked on the name
    if (document.getElementById("memeber-since") == null) {
    createElement("p","name","Git member since"+info.created_at,"id","memeber-since");
    createElement('p','name','Git ID:'+info.id);
    }
}

page();
