import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react-native";
import React from "react";
import { ImageBackground, StyleSheet, Image, Text, View } from "react-native";
import {
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";

storiesOf("ContentScreen", module)
  .add("Upload content button", () => {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate("UploadContentScreen")}
        style={styles.uploadButton}
      >
        <Text>Click here to upload a video...</Text>
      </TouchableOpacity>
    );
  })
  .add("Tag", () => {
    return (
      <TouchableOpacity
        style={styles.tagsButton}
        onPress={() => action("tag pressed")}
      >
        <Text>tag text</Text>
      </TouchableOpacity>
    );
  })
  .add("Video preview", () => {
    return (
      <TouchableOpacity
        style={{ flexDirection: "column", marginVertical: 16 }}
        onPress={() => action("preview pressed")}
      >
        <Image
          source={{ uri: videoMeta.thumbnail_url }}
          style={{
            width: 250,
            height: 140,
          }}
        />
        <View style={{ justifyContent: "center" }}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 12,
              width: 250,
            }}
          >
            {videoMeta.title}
          </Text>
          <Text style={{ paddingTop: 3, fontSize: 10, width: 250 }}>
            {videoMeta.author_name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  });

const styles = StyleSheet.create({
  uploadButton: {
    alignSelf: "center",
    backgroundColor: "#EFD3D3",
    color: "black",
    textAlign: "center",
    width: "80%",
    borderRadius: 5,
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  tagsButton: {
    backgroundColor: "#EFAA82",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 20,
    marginLeft: 10,
  },
});
