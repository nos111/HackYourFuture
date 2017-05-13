


var studentsAndTeachersNames = ["Nour", "Hameed", "Yaser", "George", "Thomas", "Lauren", "Essam"];

var weather = ["Rainy", "Sunny", "Bewolkt"];
var currentWeather = weather[2];

var sentences = ["Bring an umbrella with you", "Wear sun screen", "bring a towel"]


function greet(name) {
    if (currentWeather == "Rainy") {
        console.log("Hello: "  + name + " the weather is", currentWeather, sentences[0])
    } else if (currentWeather == "Sunny") {
        console.log("Hello: "  + name + " the weather is shitty", currentWeather, sentences[2])
    } else {
        console.log("Hello: "  + name + " the weather is shitty", currentWeather, sentences[1])
    }
}
greet(studentsAndTeachersNames.join(", "));

function ()

// use the greet function to greet yourself
// create a list containing all the names of the students and teachers in our class
// use the greet function to greet all the students in the console
// create a variable storing the type of weather, it can be "rainy", "sunny", or anything else.
// Change the greet function so that when it's sunny, the greet function tells you to wear sunscreen
// When it's raining it warns you to bring an umbrella
// If it's not rainy or sunny, the greet function tells you to bring a towel.