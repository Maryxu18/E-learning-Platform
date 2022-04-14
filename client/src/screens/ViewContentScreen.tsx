import React from "react";
import { View, StyleSheet, Text } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { useLocation } from "react-router-dom";
import { BodyWrapper } from "../components/BodyWrapper";

const ViewContentScreen = ({ route }: { route: any }) => {
  const location = useLocation();
  const { URL, title, description } = location.state;

  return (
    <BodyWrapper>
      <View style={styles.container}>
        <YoutubePlayer height={720} width={1280} videoId={URL}></YoutubePlayer>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>description: {description}</Text>
      </View>
    </BodyWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    alignContent: "center",
    marginTop: 30,
    backgroundColor: "white",
    width: 1280,
    alignSelf: "center",
  },
  title: {
    alignSelf: "flex-start",
    textAlign: "left",
    fontSize: 19,
    fontWeight: "bold",
    paddingLeft: 5,
    paddingBottom: 15,
    paddingTop: 20,
  },
  description: {
    alignSelf: "flex-start",
    textAlign: "left",
    fontSize: 16,
    paddingLeft: 5,
  },
});
export default ViewContentScreen;
