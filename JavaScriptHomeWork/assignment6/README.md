This program will make a call to 'https://api.github.com/users/' + userInput 
(where userInput is a string typed into a searchfield by a user). 
It will show the users name, avatar image and the number of public repos they have

When clicking on the users name, it will show all the other info about that user. 

When clicking on the avatar image, open their github profile in a new tab. 

When clicking on the number of public repos, it will make another API call to 'https://api.github.com/users/user/repos' and build an unorderdered list of the returned repos with just the name of each repo.

When hovering over the name of the repo, it will show on the right side of the page in an <aside> element the description of that repo, when it was created, and the number of open issues it has.

Shows the collaborators of that repo. through ANOTHER API call to https://api.github.com/repos/user/repo/events and that lists the 3 last events. Show the type of the event and if the type is 'PushEvent' show the commit message.

When a user goes to this app, My github account info is loaded. They can then use the search field to find info about other github accounts.

-Implemented promises in your XHR
-Added polling to your SPA and make sure new info is loaded every 60 seconds.
-Implemented a loader icon 