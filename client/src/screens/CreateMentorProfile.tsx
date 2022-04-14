import * as React from "react";
import "./Profile.css";
import { StyleSheet, Text, View } from "react-native";
import {
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";

export default function CreateProfile() {
  const [ID, setID] = React.useState("");
  const [companyName, setcompanyName] = React.useState("");
  const [companyDescription, setcompanyDescription] = React.useState("");
  const [aboutMe, setaboutMe] = React.useState("");
  const [professionalBackground, setProfessionalBg] = React.useState("");
  const [Skill, setSkill] = React.useState("");

  const handleSubmitButton = () => {
    fetch(
      "http://localhost:3000/mentors/create-mentor-prof/id60bfc490c07c837988da8a55",
      {
        body:
          "userID=" +
          ID +
          "&companyName=" +
          companyName +
          "&companyDescription=" +
          companyDescription +
          "&aboutMe=" +
          aboutMe +
          "&proBackground=" +
          professionalBackground +
          "&skills=" +
          Skill,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Origin: "http://localhost:19006",
        },
        method: "POST",
      }
    ).then((responseJson) => {
      console.log(responseJson);
      if (responseJson.status === 201) {
        alert("Profile has been submitted!");
      } else if (responseJson.status === 404) {
        alert("Not found!");
      } else if (responseJson.status === 409) {
        alert("Your profile already exists!");
      } else {
        alert("Please try again later.");
      }
    });
  };
  return (
    <div>
      <head>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
        ></link>
      </head>

      <div className="title">
        <h2>
          <div className="bar">
            <div className="top_left">African Impact Challenge</div>
            <div className="User_Logo">
              <a href="http://baidu.com">
                <i className="glyphicon glyphicon-user"></i>
              </a>
            </div>
          </div>
          <div className="title">User Profile</div>
        </h2>
        <hr />
      </div>

      <div className="other_pages">
        <p>
          <a href="http://google.com">
            <i className="glyphicon glyphicon-th"></i>
          </a>
        </p>
        <br />
        <p>
          <a href="http://google.com">
            <i className="glyphicon glyphicon-briefcase"></i>
          </a>
        </p>
        <br />
        <p>
          <a href="http://google.com">
            <i className="glyphicon glyphicon-expand"></i>
          </a>
        </p>
        <br />
        <p>
          <a href="http://google.com">
            <i className="glyphicon glyphicon-user"></i>
          </a>
        </p>
        <br />
        <p>
          <a href="http://google.com">
            <i className="glyphicon glyphicon-list-alt"></i>
          </a>
        </p>
        <br />
        <p>
          <a href="http://google.com">
            <i className="glyphicon glyphicon-calendar"></i>
          </a>
        </p>
        <br />
        <p>
          <a href="http://google.com">
            <i className="glyphicon glyphicon-comment"></i>
          </a>
        </p>
      </div>

      <div className="basic_info">
        <div className="class4">
          <img src="user.png"></img>
        </div>
        <p>ID:</p>
      </div>

      <div className="main_text">
        <div className="field_title">
          ID:
          <View style={styles.inputView1}>
            <TextInput
              blurOnSubmit={false}
              numberOfLines={1}
              maxLength={40}
              style={styles.TextInput1}
              placeholder="ID"
              placeholderTextColor="#003f5c"
              onChangeText={(ID) => setID(ID)}
            />
          </View>
        </div>

        <div className="field_title">
          Company Name:
          <View style={styles.inputView1}>
            <TextInput
              blurOnSubmit={false}
              numberOfLines={1}
              maxLength={40}
              style={styles.TextInput1}
              placeholder="Company Name"
              placeholderTextColor="#003f5c"
              onChangeText={(companyName) => setcompanyName(companyName)}
            />
          </View>
        </div>

        <div className="field_title1">
          Company Description
          <View style={styles.inputView2}>
            <TextInput
              blurOnSubmit={false}
              numberOfLines={5}
              maxLength={500}
              style={styles.TextInput2}
              placeholder="Company Description"
              placeholderTextColor="#003f5c"
              onChangeText={(companyDescription) =>
                setcompanyDescription(companyDescription)
              }
            />
          </View>
        </div>

        <div className="field_title1">
          About Me
          <View style={styles.inputView2}>
            <TextInput
              blurOnSubmit={false}
              numberOfLines={5}
              maxLength={500}
              style={styles.TextInput2}
              placeholder="About Me"
              placeholderTextColor="#003f5c"
              onChangeText={(aboutMe) => setaboutMe(aboutMe)}
            />
          </View>
        </div>

        <div className="field_title1">
          Professional Background
          <View style={styles.inputView2}>
            <TextInput
              blurOnSubmit={false}
              numberOfLines={5}
              maxLength={500}
              style={styles.TextInput2}
              placeholder="Professional Background"
              placeholderTextColor="#003f5c"
              onChangeText={(professionalBackground) =>
                setProfessionalBg(professionalBackground)
              }
            />
          </View>
        </div>

        <div className="field_title1">
          Interests/Skills
          <View style={styles.inputView2}>
            <TextInput
              blurOnSubmit={false}
              numberOfLines={5}
              maxLength={500}
              style={styles.TextInput2}
              placeholder="Interests/Skills"
              placeholderTextColor="#003f5c"
              onChangeText={(Skill) => setSkill(Skill)}
            />
          </View>
          <TouchableHighlight onPress={handleSubmitButton}>
            <Text style={styles.submit}>Submit</Text>
          </TouchableHighlight>
        </div>
      </div>
    </div>
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
    width: 350,
    textAlign: "left",
    paddingLeft: 20,
  },
  TextInput2: {
    //height: DP.dp185,
    textAlignVertical: "top",
    height: 200,
    // width: "100%",
    width: 800,
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
