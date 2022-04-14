import * as React from "react";
import "./Profile.css";
import { StyleSheet, Text, View } from "react-native";
import { BodyWrapper } from "../components/BodyWrapper";
import { useHistory } from "react-router-dom";
import { getID } from "../models/User";
import { useParams } from "react-router-dom";
import {
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";

export default function CreateProfile({ navigation }) {
  const current_id = getID();
  console.log(current_id);
  const [id, setid] = React.useState("");
  const [companyName, setcompanyName] = React.useState("");
  const [Web, setWeb] = React.useState("");
  const [Industry, setIndustry] = React.useState("");
  const [ComType, setComType] = React.useState("");
  const [aboutUs, setAboutUs] = React.useState("");
  const [Spec, setSpec] = React.useState("");
  const history = useHistory();
  const { CompId } = useParams<{ CompId: string }>();
  const { Id } = useParams<{ Id: string }>();
  const viewComp = (
    <TouchableOpacity
      onPress={() => {
        history.push(`/ViewCompany/${CompId}`);
      }}
    >
      <Text style={styles.submit}>Cancel</Text>
    </TouchableOpacity>
  );

  const url = `http://localhost:3000/company/edit/id${CompId}/id${Id}`;
  console.log(url);
  const handleSubmitButton = () => {
    fetch(url, {
      body:
        "companyName=" +
        companyName +
        "&website=" +
        Web +
        "&industry=" +
        Industry +
        "&companyType=" +
        ComType +
        "&aboutUs=" +
        aboutUs +
        "&specialties=" +
        Spec,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Origin: "http://localhost:19006",
      },
      method: "PUT",
    }).then((responseJson) => {
      console.log(responseJson);
      if (responseJson.status === 200) {
        alert("Edit successfully!");
      } else if (responseJson.status === 404) {
        alert("Not found!");
      } else if (responseJson.status === 400) {
        alert("You are not a member of this company! You cannot modify this!");
      } else {
        alert("Please try again later.");
      }
    });
  };
  return (
    <BodyWrapper>
      <div>
        <div className="main_text">
          <div className="field_title2">
            Company Name:
            <View style={styles.inputView1}>
              <TextInput
                blurOnSubmit={false}
                numberOfLines={1}
                maxLength={40}
                style={styles.TextInput1}
                placeholder="Company Name"
                placeholderTextColor="#003f5c"
                onChangeText={(CN) => setcompanyName(CN)}
              />
            </View>
          </div>
          <div className="field_title2">
            Website:
            <View style={styles.inputView1}>
              <TextInput
                blurOnSubmit={false}
                numberOfLines={1}
                maxLength={40}
                style={styles.TextInput1}
                placeholder="Website"
                placeholderTextColor="#003f5c"
                onChangeText={(website) => setWeb(website)}
              />
            </View>
          </div>

          <div className="field_title2">
            Industry:
            <View style={styles.inputView1}>
              <TextInput
                blurOnSubmit={false}
                numberOfLines={1}
                maxLength={40}
                style={styles.TextInput1}
                placeholder="Industry"
                placeholderTextColor="#003f5c"
                onChangeText={(Ind) => setIndustry(Ind)}
              />
            </View>
          </div>

          <div className="field_title2">
            Company Type:
            <View style={styles.inputView1}>
              <TextInput
                blurOnSubmit={false}
                numberOfLines={1}
                maxLength={40}
                style={styles.TextInput1}
                placeholder="Company Type"
                placeholderTextColor="#003f5c"
                onChangeText={(ComType) => setComType(ComType)}
              />
            </View>
          </div>

          <div className="field_title1">
            About Us:
            <View style={styles.inputView2}>
              <TextInput
                blurOnSubmit={false}
                numberOfLines={5}
                maxLength={500}
                style={styles.TextInput2}
                placeholder="About Us"
                placeholderTextColor="#003f5c"
                onChangeText={(About) => setAboutUs(About)}
              />
            </View>
          </div>

          <div className="field_title1">
            Specialties:
            <View style={styles.inputView2}>
              <TextInput
                blurOnSubmit={false}
                numberOfLines={5}
                maxLength={500}
                style={styles.TextInput2}
                placeholder="Interests/Skills"
                placeholderTextColor="#003f5c"
                onChangeText={(Spec) => setSpec(Spec)}
              />
            </View>
            <TouchableHighlight onPress={handleSubmitButton}>
              <Text style={styles.submit}>Submit</Text>
            </TouchableHighlight>
            {viewComp}
          </div>
        </div>
      </div>
    </BodyWrapper>
  );
}
const styles = StyleSheet.create({
  inputView1: {
    backgroundColor: "white",
    width: "80%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
    borderRadius: 5,
  },

  inputView2: {
    backgroundColor: "white",
    width: "80%",
    height: 140,
    marginBottom: 20,
    alignItems: "center",
    borderRadius: 5,
  },

  TextInput1: {
    height: 50,
    // width: "100%",
    width: "100%",
    textAlign: "left",
    paddingLeft: 20,
  },
  TextInput2: {
    //height: DP.dp185,
    textAlignVertical: "top",
    height: 200,
    // width: "100%",
    width: "100%",
    textAlign: "left",
    paddingLeft: 20,
  },

  login_button: {
    backgroundColor: "#EFAA82",
    color: "#EFAA82",
    alignItems: "center",
    height: 40,
    width: "100%",
    borderRadius: 5,
    textAlign: "center",
    paddingTop: 11,
  },

  submit: {
    color: "red",
    fontWeight: "700",
    fontSize: 30,
    textAlign: "left",
    textDecorationLine: "underline",
  },
});
