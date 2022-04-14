import * as React from "react";
import { ImageBackground, StyleSheet, Image, Text, View } from "react-native";

import { BodyWrapper } from "../components/BodyWrapper";

export function DummyFeed() {
  return (
    <BodyWrapper>
      <View style={{ height: "100%", width: "100%" }}>
        <Text style={{ width: "100%" }}>Feed</Text>
      </View>
    </BodyWrapper>
  );
}

export function DummyEducationalContent() {
  return (
    <BodyWrapper>
      <View style={{ width: "100%", height: "100%" }}>
        <Text>Educational Content</Text>
      </View>
    </BodyWrapper>
  );
}

export function DummyCompanies() {
  return (
    <BodyWrapper>
      <View style={{ width: "100%", height: "100%" }}>
        <Text>Companies</Text>
      </View>
    </BodyWrapper>
  );
}

export function DummyPeople() {
  return (
    <BodyWrapper>
      <View style={{ width: "100%", height: "100%" }}>
        <Text>People</Text>
      </View>
    </BodyWrapper>
  );
}

export function DummyDeliverables() {
  return (
    <BodyWrapper>
      <View style={{ width: "100%", height: "100%" }}>
        <Text>Deliverables</Text>
      </View>
    </BodyWrapper>
  );
}

export function DummyCalendar() {
  return (
    <BodyWrapper>
      <View style={{ width: "100%", height: "100%" }}>
        <Text>Calendar</Text>
      </View>
    </BodyWrapper>
  );
}

export function DummyMessages() {
  return (
    <BodyWrapper>
      <View style={{ width: "100%", height: "100%" }}>
        <Text>Messages</Text>
      </View>
    </BodyWrapper>
  );
}

export function DummySettings() {
  return (
    <BodyWrapper>
      <View style={{ width: "100%", height: "100%" }}>
        <Text>Settings</Text>
      </View>
    </BodyWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EFD3D3",
    position: "absolute",
    width: "100%",
    height: "100%",
    alignItems: "center",
    opacity: 1,
  },
});
