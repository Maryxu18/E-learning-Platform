import * as React from "react";
import { Text, View } from "react-native";
import Submission from "../../../common/interfaces/submission.interface";
import CreateDeliverables from "../screens/CreateDeliverables";
import GradeSubmission from "../screens/GradeSubmissionScreen";
import { BodyWrapper } from "./BodyWrapper";

interface SubmissionsFeedProps {
  navigation: any;
  userId: string;
}

interface SubmissionsFeedState {
  loading: boolean;
  submissions: Array<any>;
}

export default class SubmissionsFeed extends React.Component<
  SubmissionsFeedProps,
  SubmissionsFeedState
> {
  state: SubmissionsFeedState = {
    loading: true,
    submissions: [],
  };
  componentDidMount() {
    fetch("http://localhost:3000/all-submissions").then((responseJson) => {
      if (responseJson.status === 200 || responseJson.status === 201) {
        responseJson.json().then((data) => {
          this.setState({ submissions: data.data, loading: false });
        });
      } else if (responseJson.status === 404) {
        alert("Not found!");
      } else if (responseJson.status === 400 || responseJson.status === 500) {
        alert("An error occurred.");
      }
    });
  }
  render() {
    return (
      <BodyWrapper>
        <View>
          {/* <CreateDeliverables navigation={this.props.navigation} /> */}
          <View>
            {this.state.loading ? (
              <Text>Loading..</Text>
            ) : (
              this.state.submissions.reverse().map((submission: Submission) => (
                <View key={submission._id}>
                  <GradeSubmission
                    submission={submission}
                    navigation={this.props.navigation}
                  />
                </View>
              ))
            )}
          </View>
        </View>
      </BodyWrapper>
    );
  }
}
