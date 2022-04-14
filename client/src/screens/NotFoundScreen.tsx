import * as React from "react";
import { ImageBackground, StyleSheet, Image, Text, View } from "react-native";

export default function NotFoundScreen() {
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
          <Text style={styles.title}>404</Text>
          <Text style={styles.title}>Page Not Found</Text>
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

  title: {
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "Titillium Web",
  },
});
