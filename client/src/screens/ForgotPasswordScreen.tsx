import * as React from "react";
import { ImageBackground, StyleSheet, Image, Text, View } from "react-native";
import {
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";

export default function ForgotPasswordScreen({
  navigation,
}: {
  navigation: any;
}) {
  const [email, setEmail] = React.useState<string>("");
  const emailValid = false;
  const emailSent = false;

  const handleSubmitButton = async () => {
    if (!email) {
      alert("Please fill Email");
      return;
    }

    const options = {
      method: "POST",
      body: "email=" + email,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
    };

    let res = false;

    res = await fetch("http://localhost:3000/forgot-password", options)
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson.data;
      })
      .catch((error) => {
        return error;
      });

    if (res) {
      alert(
        "A password reset link has been sent to " +
          email +
          ". Please check your inbox"
      );
    } else {
      alert("The email is not valid or it does not exist. Please try again.");
    }
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
          <Text style={styles.forgotPasswordTitle}>Forgot Password?</Text>
          <Text style={styles.forgotPasswordText}>
            Enter your email and we'll send you a reset password link.
          </Text>
          <View style={styles.inputContainer}>
            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="Email"
                placeholderTextColor="#003f5c"
                onChangeText={(email) => setEmail(email)}
              />
            </View>

            <TouchableHighlight
              style={styles.sendLink_button}
              onPress={handleSubmitButton}
            >
              <Text>Send Link</Text>
            </TouchableHighlight>
            <TouchableOpacity
              onPress={() => navigation.navigate("LoginScreen")}
            >
              <Text style={styles.backToLogin_button}>Back to Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.signup_button}
              onPress={() => navigation.navigate("SignupScreen")}
            >
              <Text>Don't have an account? Sign up here</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}
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

  forgotPasswordTitle: {
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "Titillium Web",
  },

  forgotPasswordText: {
    height: 30,
    marginBottom: 20,
    marginTop: 15,
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
    // width: "100%",
    width: 260,
    textAlign: "left",
    paddingLeft: 10,
  },

  sendLink_button: {
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
