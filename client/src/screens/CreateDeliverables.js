import * as React from "react";
import {
  ImageBackground,
  StyleSheet,
  Image,
  Text,
  View,
  Button,
  Platform,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { useEffect, useState, createRef } from "react";
import {
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { BodyWrapper } from "../components/BodyWrapper";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { getID } from "../models/User";

export default function CreateDeliverables({ navigation }) {
  const current_id = getID();
  const [deliverableName, setName] = React.useState("");
  const [deliverableDescription, setDescription] = React.useState("");
  const [deliverableCriteria, setCriteria] = React.useState("");
  const [type, setType] = React.useState("");
  const [selectedValue, setSelectedValue] = useState("user");
  const [errortext, setErrortext] = useState("");

  const [deliverableDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubmitButton = () => {
    setErrortext("");
    if (!deliverableName) {
      alert("Please fill deliverable name");
      return;
    }
    if (!deliverableDate) {
      alert("Please fill date");
      return;
    }
    if (!deliverableDescription) {
      alert("Please fill description");
      return;
    }
    if (!deliverableCriteria) {
      alert("Please fill criteria");
      return;
    }

    var dataToSend = {
      name: deliverableName,
      dueDate: deliverableDate.toISOString(),
      description: deliverableDescription,
      criteria: deliverableCriteria,
    };

    var formBody = [];

    for (var key in dataToSend) {
      var Key = key;
      var Value = dataToSend[key];
      formBody.push(" -d " + Key + "=" + Value);
    }
    formBody = formBody.join("&");

    alert("Deliverable created!");

    fetch("http://localhost:3000/deliverable/create/id" + current_id, {
      body:
        "name=" +
        deliverableName +
        "&dueDate=" +
        deliverableDate +
        "&description=" +
        deliverableDescription +
        "&criteria=" +
        deliverableCriteria,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Origin: "http://localhost:19006",
      },
      method: "POST",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        // If server response message same as Data Matched
        if (responseJson.status === 201) {
          setIsRegistraionSuccess(true);
          console.log("Deliverable created");
        } else {
          setErrortext(responseJson.msg);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    // <BodyWrapper>
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.inputContainer}>
          <View style={styles.NameView}>
            <Text style={{ textAlign: "left" }}>Deliverable Name</Text>
            <TextInput
              style={styles.NameInput}
              placeholder=""
              placeholderTextColor="#000000"
              onChangeText={(deliverableName) => setName(deliverableName)}
            />
          </View>

          <Text style={{ textAlign: "left" }}>Due Date</Text>
          <View style={styles.DateView}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label=""
                value={deliverableDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
            {/*<TextInput
                style={styles.DateInput}
                placeholder=""
                placeholderTextColor="#000000"
                onChangeText={(deliverableDate) => setDeliverableDate(deliverableDate)}
              />*/}
          </View>
          <Text style={{ textAlign: "left" }}>Description</Text>
          <View style={styles.DescriptionView}>
            <TextInput
              style={styles.DescriptionInput}
              placeholder=""
              placeholderTextColor="#000000"
              onChangeText={(deliverableDescription) =>
                setDescription(deliverableDescription)
              }
            />
          </View>
          <Text style={{ textAlign: "left" }}>Criteria</Text>
          <View style={styles.CriteriaView}>
            <TextInput
              style={styles.CriteriaInput}
              secureTextEntry={false}
              placeholder=""
              placeholderTextColor="#000000"
              onChangeText={(deliverableCriteria) =>
                setCriteria(deliverableCriteria)
              }
            />
          </View>
          <View style={{ alignContent: "center" }}>
            <TouchableHighlight
              style={styles.signupButton}
              onPress={handleSubmitButton}
            >
              <Text>Create</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </View>
    // </BodyWrapper>
  );
}

const styles = StyleSheet.create({
  picker: {
    height: 45,
    width: 150,
  },
  background: {
    flex: 1,
    alignItems: "center",
  },
  container: {
    backgroundColor: "#FFFFFF",
    position: "absolute",
    width: "100%",
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
    top: 20,
    alignItems: "center",
  },
  signUpText: {
    fontFamily: "Titillium Web",
    fontSize: 30,
    fontWeight: "bold",
    alignItems: "left",
    textAlign: "left",
  },
  inputContainer: {
    top: 20,
  },
  inputView: {
    backgroundColor: "rgba(0,0,0,0)",
    height: 150,
    width: 1200,
    marginBottom: 20,
    alignItems: "center",
  },

  NameView: {
    backgroundColor: "rgba(0,0,0,0)",
    height: 50,
    width: 1200,
    marginBottom: 20,
    alignItems: "left",
  },

  DateView: {
    backgroundColor: "rgba(0,0,0,0)",
    height: 50,
    width: 200,
    marginBottom: 20,
    alignItems: "left",
  },

  DescriptionView: {
    backgroundColor: "rgba(0,0,0,0)",
    height: 150,
    width: 1200,
    marginBottom: 20,
    alignItems: "center",
  },

  CriteriaView: {
    backgroundColor: "rgba(0,0,0,0)",
    height: 100,
    width: 1200,
    marginBottom: 20,
    alignItems: "center",
  },

  TextInput: {
    fontFamily: "Titillium Web",
    fontSize: 20,
    fontWeight: "light",
    height: 50,
    width: "100%",
    flex: 1,
    alignItems: "center",
    textAlign: "left",
    borderColor: "#DAA69F",
    borderRadius: 10,
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderRightWidth: 3,
  },

  NameInput: {
    fontFamily: "Titillium Web",
    fontSize: 20,
    fontWeight: "light",
    height: 50,
    width: "100%",
    flex: 1,
    alignItems: "center",
    textAlign: "left",
    borderColor: "#DAA69F",
    borderRadius: 10,
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderRightWidth: 3,
  },

  DateInput: {
    fontFamily: "Titillium Web",
    fontSize: 20,
    fontWeight: "light",
    height: 50,
    width: "100%",
    flex: 1,
    alignItems: "center",
    textAlign: "left",
    borderColor: "#DAA69F",
    borderRadius: 10,
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderRightWidth: 3,
  },

  DescriptionInput: {
    fontFamily: "Titillium Web",
    fontSize: 20,
    fontWeight: "light",
    height: 150,
    width: "100%",
    flex: 1,
    alignItems: "center",
    textAlign: "left",
    borderColor: "#DAA69F",
    borderRadius: 10,
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderRightWidth: 3,
  },

  CriteriaInput: {
    fontFamily: "Titillium Web",
    fontSize: 20,
    fontWeight: "light",
    height: 100,
    width: "100%",
    flex: 1,
    alignItems: "center",
    textAlign: "left",
    borderColor: "#DAA69F",
    borderRadius: 10,
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderRightWidth: 3,
  },

  signupButton: {
    backgroundColor: "#EFAA82",
    color: "#EFAA82",
    alignItems: "center",
    height: 40,
    width: 200,
    borderRadius: 5,
    paddingBottom: 20,
    textAlign: "center",
    paddingTop: 11,
  },

  createButton: {
    backgroundColor: "#EFAA82",
    color: "#EFAA82",
    alignItems: "center",
    height: 40,
    width: "100%",
    borderRadius: 5,
    textAlign: "center",
    paddingTop: 11,
  },

  cancelButton: {
    backgroundColor: "#EFAA82",
    color: "#EFAA82",
    alignItems: "center",
    height: 40,
    width: "100%",
    borderRadius: 5,
    textAlign: "center",
    paddingTop: 11,
  },

  login_button: {
    color: "#EFAA82",
    alignContent: "flex-end",
    paddingTop: 70,
  },
});
