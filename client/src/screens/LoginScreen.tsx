import * as React from "react";
import { ImageBackground, StyleSheet, Image, Text, View } from "react-native";
import {
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import PropTypes from "prop-types";
import {
  setID,
  setEmail,
  setFirstName,
  setLastName,
  setRole,
} from "../models/User";

LoginScreen.propTypes = {
  setUserID: PropTypes.func.isRequired,
};

export default function LoginScreen({ setUserID, navigation }) {
  const [userEmail, setUserEmail] = React.useState("");
  const [userPassword, setUserPassword] = React.useState("");

  const loginAuth = async () => {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      //mode: "no-cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        Origin: "http://localhost:19006",
      },
      body: "email=" + userEmail + "&password=" + userPassword,
      credentials: "include",
    });
    if (response.status === 200) {
      const data = await response.json();
      setUserID(data.data._id);
      setID({ userID: data.data._id });
      setEmail({ email: data.data.email });
      setFirstName({ firstName: data.data.firstName });
      setLastName({ lastName: data.data.lastName });
      setRole({ role: data.data.role });
    } else {
      alert("incorrect credentials, please try again");
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
          <Text style={styles.loginText}>Login</Text>
          <View style={styles.inputContainer}>
            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="Email"
                placeholderTextColor="#003f5c"
                onChangeText={(email) => setUserEmail(email)}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="Password"
                placeholderTextColor="#003f5c"
                onChangeText={(password) => setUserPassword(password)}
                secureTextEntry={true}
              />
            </View>

            <TouchableHighlight
              style={styles.login_button}
              // onPress={() =>
              //   alert(
              //     " Login Button Pressed \n Email: " +
              //       email +
              //       "\t Password: " +
              //       password
              //   )
              onPress={async () => loginAuth()}
            >
              <Text>Login</Text>
            </TouchableHighlight>
            <TouchableOpacity
              onPress={() => navigation.navigate("ForgotPasswordScreen")}
            >
              <Text style={styles.forgot_button}>Forgot Password?</Text>
            </TouchableOpacity>

            <Text onPress={() => navigation.navigate("SignupScreen")}>
              Don't have an account? Sign up here
            </Text>
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

  loginText: {
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "Titillium Web",
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
