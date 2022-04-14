import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react-native";
import React from "react";
import { ImageBackground, StyleSheet, Image, Text, View } from "react-native";
import {
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";

storiesOf("LoginScreen", module)
  .add("login button", () => {
    return (
      <TouchableHighlight
        style={styles.login_button}
        onPress={async () => LoginAuth({ email, password, setToken })}
      >
        <Text>Login</Text>
      </TouchableHighlight>
    );
  })
  .add("text input box", () => {
    return (
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="TextInput"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => action("change text input")}
        />
      </View>
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
  .add("sign up touchable text", () => {
    return (
      <TouchableOpacity
        style={styles.signup_button}
        onPress={() => action("Sign up pressed from login")}
      >
        <Text>Don't have an account? Sign up here</Text>
      </TouchableOpacity>
    );
  });

const styles = StyleSheet.create({
  background: {
    flex: 1,
    // justifyContent: "flex-end",
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
    top: 50,
    alignItems: "center",
  },

  loginText: {
    fontSize: 30,
    fontWeight: "bold",
  },

  inputContainer: {
    top: 80,
  },

  inputView: {
    backgroundColor: "white",
    width: "100%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
    borderRadius: 5,
  },

  TextInput: {
    height: 50,
    width: 260,
    textAlign: "left",
    paddingLeft: 10,
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

  forgot_button: {
    height: 30,
    marginBottom: 30,
    marginTop: 15,
  },

  signup_button: {
    color: "#EFAA82",
    alignContent: "flex-end",
    paddingTop: 100,
  },
});
