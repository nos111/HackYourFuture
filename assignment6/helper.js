function createElement (type, id, message,attribute, attributeData,secondAttribute,secondAttributeData,thirdAttribute,thirdAttibuteData) { // This function will take the warning message and append it
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
}