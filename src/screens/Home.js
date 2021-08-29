import React from "react";
import {
  View,
  Linking,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions
} from "react-native";
import { firebase } from '@firebase/app'
//var firebase = require('firebase/app');

import {
  Layout,
  Button,
  Text,
  TopNav,
  Section,
  SectionContent,
  useTheme,
  themeColor,
  TextInput
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";

let dimensions = Dimensions.get("window");
    let imageHeight = Math.round((dimensions.width * 9) / 16);
    let imageWidth = dimensions.width;

export default function ({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();
  const [text, onChangeText] = React.useState("Search item");

  return (
    <Layout>
      <TopNav
        middleContent="Home"
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
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Section style={{ marginTop: 20 }}>
          <SectionContent>
            <Text fontWeight="bold" style={{ textAlign: "center" }}>
              Welcome to loopRRR, build a sustainable future together
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate("CameraScreen");
              }}
            >
              <Image 
              style={{ height: imageHeight, width: imageWidth }}
              source={require("./../../assets/camera.png")} />
            </TouchableOpacity>
            {/* <Button
              style={{ marginTop: 10 }}
              text="Go to Camera"
              status="info"
              onPress={() => {
                navigation.navigate("CameraScreen");
              }}
            /> */}

            <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              value={text}
              keyboardType="web-search"
              placeholder="Search your item"
            />

            {/* <Button
              text="Recycle Drop-off"
              onPress={() => {
                //TODO: change this to shelter
                navigation.navigate("MapsScreen", {keyword: '%27recycle%20drop-off%27'});
              }}
              style={{
                marginTop: 10,
              }}
            />
             <Button
              text="Donate"
              onPress={() => {
                //TODO: change this to shelter
                navigation.navigate("MapsScreen", {keyword: '%27women%20shelter%27'});
              }}
              style={{
                marginTop: 10,
              }}
            />
            <Button
              text="Craft"
              onPress={() => {
                //TODO: replace plastic cup with result from cloud vision
                Linking.openURL('vnd.youtube://results?search_query='+'plastic cup'+'+craft');
              }}
              style={{
                marginTop: 10,
              }}
            /> */}
            <Button
              status="danger"
              text="Logout"
              onPress={() => {
                firebase.auth().signOut();
              }}
              style={{
                marginTop: 10,
              }}
            />
          </SectionContent>
        </Section>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#859a9b",
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
    shadowColor: "#303838",
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
