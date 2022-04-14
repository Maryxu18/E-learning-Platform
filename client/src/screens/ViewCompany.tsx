import React from "react";
import "./Profile.css";
import { BodyWrapper } from "../components/BodyWrapper";
import { useHistory } from "react-router-dom";
import { setCompID } from "../models/Company";
import {
  View,
  TouchableHighlight,
  Button,
  ActivityIndicator,
  StyleSheet,
  Alert,
  Text,
  Image,
  AppRegistry,
  TextInput,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  TouchableOpacity,
  Switch,
} from "react-native";
import { getID } from "../models/User";
import { useParams } from "react-router-dom";
import { useEffect, useState, createRef, PureComponent } from "react";
import { getFileInfo } from "prettier";
export default function CreateProfile({ navigation }) {
  const [Founder, setFounder] = React.useState("");
  const [CompName, setCompName] = React.useState("");
  const [Ind, setInd] = React.useState("");
  const [Spec, setSpec] = React.useState("");
  const [Web, setWeb] = React.useState("");
  const [Type, setType] = React.useState("");
  const [AboutUs, setAboutUs] = React.useState("");
  const [Members, setMembers] = React.useState("");
  const { CompId } = useParams<{ CompId: string }>();

  fetch(`http://localhost:3000/company/id${CompId}`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Origin: "http://localhost:19006",
    },
    method: "GET",
  }).then((responseJson) => {
    if (responseJson.status === 200) {
      responseJson.json().then((data) => {
        setCompName(data.data.companyName);
        setType(data.data.companyType);
        setFounder(data.data.founderName);
        setAboutUs(data.data.aboutUs);
        setInd(data.data.industry);
        setSpec(data.data.specialties);
        setWeb(data.data.website);
        setMembers(data.data.users);
      });
    } else if (responseJson.status === 404) {
      alert("Not found!");
    }
  });

  const handleSubmitButton = () => {
    fetch(`http://localhost:3000/company/join/id${CompId}/id${getID()}`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Origin: "http://localhost:19006",
      },
      method: "PUT",
    }).then((responseJson) => {
      console.log(responseJson);
      if (responseJson.status === 201) {
        alert("Join company successfully!");
        setCompID({ CompId: CompId });
      } else if (responseJson.status === 500) {
        alert("You are already in a company!");
      } else {
        alert("Please try again later.");
      }
    });
  };

  const handleSubmitButton1 = () => {
    fetch(`http://localhost:3000/company/leave/id${CompId}/id${getID()}`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Origin: "http://localhost:19006",
      },
      method: "PUT",
    }).then((responseJson) => {
      console.log(responseJson);
      if (responseJson.status === 200) {
        alert("Quit company successfully!");
      } else {
        alert("Please try again later.");
      }
    });
  };

  let str = "";
  let index = 1;
  for (let i = 0; i < Members.length; i++) {
    str =
      str +
      index +
      ". " +
      Members[i].firstName +
      " " +
      Members[i].lastName +
      "    ";
    index = index + 1;
  }
  const history = useHistory();
  const editComp = (
    <TouchableOpacity
      onPress={() => {
        history.push(`/EditCompanyProfile/${CompId}/${getID()}`);
      }}
    >
      <Text style={styles.submit}>Edit</Text>
    </TouchableOpacity>
  );
  return (
    <BodyWrapper>
      <html>
        <div>
          <head></head>

          <script src="GetParticipantInfo.js"></script>
          <div className="main_text">
            <div>
              <div className="field_title3">
                <h3>Founder:</h3>
                <p>{Founder}</p>
              </div>
              <div className="field_title3">
                <h3>Industry: </h3>
                <p>{Ind}</p>
              </div>
              <div className="field_title3">
                <h3>Website: </h3>
                <p>{Web}</p>
              </div>
              <div className="field_title3">
                <h3>Type: </h3>
                <p>{Type}</p>
              </div>
            </div>
            <br />
            <div className="subtitle">
              <h2>About Us</h2>
            </div>
            <p>{AboutUs}</p>
            <br />
            <div className="subtitle">
              <h2>Specialties</h2>
            </div>
            <p>{Spec}</p>
            <br />
            <div className="subtitle">
              <h2>Members</h2>
            </div>
            <p>{str}</p>
            <br />
            {editComp}
            <TouchableHighlight onPress={handleSubmitButton}>
              <Text style={styles.submit}>Join</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={handleSubmitButton1}>
              <Text style={styles.submit}>Quit</Text>
            </TouchableHighlight>
          </div>
        </div>
      </html>
    </BodyWrapper>
  );
}

const styles = StyleSheet.create({
  submit: {
    color: "red",
    fontWeight: "400",
    fontSize: 30,
    textAlign: "left",
    textDecorationLine: "underline",
  },
});
