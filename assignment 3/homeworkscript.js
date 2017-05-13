
arrayMyBooks = ["harry_potter_the_seven_guys",
"nour_potter_the_eight_guys", "tomas_potter_the_six_guys"];

objectMyBooks = {
  harry_potter_the_seven_guys:
   {title:"Harry potter and the seven guys", language: "arabic", year: 1992,img:"harry_potter_book3.jpg"},
  nour_potter_the_eight_guys:
  {title:"Nour potter and the eight guys", language: "English", year: 2030,img:"harry_potter_book2.jpg"},
  tomas_potter_the_six_guys:
  {title:"Tomas potter the six guys", language:"French", year: 2050,img: "Harry_potter_book1.jpg"}
};

objectMyBooks.harry_potter_the_seven_guys.name = function addListFromObject () {
      var newList = document.createElement("div")
      var newTitleHeading = document.createElement("h2");
      var newTitleText = document.createTextNode("The title of this book is " + this.title);
      newTitleHeading.appendChild(newTitleText);
      var newLanguagHeading = document.createElement("h3");
      var newLanguageText = document.createTextNode("This book is available in " + this.language);
      newLanguagHeading.appendChild(newLanguageText);
      var newBookYear = document.createElement("h4");
      var newBookText = document.createTextNode("This book came in " + this.year);
      newBookYear.appendChild(newBookText);
      var newImage = document.createElement("img");
      newImage.src = this.img;
      newImage.setAttribute("height", "700");
      var newLine = document.createElement("hr");
      newList.appendChild(newTitleHeading);
      newList.appendChild(newImage);
      newList.appendChild(newLanguagHeading);
      newList.appendChild(newBookYear);
      newList.appendChild(newLine);
      var element2 = document.getElementById('div2');
      element2.appendChild(newList);

};
objectMyBooks.nour_potter_the_eight_guys.name = objectMyBooks.harry_potter_the_seven_guys.name;
objectMyBooks.tomas_potter_the_six_guys.name = objectMyBooks.harry_potter_the_seven_guys.name;
objectMyBooks.harry_potter_the_seven_guys.name();
objectMyBooks.nour_potter_the_eight_guys.name();
objectMyBooks.tomas_potter_the_six_guys.name();


function addList () {
  var newList = document.createElement("ul");
  var newItemsCreater = function() {
    for (var i = 0; i < arrayMyBooks.length; i++) {
      var newitems = document.createElement("li");
      var newItemsText = document.createTextNode("I love this book " + arrayMyBooks[i]);
      newitems.appendChild(newItemsText);
      newList.appendChild(newitems);
    };
  };
  newItemsCreater();
  var element2 = document.getElementById('div2');
  element2.appendChild(newList);

};

addList()
