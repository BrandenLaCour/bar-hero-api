# Bar Hero Api
This is the backend to bar hero. It is primarily used to contact Firebase, and email staff members.

## Quick Overview

After login, this app will bring you to the urgen tasks page. This page shows anyone that may have noticed something that needs repairs, or needs attention. When something from the urgent list is checked off, it will email everyone on the email list. 

The rest of the app is the different rooms in the bar, you go through each checklist, and make notes, and take pictures.
If anything is urgent, or needs attention, it will be added to the database, and the urgent page.

### Prerequisites

Npm, Bar Hero, and Firebase. 

### Installing

Pretty simple setup, just use npm to install dependencies. Follow the instructions with the api and you will be good to go.
```
Npm i
```
```
Npm start
```

## Built With
https://www.npmjs.com/package/@sendgrid/mail
* [Express](https://expressjs.com/) - awesome framework for node
* [Firebase](https://firebase.google.com/docs/firestore/quickstart) - An easy to use NoSQL Database solution
* [Nodemon](https://www.npmjs.com/package/nodemon) - Automatically restarts node after changes
* [Sendgrid](https://www.npmjs.com/package/@sendgrid/mail) - Sends emails!

## Contributing
I am more than happy to take contributions to this project! Just fork, and send a pull request. If you happened to work on one of the above issues. I would be elated! Beers on me if you live in Chicago!


## Author

* **Branden LaCour** - (https://github.com/BrandenLaCour/)

## Acknowledgments

* My buddy Jonny Caron for the idea
* The disorganization of the bar industry!
