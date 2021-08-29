## Tech Nova Project 2021 Summer

A hack for sustainability. loopRRR

## Team members
Lucia
Kimlin
Anna
Renee

### This project was created with reference to template created by codingki
https://github.com/codingki/react-native-expo-template/tree/master/template-with-bottom-tabs-auth-flow

# Installation

1. Install [node.js](https://nodejs.org/en/)
2. Install Expo

   ```jsx
   npm install --global expo-cli
   ```

3. Download this repo and get .env file with firebase configuration. 

  Example: 

  ```jsx
  F_API_KEY=putyourkeyhere
  F_AUTH_DOMAIN=
  F_STORAGE_BUCKET=
  F_APP_ID=
  ```

4. Install deps on your template folder

   ```jsx
   npm install
   ```

5. Start the environtment

   ```jsx
   expo start
   ```

# Auth Flow

### Firebase Setup

- Set up a new firebase project
- Go to Authentication and under Sign-in Method enable Email/Password
- Fill this firebase config to your config inside `./src/navigation/AppNavigator.js`

```jsx
// Better put your these secret keys in .env file
const firebaseConfig = {
	apiKey: '',
	authDomain: '',
	databaseURL: '',
	projectId: '',
	storageBucket: '',
	messagingSenderId: '',
	appId: '',
};
```

