import React from "react";
import { StyleSheet, View } from "react-native";
import "../screens/Profile.css";
import { storiesOf } from "@storybook/react";
import { Button } from "@storybook/react/demo";

storiesOf("CreateProfile", module).add("Company Profile Template", () => {
  return (
    <div>
      <div className="main_text">
        <div className="field_title2">
          Company Name:
          <View style={styles.inputView1}>
            <TextInput
              blurOnSubmit={false}
              numberOfLines={1}
              maxLength={40}
              style={styles.TextInput1}
              placeholder="Company Name"
              placeholderTextColor="#003f5c"
            />
          </View>
        </div>
        <div className="field_title2">
          Website:
          <View style={styles.inputView1}>
            <TextInput
              blurOnSubmit={false}
              numberOfLines={1}
              maxLength={40}
              style={styles.TextInput1}
              placeholder="Website"
              placeholderTextColor="#003f5c"
            />
          </View>
        </div>

        <div className="field_title2">
          Industry:
          <View style={styles.inputView1}>
            <TextInput
              blurOnSubmit={false}
              numberOfLines={1}
              maxLength={40}
              style={styles.TextInput1}
              placeholder="Industry"
              placeholderTextColor="#003f5c"
            />
          </View>
        </div>

        <div className="field_title2">
          Company Type:
          <View style={styles.inputView1}>
            <TextInput
              blurOnSubmit={false}
              numberOfLines={1}
              maxLength={40}
              style={styles.TextInput1}
              placeholder="Company Type"
              placeholderTextColor="#003f5c"
            />
          </View>
        </div>

        <div className="field_title1">
          About Us:
          <View style={styles.inputView2}>
            <TextInput
              blurOnSubmit={false}
              numberOfLines={5}
              maxLength={500}
              style={styles.TextInput2}
              placeholder="About Us"
              placeholderTextColor="#003f5c"
            />
          </View>
        </div>

        <div className="field_title1">
          Specialties:
          <View style={styles.inputView2}>
            <TextInput
              blurOnSubmit={false}
              numberOfLines={5}
              maxLength={500}
              style={styles.TextInput2}
              placeholder="Interests/Skills"
              placeholderTextColor="#003f5c"
            />
          </View>
          <Button>
            <Text style={styles.submit}>Submit</Text>
          </Button>
        </div>
      </div>
    </div>
  );
});

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
