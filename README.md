# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Website Link

- https://capstone-frontend-x2d4.onrender.com

### Backend Service

- https://github.com/TC999999/capstone_backend

### Tests

- Tests can be run by cloning this repository and inputting "npm run test" in the terminal for frontend
- Tests for the backend can be run by cloning the backend repository in the link above and inputting "npm run test" in the terminal

### App Stack

This app used Vite, React, and Express

## APIs and Services Used

- EmailJS to send email notifications to users
- Supabase to store image files and deploy backend database
- Navigator.geolocation() to get user location in latitude and longitude
- geolib to get the distance between to points of latitude and longitude

## Website Details

This is an Online Marketplace app called "The Worldwide Garage Sale" where logged in users can search for items they are interested it, put their own items up for sale, and message other users selling items they are interested in.

The user will have to log in or make an account before they will be able to access any of the app's features. When they sign up, they will input their address and the app will automatically get their location in latitude and longitude. From there, users will be able to go to the items page and see what items other users have for sale. If they see something they like, they can message that user, which will automatically send them an email notifying them so and being added to a message list accessible from the navbar. If the other user chooses so, they can sell that item to to the user. When a user purchase an item, the app will automatically retrieve other available items to reccomend the user based on past purchases. The app will also get items based on the user's current location. Users who have bought items can review the users they bought those items from for others to see. Users can also report other users. Users will also be able to put their own items up for sale, where they can upload an image which will be save to supabase. Users can also edit their own profile which will also update their latitude and longitude. Finally, users can also update their own items' information.

Admins can do the same things as regular users, additionally they can check the reports of other users.
Admins can check the messages between a reported user and the user that reported them. If an admin decides and that a report is invalid, they can clear it. Admins can't see reports made by or for them. Admins will also be able to flag users who have been reported against, except for users they reported themselves. Admins will also be able to make other users admins. Admins can also add additional categories for items to the database.
