import React from "react";
import PropTypes from "prop-types";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { getTags } from "../models/Tags";
import { getID } from "../models/User";
import { BodyWrapper } from "../components/BodyWrapper";
import FormData from "form-data";
import { useHistory } from "react-router-dom";

export default function UploadContentScreen({
  navigation,
}: {
  navigation: any;
}) {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [tags, setTags] = React.useState([]);
  const [URL, setURL] = React.useState("");
  const [allTags, setAllTags] = React.useState(getTags());
  const [open, setOpen] = React.useState(false);
  const history = useHistory();

  const uploadContent = async () => {
    if (!URL) alert("Please insert a URL");
    else if (title === "") alert("Please specify a title.");
    else {
      // const data = new FormData();
      // data.append("postUser", getID());
      // data.append("title", title);
      // data.append("description", description);
      // data.append("tags", tags);
      // data.append("viewAccess", "MENTORS");
      // data.append("contentType", "EMBED");
      // data.append("content", { URL: URL });

      fetch("http://localhost:3000/education/post", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          // "Content-Type": "multipart/form-data",
        },
        // body: data,
        body: JSON.stringify({
          postUser: getID(),
          title: title,
          description: description,
          tags: JSON.stringify(tags),
          viewAccess: "MENTORS",
          contentType: "EMBED",
          content: { URL: URL },
        }),
      }).then((response) => {
        if ([200, 201].includes(response.status)) alert("Upload Sucessful");
        else if ([400, 404, 500].includes(response.status))
          alert("An error occurred. Please try again later");
      });
    }
  };

  return (
    <BodyWrapper>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.pageHeader}> Upload Content</Text>
          <View style={styles.innerContainer}>
            <Text style={styles.header}>Title (*) </Text>
            <TextInput
              placeholder="Required"
              placeholderTextColor="#003f5c"
              onChangeText={(title) => setTitle(title)}
              style={styles.textInputTitle}
            ></TextInput>
          </View>
          <View style={styles.innerContainer}>
            <Text style={styles.header}>Description </Text>
            <TextInput
              placeholder="Optional"
              placeholderTextColor="#003f5c"
              onChangeText={(description) => setDescription(description)}
              style={styles.textInputDescription}
            ></TextInput>
          </View>
          <View style={styles.innerContainer}>
            <Text style={styles.header}>Youtube URL(*) </Text>
            <TextInput
              placeholder="Required"
              placeholderTextColor="#003f5c"
              onChangeText={(URL) => setURL(URL)}
              style={styles.textInputURL}
            ></TextInput>
          </View>
          <View style={styles.innerContainer}>
            <Text style={styles.header}>Tags</Text>
            <DropDownPicker
              multiple={true}
              open={open}
              value={tags}
              items={allTags}
              setOpen={setOpen}
              setValue={setTags}
              setItems={setAllTags}
              placeholder="Select tags"
              showTickIcon={false}
              dropDownContainerStyle={{
                height: 150,
              }}
              selectedItemLabelStyle={{
                color: "#EFAA82",
              }}
            />
          </View>
        </View>
        <View style={styles.innerContainer}>
          <TouchableOpacity
            onPress={() => history.push("/educational-content")}
            style={styles.button}
          >
            <Text> Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={uploadContent} style={styles.button}>
            <Text>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BodyWrapper>
  );
}

const styles = StyleSheet.create({
  pageHeader: {
    fontSize: 25,
    textAlign: "center",
    marginBottom: 140,
    alignSelf: "center",
  },
  header: {
    fontSize: 17,
    marginTop: 8,
    paddingRight: 20,
    maxWidth: 140,
  },
  innerContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 10,
  },
  textContainer: {
    minHeight: 600,
    marginBottom: 100,
  },
  container: {
    flex: 1,
    position: "absolute",
    minWidth: 700,
    flexDirection: "column",
    alignContent: "center",
    fontFamily: "Titillium Web",
    marginHorizontal: "20%",
    // marginVertical: "5%",
    alignItems: "baseline",
    marginTop: 20,
  },
  textInputTitle: {
    // alignContent: "flex-start",
    // justifyContent: "flex-end",
    height: 40,
    width: 618,
    borderColor: "#EFAA82",
    borderWidth: 2,
    borderRadius: 5,
    marginLeft: 62,
    paddingLeft: 10,
  },
  textInputDescription: {
    width: 620,
    height: 120,
    borderColor: "#EFAA82",
    borderWidth: 2,
    borderRadius: 5,
    marginLeft: 30,
    paddingLeft: 10,
    // paddingBottom: 30,
  },
  textInputURL: {
    width: 620,
    height: 40,
    borderColor: "#EFAA82",
    borderWidth: 2,
    borderRadius: 5,
    marginLeft: 0,
    paddingLeft: 10,
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
