import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react-native";
import React from "react";
import { ImageBackground, StyleSheet, Image, Text, View } from "react-native";
import {
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";

storiesOf("MessagesScreen", module)
  .add("Add new conversation Button", () => {
    return (<TouchableOpacity
    onPress={() => history.push("/messages/new-conversation")}
  >
    <Text style={styles.newConversation}>Start a New Conversation</Text>
  </TouchableOpacity>);
  })
  .add("Single Conversation Container Active", () => {
    return (
        <TouchableOpacity
        onPress={() => action("pressed conversation container")
        }
        style={styles.chatButtonActive}
      >
        <Text numberOfLines={1} style={styles.chatMember}>
          firstName lastName
        </Text>
        <Text numberOfLines={1} style={styles.chatLastMessage}>
          this was the last message
        </Text>
      </TouchableOpacity>
    );
  }).add("Single Conversation Container Not Active", () => {
    return (
        <TouchableOpacity
        onPress={() => action("pressed conversation container")
        }
        style={styles.chatButton}
      >
        <Text numberOfLines={1} style={styles.chatMember}>
          firstName lastName
        </Text>
        <Text numberOfLines={1} style={styles.chatLastMessage}>
          this was the last message
        </Text>
      </TouchableOpacity>
    );
  }).add("Message container", () => {
    return (
    <View>
        <Text
          style={styles.incomingName}
        >
          firstName lastName
        </Text>
        <View
          style={styles.incomingMessage}
        >
          <Text>this is a message</Text>
          <Text>
            Sent on :{" "}
            July 19, 2010 5:00PM
          </Text>
        </View>
      </View>
    );
  }).add("send new message container", () => {
    return (
        <View style={styles.sendMessageContainer}>
        <TextInput
          style={styles.messageInputBox}
          textAlignVertical="top"
          multiline={true}
          numberOfLines={5}
          placeholder="Send a new message..."
          placeholderTextColor="#003f5c"
        ></TextInput>
        <TouchableOpacity
          style={styles.sendButton}
          onPress={() => action("pressed send message")
          }
        >
          <Text>Send</Text>
        </TouchableOpacity>
      </View>
    );
  });

const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
    },
    sidebar: {
      flex: 1,
      borderRightWidth: 1,
      borderRightColor: "grey",
      height: 1080,
    },
    newConversation: {
      backgroundColor: "#EFAA82",
      borderRadius: 10,
      height: 30,
      width: "70%",
      marginTop: 10,
      marginHorizontal: 10,
      paddingTop: 7,
      textAlign: "center",
      alignSelf: "center",
    },
    conversation: {
      flex: 3,
    },
    chatsHeader: {
      fontSize: 28,
      fontWeight: "bold",
      alignSelf: "flex-start",
      paddingTop: 10,
      textAlign: "center",
      paddingLeft: 10,
    },
    chatButtonActive: {
      backgroundColor: "#F6E8E8",
      borderRadius: 10,
      height: 50,
      padding: 5,
      marginTop: 10,
      marginHorizontal: 10,
    },
    chatButton: {
      backgroundColor: "#E3E1E1",
      borderRadius: 10,
      height: 50,
      padding: 5,
      marginTop: 10,
      marginHorizontal: 10,
    },
    chatMember: {
      alignSelf: "flex-start",
      paddingStart: 5,
      marginBottom: 3,
      fontWeight: "bold",
    },
    chatLastMessage: {
      alignSelf: "flex-start",
      paddingStart: 5,
      color: "grey",
    },
    ConversationHeader: {
      backgroundColor: "#F6E8E8",
      alignContent: "center",
      textAlign: "center",
      fontSize: 28,
      fontWeight: "bold",
      marginBottom: 10,
    },
    incomingMessage: {
      backgroundColor: "#E3E1E1",
      alignSelf: "flex-start",
      maxWidth: "70%",
      paddingHorizontal: 10,
      paddingVertical: 5,
      padding: 10,
      marginVertical: 5,
      borderRadius: 10,
      marginHorizontal: 10,
      alignItems: "flex-start",
    },
    outgoingMessage: {
      backgroundColor: "#E3E1E1",
      alignSelf: "flex-end",
      maxWidth: "70%",
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginVertical: 5,
      borderRadius: 10,
      marginHorizontal: 10,
      alignItems: "flex-end",
    },
    incomingName: {
      alignSelf: "flex-start",
      marginHorizontal: 15,
      marginTop: 5,
      alignItems: "flex-start",
    },
    outgoingName: {
      alignSelf: "flex-end",
      paddingHorizontal: 10,
      alignItems: "flex-end",
      fontSize: 0,
      marginTop: 5,
    },
    sendMessageContainer: {
      backgroundColor: "#EBD6D3",
      borderRadius: 10,
      marginHorizontal: 10,
      alignSelf: "center",
      width: "95%",
      marginTop: 20,
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 20,
    },
    messageInputBox: {
      width: "85%",
      height: 50,
      backgroundColor: "white",
      alignSelf: "center",
      padding: 10,
      borderRadius: 10,
    },
    sendButton: {
      backgroundColor: "#EFAA82",
      color: "black",
      alignSelf: "center",
      textAlign: "center",
      height: 40,
      width: 100,
      borderRadius: 5,
      paddingTop: 10,
    },
  });