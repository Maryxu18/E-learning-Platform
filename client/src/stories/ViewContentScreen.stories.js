import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react-native";
import React from "react";
import { ImageBackground, StyleSheet, Image, Text, View } from "react-native";
import {
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";

storiesOf("ViewContentScreen", module).add("Content component", () => {
  return (
    <View style={styles.container}>
      <YoutubePlayer height={720} width={1280} videoId={URL}></YoutubePlayer>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>description: {description}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    alignContent: "center",
    marginTop: 30,
    backgroundColor: "white",
    width: 1280,
    alignSelf: "center",
  },
  title: {
    alignSelf: "flex-start",
    textAlign: "left",
    fontSize: 19,
    fontWeight: "bold",
    paddingLeft: 5,
    paddingBottom: 15,
    paddingTop: 20,
  },
  description: {
    alignSelf: "flex-start",
    textAlign: "left",
    fontSize: 16,
    paddingLeft: 5,
  },
});
