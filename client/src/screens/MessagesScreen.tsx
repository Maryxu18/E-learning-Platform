import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  ScrollView,
  TextInput,
} from "react-native";
import { BodyWrapper } from "../components/BodyWrapper";
import { getID } from "../models/User";
import {
  addNewMessage,
  getAllConversations,
  getCurrentConversation,
} from "../services/MessageService";
import { useHistory } from "react-router-dom";
// import * as dateFormat from "dateformat"; // not found??

interface Message {
  _id: string;
  userId: string;
  message: string;
  conversationId: string;
  firstName: string;
  lastName: string;
  date: Date;
}

interface Conversation {
  _id: string;
  members: [];
  lastMessage: string;
  updatedAt: Date;
}

export default class MessagesScreen extends React.Component {
  state = {
    conversationList: [],
    currentConversation: {
      _id: "",
      members: [{ _id: "", id: "", firstName: "", lastName: "" }],
      lastMessage: "",
      updatedAt: "",
    },
    conversationHistory: [],
    noMessage: true,
    currentConversationName: "",
    currentConversationId: "",
    newMessage: "",
  };

  componentDidMount() {
    getAllConversations()
      .then((response) => {
        this.setState({ conversationList: response });
      })
      .then(() => {
        if (this.state.conversationList) {
          this.setState({
            currentConversation: this.state.conversationList[0],
          });
        }
      })
      .then(() => {
        this.setState({
          currentConversationName:
            this.state.currentConversation.members[0].firstName +
            " " +
            this.state.currentConversation.members[0].lastName,
        });
        this.setState({
          currentConversationId: this.state.currentConversation._id,
        });
      })
      .then(() => {
        getCurrentConversation({
          conversationId: this.state.currentConversationId,
        }).then((response) => {
          this.setState({ conversationHistory: response });
        });
      });
  }

  setCurrentConversation = (conversation: any) => {
    this.setState({ currentConversation: conversation });
  };

  renderNewMessageButton = () => {
    const history = useHistory();
    return (
      <TouchableOpacity
        onPress={() => history.push("/messages/new-conversation")}
      >
        <Text style={styles.newConversation}>Start a New Conversation</Text>
      </TouchableOpacity>
    );
  };

  forceUpdateHandler() {
    this.forceUpdate();
  }
  render() {
    // const dateFormat = require("dateformat"); // please use ES6 imports
    return (
      <BodyWrapper>
        <View style={styles.container}>
          <View style={styles.sidebar}>
            <Text style={styles.chatsHeader}>Chats</Text>
            <this.renderNewMessageButton />
            <ScrollView>
              {this.state.conversationList?.map((item: Conversation) => {
                return (
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ currentConversation: item });
                        this.setState({ currentConversationId: item._id });
                        this.setState({
                          currentConversationName:
                            item.members[0].firstName +
                            " " +
                            item.members[0].lastName,
                        });
                        getCurrentConversation({
                          conversationId: item._id,
                        }).then((response) => {
                          this.setState({ conversationHistory: response });
                          this.forceUpdate();
                        });
                      }}
                      style={
                        this.state.currentConversationId === item._id
                          ? styles.chatButtonActive
                          : styles.chatButton
                      }
                    >
                      <Text numberOfLines={1} style={styles.chatMember}>
                        {item.members[0].firstName} {item.members[0].lastName}
                      </Text>
                      <Text numberOfLines={1} style={styles.chatLastMessage}>
                        {item.lastMessage}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </ScrollView>
          </View>
          <View style={styles.conversation}>
            <Text style={styles.ConversationHeader} numberOfLines={1}>
              {this.state.currentConversationName}
            </Text>
            <ScrollView
              style={{ maxHeight: Dimensions.get("window").height * 0.85 }}
            >
              {this.state.conversationHistory?.map((message: Message) => {
                return (
                  <View>
                    <Text
                      style={
                        message.userId !== getID()
                          ? styles.incomingName
                          : styles.outgoingName
                      }
                    >
                      {message.firstName} {message.lastName}
                    </Text>
                    <View
                      style={
                        message.userId !== getID()
                          ? styles.incomingMessage
                          : styles.outgoingMessage
                      }
                    >
                      <Text>{message.message}</Text>
                      <Text>
                        Sent on :{" "}
                        {/* {dateFormat(message.date, "mmm dS, yyyy, h:MM:ss TT")} */}
                        {message.date.toString()}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
            <View style={styles.sendMessageContainer}>
              <TextInput
                style={styles.messageInputBox}
                textAlignVertical="top"
                multiline={true}
                numberOfLines={5}
                placeholder="Send a new message..."
                placeholderTextColor="#003f5c"
                onChangeText={(message) =>
                  this.setState({ newMessage: message })
                }
                value={this.state.newMessage}
              ></TextInput>
              <TouchableOpacity
                style={styles.sendButton}
                onPress={() => {
                  addNewMessage({
                    newMessage: this.state.newMessage,
                    conversationId: this.state.currentConversationId,
                  }).then(() => {
                    this.setState({ newMessage: "" });
                    getCurrentConversation({
                      conversationId: this.state.currentConversationId,
                    }).then((response) =>
                      this.setState({ conversationHistory: response })
                    );
                    getAllConversations().then((response) => {
                      this.setState({ conversationList: response });
                    });
                  });
                }}
              >
                <Text>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </BodyWrapper>
    );
  }
}

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
function dateFormat(
  date: Date
):
  | string
  | number
  | boolean
  | {}
  | React.ReactElement<any, string | React.JSXElementConstructor<any>>
  | React.ReactNodeArray
  | React.ReactPortal
  | null
  | undefined {
  throw new Error("Function not implemented.");
}
