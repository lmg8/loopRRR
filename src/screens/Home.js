import React from 'react';
import { View, Linking } from "react-native";
import * as firebase from "firebase";
import {
  Layout,
  Button,
  Text,
  TopNav,
  Section,
  SectionContent,
  useTheme,
  themeColor
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";

export default function ({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();
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
            <Button
              style={{ marginTop: 10 }}
              text="Go to Camera"
              status="info"
              onPress={() => {
                navigation.navigate("Camera");
              }}
            />
            <Button
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
