import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { BodyWrapper } from "../components/BodyWrapper";

import { TouchableOpacity } from "react-native-gesture-handler";
import { useHistory } from "react-router-dom";

export default class PeopleScreen extends React.Component {
  state = {
    participants: [],
    mentors: [],
    partners: [],
  };

  componentDidMount() {
    fetch("http://localhost:3000/users/participants", { method: "GET" })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ participants: responseJson.data });
      })
      .catch(console.log);

    fetch("http://localhost:3000/users/mentors", { method: "GET" })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ mentors: responseJson.data });
      })
      .catch(console.log);

    fetch("http://localhost:3000/users/partners", { method: "GET" })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ partners: responseJson.data });
      })
      .catch(console.log);
  }

  render() {
    return (
      <BodyWrapper>
        <View style={styles.container}>
          <View style={styles.userContainer}>
            <View style={styles.mentorContainer}>
              <Text style={styles.userTypeText}> Mentors </Text>
            </View>
            <Mentors mentors={this.state.mentors} />
          </View>
          <View style={styles.userContainer}>
            <View style={styles.partnerContainer}>
              <Text style={styles.userTypeText}> Partners </Text>
            </View>
            <Partners partners={this.state.partners} />
          </View>
          <View style={styles.userContainer}>
            <View style={styles.participantContainer}>
              <Text style={styles.userTypeText}> Participants </Text>
            </View>
            <Participants participants={this.state.participants} />
          </View>
        </View>
      </BodyWrapper>
    );
  }
}

const Participants = ({ participants }: { participants: any }) => {
  const history = useHistory();
  return (
    <View style={styles.listContainer}>
      {participants.map((val: any, key: any) => {
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
};

const Mentors = ({ mentors }: { mentors: any }) => {
  const history = useHistory();
  return (
    <View style={styles.listContainer}>
      {mentors.map((val: any, key: any) => {
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
};

const Partners = ({ partners }: { partners: any }) => {
  const history = useHistory();
  return (
    <View style={styles.listContainer}>
      {partners.map((val: any, key: any) => {
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
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    flexDirection: "column",
    display: "flex",
    paddingBottom: 25,
  },
  userContainer: {
    backgroundColor: "#f7e9e9",
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
