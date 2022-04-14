import * as React from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Submission from "../../../common/interfaces/submission.interface";
import sentStatus from "../models/sentStatus";
import { getID } from "../models/User";
import { Colors } from "../constants/Colors";
import UserWidget from "../components/UserWidget";

interface GradeSubmissionProps {
  submission: Submission;
  navigation: any;
}

interface GradeSubmissionState {
  gradeStatus: sentStatus;
  grade: number;
  feedback: string;
}

export default class GradeSubmission extends React.Component<
  GradeSubmissionProps,
  GradeSubmissionState
> {
  state: GradeSubmissionState = {
    gradeStatus: sentStatus.UNSENT,
    grade: NaN,
    feedback: "",
  };
  sendFeedback(grade: number, feedback: string) {
    fetch("http://localhost:3000/submission" + this.props.submission._id, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({
        graderId: getID() || "6100af7410bcc3270d57c211", // TODO: FIX THIS BEFORE MERGING
        grade: grade,
        feedback: feedback,
      }),
    }).then((responseJson) => {
      if (responseJson.status === 200 || responseJson.status === 201) {
        responseJson.json().then(() => {
          this.setState({ gradeStatus: sentStatus.SUCCESS });
          alert("Feedback sent!");
        });
      } else if (responseJson.status === 404) {
        this.setState({ gradeStatus: sentStatus.FAILED });
        alert("Not found!");
      } else if (responseJson.status === 400 || responseJson.status === 500) {
        this.setState({ gradeStatus: sentStatus.FAILED });
        alert("An error occurred.");
      }
    });
  }
  getFiles() {
    // workaround to ensure that we dont navigate to a blank page when no fiels are present
    fetch(
      "http://localhost:3000/download/submission" + this.props.submission._id,
      {
        method: "HEAD",
      }
    ).then((res) => {
      if (res.ok) {
        window.location.href =
          "http://localhost:3000/download/submission" +
          this.props.submission._id;
      } else {
        alert("No file submitted.");
      }
    });
  }
  // getDeliverable(id: string) {
  //     fetch("http://localhost:3000/deliverable/" + id)
  //         .then((res) => {
  //             if (res.status === 200 || res.status === 201) {
  //                 return (res.json() as )
  //             } else if (res.status === 404) {
  //                 return "Not found!";
  //             } else if (res.status === 400 || res.status === 500) {
  //                 return "An error occurred.";
  //             }
  //         });
  // }
  render() {
    return (
      <View style={styles.submissionCard}>
        <Text>
          {/* {this.props.submission.companyId} */}
          {/* {this.props.submission.deliverableId} */}
          {this.props.submission.fileName}
        </Text>
        <Text>
          {"On time: " + (this.props.submission.onTime ? "✅" : "❌")}
        </Text>
        <Button
          title="Download Submission files"
          onPress={() => this.getFiles()}
        />

        {this.props.submission.isGraded ? (
          <View style={styles.horizontal}>
            <Text>Previous grader:</Text>
            <UserWidget userId={this.props.submission.graderId} />
          </View>
        ) : (
          ""
        )}
        <Text>Feedback:</Text>
        <TextInput
          style={styles.inputBox}
          defaultValue={this.props.submission.feedback}
          onChangeText={(text: string) => this.setState({ feedback: text })}
        />
        <View style={styles.horizontal}>
          <Text>Grade:</Text>
          <TextInput
            style={styles.inputBox}
            defaultValue={this.props.submission.grade.toString()}
            keyboardType="number-pad"
            onChangeText={(text: string) =>
              parseInt(text) ? this.setState({ grade: parseInt(text) }) : null
            }
          />
        </View>
        <Button
          title="Submit Grade"
          onPress={() => {
            isNaN(this.state.grade)
              ? null
              : this.sendFeedback(this.state.grade, this.state.feedback);
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  submissionCard: {
    // shadowRadius: 10,
    borderRadius: 20,
    margin: 20,
    padding: 20,
    borderColor: Colors.darkerBrown,
    // backgroundColor: "#efd3d3",
    backgroundColor: Colors.lightBackgroundBrown,
    borderWidth: 4,
  },
  inputBox: {
    borderWidth: 1,
    borderRadius: 2,
    paddingVertical: 5,
    margin: 5,
    backgroundColor: "#FFFFFF",
    opacity: 0.8,
  },
  button: {
    width: "30%",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
