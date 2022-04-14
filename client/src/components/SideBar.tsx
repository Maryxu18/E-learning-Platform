import React from "react";
import { Text, StyleSheet, View, Dimensions } from "react-native";
import { useHistory } from "react-router-dom";
import { SideBarData } from "./SideBarData";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function SideNavBar() {
  const history = useHistory();
  const [path, setPath] = React.useState<string>("");

  const handlePress = () => {
    //history.push(val.link);
  };

  return (
    <View style={styles.navbar}>
      <div
        style={{
          border: "solid",
          backgroundColor: "#EFD3D3",
          borderWidth: 1,
          borderColor: "black",
          paddingBottom: 25,
          borderBottomRightRadius: 25,
          borderTop: 0,
          borderLeft: 0,
        }}
      >
        {SideBarData.map((val, key) => {
          return (
            <View style={styles.navButtonContainer}>
              <TouchableOpacity
                style={styles.navButton}
                key={key}
                onPress={() => {
                  history.push(val.link);
                  setPath(val.link);
                }}
              >
                {val.icon}
                <Text style={styles.title}>{val.title}</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </div>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    height: Dimensions.get("window").height,
    width: "100px",
    backgroundColor: "#EFD3D3",
    flexDirection: "column",
    display: "flex",
    alignItems: "center",
    borderColor: "black",
  },

  navButton: {
    alignItems: "center",
  },

  navButtonContainer: {
    backgroundColor: "#EFD3D3",
    width: "100%",
    //alignContent: "flex-end",
    paddingTop: 12,
    paddingBottom: 12,
    alignItems: "center",
  },

  title: {
    fontSize: 14,
    fontFamily: "Titillium Web",
  },
});
