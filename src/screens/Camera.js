// With reference to: https://www.codegrepper.com/code-examples/javascript/react+native+camera+expo

import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";

import {
  Layout,
  TopNav,
  Text,
  themeColor,
  useTheme,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: "80%",
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "blue",
  },
});



// takePicture = async() => {
//   if (this.camera) {
//     const options = { quality: 0.5, base64: true };
//     const data = await this.camera.takePictureAsync(options);
//     console.log(data.uri);
//   }
// };

export default function ({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const { isDarkmode, setTheme } = useTheme();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <Layout>
      <TopNav
        middleContent="Recycle"
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
      <View
        style={{
          flex: 2,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* This text using ubuntu font */}
        <Text fontWeight="bold">
          Take a picture of the item you want to recycle
        </Text>

        <View style={styles.container}>
          <Camera style={styles.camera} type={type}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }}
              >
                <Text style={styles.text}> Flip </Text>
              </TouchableOpacity>
            </View>
          </Camera>
          <View
            style={{ flex: 0.5, flexDirection: "row", justifyContent: "center" }}
          >
            {/* <TouchableOpacity
              onPress={alert("take a picture!")}
              style={styles.capture}
            >
              <Text style={{ fontSize: 18 }}> SNAP </Text>
            </TouchableOpacity> */}
          </View>
        </View>

      </View>
    </Layout>

    // -----------------------------------------
  );
}

// return (
//   <Layout>
//     <TopNav
//       middleContent="Recycle"
//       leftContent={
//         <Ionicons
//           name="chevron-back"
//           size={20}
//           color={isDarkmode ? themeColor.white100 : themeColor.dark}
//         />
//       }
//       leftAction={() => navigation.goBack()}
//       rightContent={
//         <Ionicons
//           name={isDarkmode ? "sunny" : "moon"}
//           size={20}
//           color={isDarkmode ? themeColor.white100 : themeColor.dark}
//         />
//       }
//       rightAction={() => {
//         if (isDarkmode) {
//           setTheme("light");
//         } else {
//           setTheme("dark");
//         }
//       }}
//     />
//     <View
//       style={{
//         flex: 1,
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       {/* This text using ubuntu font */}
//       <Text fontWeight="bold"> Take a picture of the item you want to recycle </Text>

//       <RNCamera
//         ref={(ref) => {
//           this.camera = ref;
//         }}
//         style={styles.preview}
//         type={RNCamera.Constants.Type.back}
//         flashMode={RNCamera.Constants.FlashMode.on}
//         androidCameraPermissionOptions={{
//           title: "Permission to use camera",
//           message: "We need your permission to use your camera",
//           buttonPositive: "Ok",
//           buttonNegative: "Cancel",
//         }}
//         await androidRecordAudioPermissionOptions={{
//           title: "Permission to use audio recording",
//           message: "We need your permission to use your audio",
//           captureAudio:false,
//           buttonPositive: "Ok",
//           buttonNegative: "Cancel",
//         }}
//         onGoogleVisionBarcodesDetected={({ barcodes }) => {
//           console.log(barcodes);
//         }}
//       />

//     </View>
//   </Layout>
// );
