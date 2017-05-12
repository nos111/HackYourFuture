function filterDubbels (array) {
    filteredArray = [];
        for(var i = 0; i < array.length; i++) {
            var indexnumber = filteredArray.indexOf(array[i]);
                if (indexnumber < 0) {
                    filteredArray.push(array[i]);
                }
        }
    return filteredArray;
}
console.log(filterDubbels([1,2,3,1,5,6,6,6,2]));
