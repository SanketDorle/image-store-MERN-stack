# image-store-MERN-stack

[![Build Status](https://travis-ci.org/crsandeep/simple-react-full-stack.svg?branch=master)](https://travis-ci.org/crsandeep/simple-react-full-stack)
[![Greenkeeper badge](https://badges.greenkeeper.io/crsandeep/simple-react-full-stack.svg)](https://greenkeeper.io/)

This is a boilerplate to build a full stack web application using React, Node.js, Express, MongoDB and Webpack. It is also configured with webpack-dev-server, eslint, prettier and babel.
## Introduction

[Create React App](https://github.com/facebook/create-react-app) is a quick way to get started with React development and it requires no build configuration. But it completely hides the build config which makes it difficult to extend. It also requires some additional work to integrate it with an existing Node.js/Express backend application.

This is a simple full stack [React](https://reactjs.org/) application with a [Node.js](https://nodejs.org/en/) and [Express](https://expressjs.com/) backend and we use [MongoDB](https://www.mongodb.com/) as database. Client side code is written in React and the backend API is written using Express. This application is configured with [Airbnb's ESLint rules](https://github.com/airbnb/javascript) and formatted through [prettier](https://prettier.io/).

### Development mode

In the development mode, we will have 2 servers running. The front end code will be served by the [webpack dev server](https://webpack.js.org/configuration/dev-server/) which helps with hot and live reloading. The server side Express code will be served by a node server using [nodemon](https://nodemon.io/) which helps in automatically restarting the server whenever server side code changes.

## Quick Start

```bash
# Clone the repository
git clone https://github.com/SanketDorle/image-store-MERN-stack.git

# Go inside the directory
cd image-store-MERN-stack

# Install dependencies
npm install

# Start server
npm start
```
