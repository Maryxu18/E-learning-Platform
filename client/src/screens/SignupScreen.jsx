import * as React from "react";
import { ImageBackground, StyleSheet, Image, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { useEffect, useState, createRef } from "react";
import {
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";

export default function SignUp({ navigation }) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [type, setType] = React.useState("");
  const [selectedValue, setSelectedValue] = useState("user");
  const [errortext, setErrortext] = useState("");
  const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);

  const handleSubmitButton = () => {
    setErrortext("");
    if (!name) {
      alert("Please fill Name");
      return;
    }
    if (!email) {
      alert("Please fill Email");
      return;
    }
    if (!password) {
      alert("Please fill Password");
      return;
    }
    if (!confirmPassword) {
      alert("Please fill Confirm Password");
      return;
    }
    if (!type) {
      alert("Please fill Type");
      return;
    }

    //curl localhost:3000/signup -d 'email=123@example.com' -d 'password=123' -d 'firstName=a' -d 'lastName=b'
    var splitName = name.split(" ");
    var nameFirst = splitName[0];
    var nameLast = splitName[1];

    alert("Account created!");

    fetch("http://localhost:3000/signup", {
      body:
        "email=" +
        email +
        "&password=" +
        password +
        "&firstName=" +
        nameFirst +
        "&lastName=" +
        nameLast +
        "&role=" +
        type,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Origin: "http://localhost:19006",
      },
      method: "POST",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        // If server response message same as Data Matched
        if (responseJson.status === 200) {
          setIsRegistraionSuccess(true);
          console.log("Registration Successful. Please Login to proceed");
        } else {
          setErrortext(responseJson.msg);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <ImageBackground
      style={styles.background}
      source={require("../../assets/images/background.jpg")}
    >
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("../../assets/images/favicon.png")}
          />
          <Text style={styles.signUpText}>Sign Up</Text>
          <View style={styles.inputContainer}>
            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="Name"
                placeholderTextColor="#000000"
                onChangeText={(name) => setName(name)}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="Email"
                placeholderTextColor="#000000"
                onChangeText={(email) => setEmail(email)}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                secureTextEntry={true}
                placeholder="Password"
                placeholderTextColor="#000000"
                onChangeText={(password) => setPassword(password)}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                secureTextEntry={true}
                placeholder="Confirm Password"
                placeholderTextColor="#000000"
                onChangeText={(confirmPassword) =>
                  setConfirmPassword(confirmPassword)
                }
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="User Type"
                placeholderTextColor="#000000"
                onChangeText={(type) => setType(type)}
              />
            </View>
            <TouchableHighlight
              style={styles.signupButton}
              onPress={handleSubmitButton}
            >
              <Text>Sign up</Text>
            </TouchableHighlight>
            <TouchableOpacity
              style={styles.login_button}
              onPress={() => navigation.navigate("LoginScreen")}
            >
              <Text>Already have an account? Login here</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  picker: {
    height: 45,
    width: 150,
  },
  background: {
    flex: 1,
    alignItems: "center",
  },
  container: {
    backgroundColor: "#EFD3D3",
    position: "absolute",
    width: 400,
    height: "100%",
    alignItems: "center",
    opacity: 1,
  },
  logo: {
    width: 150,
    height: 150,
    alignItems: "center",
  },
  logoContainer: {
    position: "absolute",
    top: 20,
    alignItems: "center",
  },
  signUpText: {
    fontFamily: "Titillium Web",
    fontSize: 30,
    fontWeight: "bold",
    alignItems: "left",
    textAlign: "left",
  },
  inputContainer: {
    top: 20,
  },
  inputView: {
    backgroundColor: "rgba(0,0,0,0)",
    width: "100%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
    borderColor: "#984E36",
    borderBottomWidth: 1,
  },
  TextInput: {
    fontFamily: "Titillium Web",
    fontSize: 20,
    fontWeight: "light",
    height: 50,
    width: "100%",
    flex: 1,
    alignItems: "center",
    textAlign: "left",
  },

  signupButton: {
    backgroundColor: "#EFAA82",
    color: "#EFAA82",
    alignItems: "center",
    height: 40,
    width: "100%",
    borderRadius: 5,
    textAlign: "center",
    paddingTop: 11,
  },

  login_button: {
    color: "#EFAA82",
    alignContent: "flex-end",
    paddingTop: 70,
  },
});
