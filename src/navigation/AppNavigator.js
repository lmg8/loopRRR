import React, { useContext } from "react";
import firebase from "firebase/app";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "../provider/AuthProvider";
import {FIREBASE_API_KEY,FIREBASE_AUTH_DOMAIN,FIREBASE_STORAGE_BUCKET,FIREBASE_APP_ID} from "@env"

// Main
import Home from "../screens/Home";
import SecondScreen from "../screens/SecondScreen";
import Camera from "../screens/Camera";

// Auth screens
import Login from "../screens/auth/Login";
import Register from "../screens/auth/Register";
import ForgetPassword from "../screens/auth/ForgetPassword";

import Loading from "../screens/utils/Loading";
import MapsScreen from "../screens/MapsScreen";
import CameraScreen from "../screens/CameraScreens";

// Better put your these secret keys in .env file
const firebaseConfig = {
  apiKey: `${FIREBASE_API_KEY}`,
  authDomain: `${FIREBASE_AUTH_DOMAIN}`,
  databaseURL: "",
  projectId: 'looprrr',
  storageBucket: `${FIREBASE_STORAGE_BUCKET}`,
  messagingSenderId: "",
  appId: `${FIREBASE_APP_ID}`,
};
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const AuthStack = createStackNavigator();

const Auth = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Register" component={Register} />
      <AuthStack.Screen name="ForgetPassword" component={ForgetPassword} />
    </AuthStack.Navigator>
  );
};

const MainStack = createStackNavigator();

const Main = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen name="Home" component={Home} />
      <MainStack.Screen name="MapsScreen" component={MapsScreen}/>
      <MainStack.Screen name="Camera" component={Camera} />
      <MainStack.Screen name="CameraScreen" component={CameraScreen} />
    </MainStack.Navigator>
  );
};

export default () => {
  const auth = useContext(AuthContext);
  const user = auth.user;
  return (
    <NavigationContainer>
      {user == null && <Loading />}
      {user == false && <Auth />}
      {user == true && <Main />}
    </NavigationContainer>
  );
};
