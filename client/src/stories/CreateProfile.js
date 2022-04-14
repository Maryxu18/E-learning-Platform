import React from "react";
import { StyleSheet, View } from "react-native";
import "../screens/Profile.css";
import { storiesOf } from "@storybook/react";
import { Button } from "@storybook/react/demo";

storiesOf("CreateProfile", module)
  .add("header", () => {
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
      </div>
    );
  })
  .add("input box sample", () => {
    return (
      <div className="main_text">
        <div className="field_title">
          ID:
          <View style={styles.inputView1}>
            <View>Input</View>
          </View>
        </div>
      </div>
    );
  })
  .add("submit button", () => {
    return <Button style={styles.submit}>Submit</Button>;
  })
  .add("side bar", () => {
    return (
      <View>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
        ></link>
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
      </View>
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
