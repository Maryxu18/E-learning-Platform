import * as React from "react";
import { ImageBackground, StyleSheet, Image, Text, View } from "react-native";
import { useHistory, useParams } from "react-router-dom";
import {
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";

import NotFoundScreen from "./NotFoundScreen";

export default function ResetPasswordScreen({
  navigation,
}: {
  navigation: any;
}) {
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [changed, setChanged] = React.useState<boolean>(false);
  const history = useHistory();
  const { userId, userToken } =
    useParams<{ userId: string; userToken: string }>();

  const handleSubmitButton = async () => {
    if (!password) {
      alert("Please fill password");
      return;
    }

    if (!confirmPassword) {
      alert("Please fill confirm password");
      return;
    }

    let valid = false;
    valid = await fetch(
      `http://localhost:3000/reset-password/${userId}/${userToken}`,
      { method: "GET" }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson.valid;
      })
      .catch((error) => {
        return false;
      });

    if (!valid) {
      alert("Invalid or expired link");
      return;
    }

    if (password != confirmPassword) {
      alert("Password does not match");
      return;
    }

    const options = {
      method: "POST",
      body: "password=" + password + "&confirmPassword=" + confirmPassword,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
    };

    fetch(
      `http://localhost:3000/reset-password/${userId}/${userToken}`,
      options
    );

    alert("Password changed. Going back to login page.");
    history.push("/");
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
          <Text style={styles.resetPasswordTitle}>Reset Password</Text>
          <Text style={styles.resetPasswordText}>
            Please create a new password
          </Text>
          <View style={styles.inputContainer}>
            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="New Password"
                placeholderTextColor="#003f5c"
                onChangeText={(password) => setPassword(password)}
                secureTextEntry={true}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="New Password Confirmation"
                placeholderTextColor="#003f5c"
                onChangeText={(confirmPassword) =>
                  setConfirmPassword(confirmPassword)
                }
                secureTextEntry={true}
              />
            </View>

            <TouchableHighlight
              style={styles.resetPassword_button}
              onPress={handleSubmitButton}
            >
              <Text>Reset Password</Text>
            </TouchableHighlight>
            <TouchableOpacity onPress={() => history.push("/")}>
              <Text style={styles.backToLogin_button}>Back to Login</Text>
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
});
