# Cook Book README

## Description

Cook Book is a multi user application that runs on the MERN Stack. The server side is an API backend built with ExpressJS, MongoDB and Mongoose, that React app will communicate with. The application allows people to sign up and login. After having done so the users are allowed to create new recipes, edit and delete them. They can also view the list of ingredients and create new one. Browsing all recipes doesn't require quthorization. Each recipe represents a set of data that includes title, description, image, number of servings, cooking time, author and the list of ingredients. Author is a reference to the respective user in the user's collection while ingredients is an array of objects each containing the amount of the ingredient and a reference to the respective ingredient in the ingredients collection.

## Instructions 

### Server

- Fork the server repo: https://github.com/ChefJulietaa/chefjulietaa-server
- Clone the server repo
- Create `.env` file that contains the following variables: 

```
PORT=5005
ORIGIN=http://localhost:3000
TOKEN_SECRET
CLOUDINARY_NAME 
CLOUDINARY_KEY 
CLOUDINARY_SECRET 
```

- Contact Julia for the mentioned credentials

- Run the following commands in your terminal: 

```shell
$ cd chefjulietaa-server
$ npm install
$ npm run dev
```

## Demo

The demo of the application is available at:

https://chefjulietaa.netlify.app/
