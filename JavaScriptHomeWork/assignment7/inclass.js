function initGitProfile(){
    var link1 = 'https://api.github.com/users/nos111/repos'
    dataRequest(link1).then(function(val){
        val = JSON.parse(val);
        
        val.map(function(item) {
            console.log(item)
        createElement('p','info',item.name)})
    })
}
function dataRequest(link) { 
    return new Promise ( function(resolve,reject) {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function(){
            if(request.readyState === 4) {
                    resolve(request.responseText);
            }
        };
        request.open('GET',link);
        request.send();
    })
    
}
initGitProfile();