import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react-native";
import React from "react";
import { ImageBackground, StyleSheet, Image, Text, View } from "react-native";
import {
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { BodyWrapper } from "../components/BodyWrapper";

storiesOf("PeopleScreen", module)
  .add("mentor text", () => {
    return <Text style={styles.userTypeText}> Mentors </Text>;
  })
  .add("partner text", () => {
    return <Text style={styles.userTypeText}> Partners </Text>;
  })
  .add("participant text", () => {
    return <Text style={styles.userTypeText}> Participants </Text>;
  })
  .add("header and navigation bar", () => {
    return <BodyWrapper></BodyWrapper>;
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
  .add("clickable participant name", () => {
    return (
      <View style={styles.listContainer}>
        {participants.map((val, key) => {
          return (
            <View>
              <TouchableOpacity
                key={key}
                onPress={() => {
                  history.push(`/people/participant/${val._id}`);
                }}
              >
                <Text style={styles.nameText}>
                  {" "}
                  {val.firstName} {val.lastName}{" "}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    );
  })

  .add("clickable mentor name", () => {
    return (
      <View style={styles.listContainer}>
        {mentors.map((val, key) => {
          return (
            <View>
              <TouchableOpacity
                key={key}
                onPress={() => {
                  history.push(`/people/mentor/${val._id}`);
                }}
              >
                <Text style={styles.nameText}>
                  {" "}
                  {val.firstName} {val.lastName}{" "}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    );
  })

  .add("clickable partner name", () => {
    return (
      <View style={styles.listContainer}>
        {partners.map((val, key) => {
          return (
            <View>
              <TouchableOpacity
                key={key}
                onPress={() => {
                  history.push(`/people/partner/${val._id}`);
                }}
              >
                <Text style={styles.nameText}>
                  {" "}
                  {val.firstName} {val.lastName}{" "}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    );
  });

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f7e9e9",
    width: "100%",
    height: "100%",
    flexDirection: "column",
    display: "flex",
    paddingBottom: 25,
  },
  userContainer: {
    backgroundColor: "white",
    marginTop: 25,
    marginLeft: 25,
    marginRight: 25,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  mentorContainer: {
    backgroundColor: "#f7b7c6",
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: "max-content",
  },
  partnerContainer: {
    backgroundColor: "#b6f2eb",
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: "max-content",
  },
  participantContainer: {
    backgroundColor: "#f2d8aa",
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: "max-content",
  },
  userTypeText: {
    fontSize: 20,
    fontFamily: "Titillium Web",
  },
  listContainer: {
    //backgroundColor: "#f2d8aa",
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    flexDirection: "column",
    display: "flex",
    width: "max-content",
  },
  listRowContainer: {
    backgroundColor: "#11d83a",
    marginBottom: 15,
    flexDirection: "row",
    display: "flex",
  },
  nameText: {
    fontSize: 15,
    fontFamily: "Titillium Web",
    textAlign: "left",
    paddingBottom: "5px",
  },
});
