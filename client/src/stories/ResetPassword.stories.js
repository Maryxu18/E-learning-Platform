import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react-native";
import React from "react";
import { ImageBackground, StyleSheet, Image, Text, View } from "react-native";
import {
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";

storiesOf("ResetPasswordScreen", module)
  .add("reset password button", () => {
    return (
      <TouchableHighlight
        style={styles.resetPassword_button}
        //onPress={async () => LoginAuth({ email, password, setToken })}
      >
        <Text>Reset Password</Text>
      </TouchableHighlight>
    );
  })
  .add("new password input box", () => {
    return (
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry={true}
          style={styles.TextInput}
          placeholder="New Password"
          placeholderTextColor="#003f5c"
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={true}
        />
      </View>
    );
  })
  .add("new password confirmation input box", () => {
    return (
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry={true}
          style={styles.TextInput}
          placeholder="New Password Confirmation"
          placeholderTextColor="#003f5c"
          onChangeText={(confirmPassword) =>
            setConfirmPassword(confirmPassword)
          }
          secureTextEntry={true}
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
  .add("back to login touchable text", () => {
    return (
      <TouchableOpacity
        style={styles.backToLogin_button}
        onPress={() => action("Back to login pressed from reset password page")}
      >
        <Text>Back to Login</Text>
      </TouchableOpacity>
    );
  })
  .add("sign up touchable text", () => {
    return (
      <TouchableOpacity
        style={styles.signup_button}
        onPress={() => action("Sign up pressed from reset password page")}
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

  resetPasswordTitle: {
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "Titillium Web",
  },

  resetPasswordText: {
    height: 30,
    marginTop: 15,
  },

  inputContainer: {
    top: 35,
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
    // width: "100%",
    width: 260,
    textAlign: "left",
    paddingLeft: 10,
  },

  resetPassword_button: {
    backgroundColor: "#EFAA82",
    color: "#EFAA82",
    alignItems: "center",
    height: 40,
    width: "100%",
    borderRadius: 5,
    textAlign: "center",
    paddingTop: 11,
  },

  backToLogin_button: {
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
