# Frontend
Asmbl Frontend

## Getting Started
1. Download NodeJS [here](https://nodejs.org/en/)
2. Download Watchman [here](https://facebook.github.io/watchman/docs/install#buildinstall)
3. Install Expo App on smartphone
4. Install Expo through terminal ([see expo documentation here](https://docs.expo.io/get-started/installation/))
  ```
  npm install
  npm install --global expo-cli
  ```
3. Test to see if Expo install worked
  ```
  expo whoami
  ```
4. Login to expo
  ```
  expo login
  ```
6.  Start running
  ```
  expo start
  ```
____________________________

## Frontend Basic Skeleton
- **App.js:**
   - Contains the basic stack navigation for the app
- **assets/images:**
   - All the relevant svg files, e.g. waves, logos, progress bars
- **src/components:**
   - Some additional svg's that needed to be put into components
   - Modals
- **src/screens:**
   - All main screens of the app
- **src/styles:**
   - Stylesheets for forms, buttons, modals, etc.

____________________________

## Known Issues Yet to be Fixed, by Screen/Component
- **GENERAL ISSUES:**
  - Screen resizing for different sized phones (also making phone portrait mode)
  - Text size doesn't change with aspect ratio
  - ScrollView component rarely fits content size appropriately
  - Checkboxes on iOS in React Native
  - Converting to Android
- **src/screens/landingPage.js:**
  - Screen transition should fade, not slide; shouldn't allow user to swipe back
- **src/screens/signUpScreen.js:**
  - Need to set up email confirmation
- **src/screens/verifyAccountScreen.js:**
  - Set up backend code verification
- **src/screens/communityGuidelines.js:**
  - Checkbox not working; find an alternative for iOS with React Native
- **src/screens/buildProfileForm:**
  - Form navigation between steps is not working
- **src/components/ResetPasswordModal.js:**
  - Backdrop opacity option doesn't work (possibly due to container size)
  - `onBackdropPress` option doesn't work (possibly due to container size)
