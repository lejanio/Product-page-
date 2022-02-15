# Product Page - AliExpress Clone

A working project can be found here: https://lejanio.github.io/product-page

## General Description 

The page shows product info (fetched from API using an Axios request) displaying the available options and their price. Moreover, it
provides the possibility to choose the necessary quantity per option calculating the total price for each option,
as well as the cart total.
It also shows a timer countdown until the end of the sale.

The project is implemented using React, TypeScript and Axios; following the responsive design
principles for mobile and desktop versions.

## Project structure

1. The entry file is App.tsx:
    - Contains the main section component which, in turn, contains the quantity rocker, timer and button components
2. Main.tsx file:
    - Contains states for fetched product data, product quantity inputs, product rating, as well as 
   calculated amounts for cart
    - Contains several instances of the quantity selector component
    - Contains several instances of the button component
    - Contains the timer component
3. The components are located in the src/components folder with a separate subfolder for the files
   of each corresponding component.

---

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm install`

Installs the necessary project dependencies.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
