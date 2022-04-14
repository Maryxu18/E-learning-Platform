import React from "react";
import { Text, Platform, StyleSheet, View } from "react-native";

import SideBar from "./SideBar";
import Header from "./Header";

export const BodyWrapper = ({ children }: { children: any }) => {
  return (
    <View
      style={{
        height: "max-content",
        flexDirection: "column",
        display: "flex",
      }}
    >
      <Header />
      <View
        style={{
          flexDirection: "row",
          display: "flex",
          position: "absolute",
          height: "100%",
          marginTop: "70px",
        }}
      >
        <View>
          <SideBar />
        </View>
        <View style={{ height: "max-content", width: "calc(100vw - 117px)" }}>
          {children}
        </View>
      </View>
    </View>
  );
};
