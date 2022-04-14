import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react-native";
import React from "react";
import { ImageBackground, StyleSheet, Image, Text, View } from "react-native";
import {
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";

storiesOf("UploadContentScreen", module)
  .add("Subheader Text", () => {
    return <Text style={styles.header}>Title (*) </Text>;
  })
  .add("Text Input", () => {
    return (
      <TextInput
        placeholder="Required"
        placeholderTextColor="#003f5c"
        onChangeText={() => action("text input changed")}
        style={styles.textInputTitle}
      ></TextInput>
    );
  })
  .add("File Name Text", () => {
    return <Text style={styles.TextFile}>file name here</Text>;
  })
  .add("File Upload Icon Button", () => {
    return (
      <View style={styles.iconButton}>
        <FontAwesome.Button
          size={32}
          backgroundColor="#EFAA82"
          name="upload"
          onPress={() => action("upload file button pressed")}
        >
          Upload File
        </FontAwesome.Button>
      </View>
    );
  })
  .add("Submit/Cancel Button", () => {
    return (
      <TouchableOpacity
        onPress={() => action("submit/cancel button pressed")}
        style={styles.button}
      >
        <Text> Submit/Cancel</Text>
      </TouchableOpacity>
    );
  });

const styles = StyleSheet.create({
  header: {
    fontSize: 17,
    marginTop: 8,
    paddingRight: 20,
  },
  textInputTitle: {
    // alignContent: "flex-start",
    // justifyContent: "flex-end",
    height: 40,
    width: 618,
    borderColor: "#EFAA82",
    borderWidth: 2,
    borderRadius: 5,
    marginLeft: 52,
    paddingLeft: 10,
  },
  TextFile: {
    alignSelf: "center",
    borderColor: "#C4C4C4",
    position: "relative",
    borderWidth: 2,
    marginTop: 30,
    borderRadius: 5,
    textAlign: "center",
    height: 30,
    marginBottom: 10,
    fontStyle: "italic",
    paddingTop: 5,
    paddingHorizontal: 100,
  },
  button: {
    alignSelf: "center",
    backgroundColor: "#EFAA82",
    color: "black",
    alignItems: "center",
    textAlign: "center",
    height: 40,
    width: 100,
    borderRadius: 5,
    marginLeft: 125,
    marginRight: 125,
    paddingTop: 10,
  },
  iconButton: {
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    marginBottom: 50,
  },
});
