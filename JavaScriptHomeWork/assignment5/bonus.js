function filterDubbels (array) {
    var nanArray = [];
    var filteredArray = [];
    for(var i = 0; i < array.length; i++) {
        var indexnumber = filteredArray.indexOf(array[i]);
        if (indexnumber < 0) {
                    filteredArray.push(array[i]);
        }  
    }
    for(var i = 0; i < filteredArray.length; i++) {
        if (filteredArray[i] !== filteredArray[i]){
            nanArray.push(filteredArray[i]);
            filteredArray.splice(i,1);
            
        }
    }
    filteredArray.push(nanArray[0]);
            
            
    return filteredArray;
}
console.log(filterDubbels([1,NaN,2,3,NaN,1,5,6,6,6,2,false,false]));
