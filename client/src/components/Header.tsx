import React from "react";
import { Text, StyleSheet, View, Image } from "react-native";

export default function Header() {
  return (
    <View style={styles.header}>
      <View>
        <Image
          style={styles.logo}
          source={require("../../assets/images/favicon.png")}
        />
      </View>
      <View>
        <Text style={styles.title}>African Impact Challenge</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: "70px",
    width: "100%",
    backgroundColor: "#EFD3D3",
    borderBottomWidth: 1,
  },

  logo: {
    height: "90px",
    width: "90px",
    position: "absolute",
    left: "30px",
  },

  title: {
    fontSize: 25,
    fontWeight: "bold",
    fontFamily: "Titillium Web",
    paddingTop: "25px",
    paddingLeft: "140px",
  },
});
