import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import {  Image, StyleSheet, View,    Linking} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import {
    Layout,
    TopNav,
    Text,
    themeColor,
    useTheme,
    Button
  } from "react-native-rapi-ui";

  import {VISION_API_KEY} from "@env";
  //https://davidl.fr/blog/google-vision-with-react-native

  const API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${VISION_API_KEY}`;

async function callGoogleVisionAsync(image) {
  const body = {
    requests: [
      {
        image: {
          content: image,
        },
        features: [
          {
            type: 'LABEL_DETECTION',
            maxResults: 1,
          },
        ],
      },
    ],
  };

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const result = await response.json();
  console.log('callGoogleVisionAsync -> result', result);

  return result.responses[0].labelAnnotations[0].description;
}

export default function ({navigation}) {
  const [image, setImage] = React.useState(null);
  const [status, setStatus] = React.useState(null);
  const [permissions, setPermissions] = React.useState(false);
  const {isDarkmode, setTheme} = useTheme();

  const askPermissionsAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    } else {
      setPermissions(true);
    }
  };

  const takePictureAsync = async () => {
    const { cancelled, uri, base64 } = await ImagePicker.launchCameraAsync({
      base64: true,
    });

    if (!cancelled) {
      setImage(uri);
      setStatus('Loading...');
      try {
        const result = await callGoogleVisionAsync(base64);
        setStatus(result);
      } catch (error) {
        setStatus(`Error: ${error.message}`);
      }
    } else {
      setImage(null);
      setStatus(null);
    }
  };

  return (
    <Layout>
    <TopNav
      middleContent="Vision Api"
      leftContent={
        <Ionicons
          name="chevron-back"
          size={20}
          color={isDarkmode ? themeColor.white100 : themeColor.dark}
        />
      }
      leftAction={() => navigation.goBack()}
      rightContent={
        <Ionicons
          name={isDarkmode ? "sunny" : "moon"}
          size={20}
          color={isDarkmode ? themeColor.white100 : themeColor.dark}
        />
      }
      rightAction={() => {
        if (isDarkmode) {
          setTheme("light");
        } else {
          setTheme("dark");
        }
      }}
    />
    <View style={styles.container}>
      {permissions === false ? (
        <Button onPress={askPermissionsAsync} text="Ask permissions" />
      ) : (
        <>
          {image && <Image style={styles.image} source={{ uri: image }} />}
          {status && <Text style={styles.text}>{status}</Text>}
         <Button onPress={takePictureAsync} text="Take a Picture" style={{
                marginTop: 10,
              }}/>
          {status && <Button
              text="Recycle Drop-off"
              onPress={() => {
                navigation.navigate("MapsScreen", {keyword: '%27recycle%20drop-off%27'});
              }}
              style={{
                marginTop: 10,
              }}
            />}
            {status && <Button
              text="Donate"
              onPress={() => {
                navigation.navigate("MapsScreen", {keyword: '%27women%20shelter%27'});
              }}
              style={{
                marginTop: 10,
              }}
            />}
            {status && <Button
              text="Craft"
              onPress={() => {
                //TODO: replace plastic cup with result from cloud vision
                console.log(status)
                Linking.openURL('vnd.youtube://results?search_query='+status+'+craft');
              }}
              style={{
                marginTop: 10,
              }}
            />}
        </>
      )}
    </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      },

  image: {
    width: 300,
    height: 300,
  },
  text: {
    margin: 5,
  },
});