function createElement (htmlElement) { // This function will take the warning message and append it
    var element = document.createElement(htmlElement.type);
    var parent = document.getElementById(htmlElement.parentId);
    if(htmlElement.attribute !== undefined) {
        function buildAtributes(key,value){
            element.setAttribute(value,key)
        }
        new Map(htmlElement.attribute).forEach(buildAtributes);
    }
    if (htmlElement.text !== undefined) {
        element.innerHTML = htmlElement.text;
    }
    if (htmlElement.parentId !== undefined) {
       parent.appendChild(element);
    }
    
    return element;
}

////second version
//function createsElement (type, id, message,attributes) { // This function will take the warning message and append it
//    var element = document.createElement(type);
//    var parent = document.getElementById(id);
//    if(attributes !== undefined) {
//        function buildAtributes(key,value){
//            element.setAttribute(value,key)
//        }
//        new Map(attributes).forEach(buildAtributes);
//    }
//    if (message !== undefined) {
//        element.innerHTML = message;
//    }
//    if (id !== undefined) {
//       parent.appendChild(element);
//    }
//    
//    return element;
//}
//first version of create element
/*function createElement (type, id, message,attribute, attributeData,secondAttribute,secondAttributeData,thirdAttribute,thirdAttibuteData) { // This function will take the warning message and append it
    var element = document.createElement(type);
    var parent = document.getElementById(id);
    if (attribute !== undefined) {
        element.setAttribute(attribute,attributeData);
    }
    if (secondAttribute !== undefined){
        element.setAttribute(secondAttribute,secondAttributeData);
    }
    if (thirdAttribute !== undefined){
        element.setAttribute(thirdAttribute,thirdAttibuteData);
    }
    if (message !== undefined) {
        element.innerHTML = message;
    }
    if (id !== undefined) {
       parent.appendChild(element);
    }
    
    return element;
} */