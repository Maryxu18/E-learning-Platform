import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { BodyWrapper } from "../components/BodyWrapper";

import { TouchableOpacity } from "react-native-gesture-handler";
import { useHistory } from "react-router-dom";

export default class CompanyPage extends React.Component {
  state = {
    company: [],
  };

  componentDidMount() {
    fetch("http://localhost:3000/company", { method: "GET" })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ company: responseJson.data });
      })
      .catch(console.log);
  }

  render() {
    return (
      <BodyWrapper>
        <View style={styles.container}>
          <View style={styles.userContainer}>
            <View style={styles.participantContainer}>
              <Text style={styles.userTypeText}> Companies </Text>
            </View>
            <Company comp={this.state.company} />
          </View>
        </View>
      </BodyWrapper>
    );
  }
}

const Company = ({ comp }: { comp: any }) => {
  const history = useHistory();
  return (
    <View>
      <View style={styles.listContainer}>
        {comp.map((val: any, key: any) => {
          return (
            <View>
              <TouchableOpacity
                key={key}
                onPress={() => {
                  history.push(`/ViewCompany/${val._id}`);
                }}
              >
                <Text style={styles.nameText}> {val.companyName} </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
      <TouchableOpacity
        onPress={() => {
          history.push("/CreateCompanyProfile");
        }}
      >
        <Text style={styles.submit}>Create My Company</Text>
      </TouchableOpacity>
    </View>
  );
};

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
  submit: {
    color: "red",
    fontWeight: "700",
    fontSize: 30,
    textAlign: "left",
    textDecorationLine: "underline",
  },
});
