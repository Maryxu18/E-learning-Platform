import React from "react";
import "./Profile.css";
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
import { useEffect, useState, createRef, PureComponent } from "react";
import { getFileInfo } from "prettier";
import { useParams } from "react-router-dom";
import { BodyWrapper } from "../components/BodyWrapper";

export default function CreateProfile() {
  const [ID, setID] = React.useState("");
  const [companyName, setcompanyName] = React.useState("");
  const [companyDescription, setcompanyDescription] = React.useState("");
  const [aboutMe, setaboutMe] = React.useState("");
  const [professionalBackground, setProfessionalBg] = React.useState("");
  const [Skill, setSkill] = React.useState("");
  const [Name, setName] = React.useState("");
  const [Email, setEmail] = React.useState("");
  const { userId } = useParams<{ userId: string }>();

  fetch(`http://localhost:3000/mentors/view-mentor-prof/id${userId}`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Origin: "http://localhost:19006",
    },
    method: "GET",
  }).then((responseJson) => {
    if (responseJson.status === 200 || responseJson.status === 201) {
      responseJson.json().then((data) => {
        console.log(data.data);
        setID(data.data.userID);
        setcompanyName(data.data.companyName);
        setcompanyDescription(data.data.companyDescription);
        setaboutMe(data.data.aboutMe);
        setSkill(data.data.skills);
        setProfessionalBg(data.data.proBackground);
      });
    } else if (responseJson.status === 404) {
      alert("Not found!");
    }
  });

  fetch(`http://localhost:3000/users/id${userId}`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Origin: "http://localhost:19006",
    },
    method: "GET",
  }).then((responseJson) => {
    if (responseJson.status === 201 || responseJson.status === 200) {
      responseJson.json().then((data) => {
        setName(data.data.firstName + " " + data.data.lastName);
        setEmail(data.data.email);
      });
    } else if (responseJson.status === 404) {
      //alert("Not found!");
    }
  });

  // fetch(
  //   "http://localhost:3000/participants/view-participant-prof/id60dc35633c03f07cb5678b6c",
  //   {
  //     headers: {
  //       "Content-Type": "application/x-www-form-urlencoded",
  //       Origin: "http://localhost:19006",
  //     },
  //     method: "GET",
  //   }
  // ).then((responseJson) => {
  //   console.log(responseJson.status);
  //   if (responseJson.status === 200) {
  //     responseJson.json().then((data) =>{
  //       console.log(data.data.userID);
  //       console.log(data.data);
  //       setID(data.data.userID);
  //       setcompanyName(data.data.companyName);
  //       setcompanyDescription(data.data.companyDescription);
  //       setaboutMe(data.data.aboutMe);
  //       setSkill(data.data.skills);
  //       setProfessionalBg(data.data.proBackground);

  //     });
  //   } else if (responseJson.status === 404) {
  //     alert("Not found!");
  //   }
  // });

  return (
    <BodyWrapper>
      <html>
        <div>
          <head>
            <link
              rel="stylesheet"
              href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
            ></link>
            <script src="GetParticipantInfo.js"></script>
          </head>

          <div
            className="basic_info"
            id="info"
            style={{ backgroundColor: "white", width: 600 }}
          >
            <p>Name:{Name}</p>
            <p>Company:{companyName}</p>
            <p>Email:{Email}</p>
          </div>
          <div className="main_text" style={{ backgroundColor: "white" }}>
            <div className="subtitle">
              <h2>About Me</h2>
            </div>
            <p>{aboutMe}</p>
            <br />
            <div className="subtitle">
              <h2>Professional Background</h2>
            </div>
            <p>{professionalBackground}</p>
            <br />
            <div className="subtitle">
              <h2>Company Description</h2>
            </div>
            <p>{companyDescription}</p>
            <br />
            <div className="subtitle">
              <h2>Interests/Skills</h2>
            </div>
            <p>{Skill}</p>
          </div>
        </div>
      </html>
    </BodyWrapper>
  );
}
