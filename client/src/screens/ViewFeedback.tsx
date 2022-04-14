import React from "react";
import "./Profile.css";
import { BodyWrapper } from "../components/BodyWrapper";
import { useHistory } from "react-router-dom";
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
  const [Description, setDescription] = React.useState("");
  const [Due, setDue] = React.useState("");
  const [Name, setName] = React.useState("");
  const [Assignee, setAssignee] = React.useState("");
  const [Criteria, setCriteria] = React.useState("");
  const [Status, setStatus] = React.useState("");
  const [Grade, setGrade] = React.useState("");
  const [Feedback, setFeedback] = React.useState("");
  const { deliID } = useParams<{ deliID: string }>();
  let flag = 0;
  fetch(`http://localhost:3000/deliverable/delivId${deliID}`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Origin: "http://localhost:19006",
    },
    method: "GET",
  }).then((responseJson) => {
    if (responseJson.status === 200) {
      responseJson.json().then((data) => {
        if (flag == 0) {
          setDescription(data.data.description);
          setName(data.data.name);
          setDue(data.data.dueDate);
          setAssignee(data.data.Assignee);
          setCriteria(data.data.criteria);
          flag++;
        }
      });
    } else if (responseJson.status === 404) {
      alert("Not found!");
    }
  });

  fetch(`http://localhost:3000/view-grade/id${deliID}/id${getID()}`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Origin: "http://localhost:19006",
    },
    method: "GET",
  }).then((responseJson) => {
    if (responseJson.status === 200) {
      responseJson.json().then((data) => {
        console.log(data.data);
        setStatus(data.data.Assignee);
        if (data.data.onTime == true) {
          setStatus("Submission on time");
        } else {
          setStatus("Late Submission");
        }
        setGrade(data.data.grade);
        setFeedback(data.data.feedback);
      });
    } else if (responseJson.status === 404) {
      alert("Not found!");
    }
  });

  const handleSubmitButton = () => {
    fetch(``, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Origin: "http://localhost:19006",
      },
      method: "PUT",
    }).then((responseJson) => {
      console.log(responseJson);
      if (responseJson.status === 201) {
        alert("Join company successfully!");
      } else if (responseJson.status === 500) {
        alert("You are already in a company!");
      } else {
        alert("Please try again later.");
      }
    });
  };

  const history = useHistory();
  const editComp = (
    <TouchableOpacity
      onPress={() => {
        history.push(``);
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
          <div className="main_text">
            <h1>{Name}</h1>
            <h3>
              Due:{Due}&emsp;&emsp;&emsp;&emsp;&emsp;Assignee:{Assignee}
            </h3>
            <View style={styles.lineStyle} />
            <br />
            <div className="subtitle">
              <h2>Description:</h2>
            </div>
            <p>{Description}</p>
            <br />
            <div className="subtitle">
              <h2>Criteria of Evaluation:</h2>
            </div>
            <p>{Criteria}</p>
            <br />
            <div className="subtitle">
              <h2>Submission Status:</h2>
            </div>
            <p>{Status}</p>
            <View style={styles.signupButton}>
              <Text onPress={handleSubmitButton}>Submit a new attempt</Text>
            </View>
            <br />
            <div className="subtitle">
              <h2>Grade:</h2>
            </div>
            <p>{Grade}</p>
            <br />
            <div className="subtitle">
              <h2>Feedback:</h2>
            </div>
            <p>{Feedback}</p>
            <br />
          </div>
        </div>
      </html>
    </BodyWrapper>
  );
}

const styles = StyleSheet.create({
  signupButton: {
    backgroundColor: "#EFAA82",
    color: "#EFAA82",
    alignItems: "center",
    height: 40,
    width: "max-content",
    borderRadius: 5,
    textAlign: "center",
    paddingTop: 11,
  },
  submit: {
    color: "red",
    fontWeight: "400",
    fontSize: 30,
    textAlign: "left",
    textDecorationLine: "underline",
  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor: "black",
    margin: 10,
  },
});
