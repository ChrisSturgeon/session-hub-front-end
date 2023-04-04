# Session Hub Front End

## Table of Contents

- [Overview](#overview)
- [Built With](#built-with)
- [Features](#features)
- [Concepts and Ideas Learnt](#concepts-and-ideas-learnt)
- [Areas to Improve](#areas-to-improve)
- [Contact](#contact)

## Overview

The front end of my final project for the Node JS section of The Odin Project. Built with React the app consumes my Express REST API. The project aim was to create a social media site where users can create accounts, add friends, and post about their recent surfing, windsurfing, kitesurfing etc. sessions for other users to like and comment on.

View the live project [here](https://chrissturgeon.github.io/session-hub-front-end/#/), the repo for the Express API [here](https://github.com/ChrisSturgeon/session-hub-api) and view the project guidelines [here](https://www.theodinproject.com/lessons/nodejs-odin-book).

_Example Home Page_
![Front page screenshot](screenshots/screenshot.jpg 'IMG DESCRIPTION')
_Session Detail_
![Front page screenshot](screenshots/session.jpg 'IMG DESCRIPTION')
_Profile Page_
![Front page screenshot](screenshots/profile.jpg 'IMG DESCRIPTION')
![Mobile page screenshot](screenshots/mobile.jpg 'IMG DESCRIPTION')

### Built With

- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/en/main)
- [Framer Motion](https://www.framer.com/motion/)
- [Leaflet](https://leafletjs.com/)
- [React Leaflet](https://react-leaflet.js.org/)
- [date-fns](https://date-fns.org/)
- [DOMPurify](https://github.com/cure53/DOMPurify)

## Features

- **SPA** consuming REST API.
- **Custom React hooks** for fetching data from the API and user authentication.
- Unit testing with **React Testing Library**.
- Uses the React Router's **Data Loading Hooks** to start fetching data prior immediately upon navigation.
- Uses a **multi-stage form** with single state to create a new session.
- **Leaflet** is used throughout to display both static and dynamic maps of user's sessions.

### Concepts and Ideas Learnt

- How to integrate interactive maps from **Leaflet** with the help of **React Leaflet** and **OpenStreetMap**.
- How to mock an API in testing using **Mock Service Worker**.
- **State managment** across a multi-stage form.
- How to effectively use **Context** within React to share global data. For example, the active users userID for use in API calls.

### Areas to Improve

With more time I would have liked to have implemented more features and improved others, such as:

- Allow users to add photos from their sessions.
- Increase test coverage.
- Geographically group session coordinates so users can see all recent sessions nearby to a given location.
- Implement a 'people you may know' feature to suggest friends of friends.
- Create an 'equipment' model to allow users to store their surfboard/kite etc. so it can easily be referenced in future, and to record stats of how many users have this board etc.

## Contact

- sturgeon.chris@gmail.com
- [www.chrissturgeon.co.uk](https://chrissturgeon.co.uk/)
- [LinkedIn](https://www.linkedin.com/in/chris-sturgeon-36a74254/)
