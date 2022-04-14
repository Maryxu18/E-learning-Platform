import React from "react";
import { StyleSheet, View } from "react-native";
import "../screens/Profile.css";
import { storiesOf } from "@storybook/react";
import { Button } from "@storybook/react/demo";

storiesOf("SignupScreen", module)
  .add("Sign up button", () => {
    return (
      <TouchableHighlight
        style={styles.signupButton}
        onPress={handleSubmitButton}
      >
        <Text>Sign up</Text>
      </TouchableHighlight>
    );
  })
  .add("background", () => {
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
            <Text style={styles.loginText}>Login</Text>
          </View>
        </View>
      </ImageBackground>
    );
  })
  .add("Text Box", () => {
    return (
      <TextInput
        style={styles.TextInput}
        placeholder="Name"
        placeholderTextColor="#000000"
      />
    );
  });

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
