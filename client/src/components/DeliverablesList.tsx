import * as React from "react";
import { View } from "react-native";

import { BodyWrapper } from "../components/BodyWrapper";

interface DeliverableFeedProps {
  navigation: any;
  userId: string;
}

interface DeliverableFeedState {
  loading: boolean;
  submissions: Array<any>;
}

export default class DeliverablesFeed extends React.Component<
  DeliverableFeedProps,
  DeliverableFeedState
> {
  state: DeliverableFeedState = {
    loading: true,
    submissions: [],
  };
  componentDidMount() {
    fetch("http://localhost:3000/deliverable").then((responseJson) => {
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
        <View style={{ height: "100%", width: "100%" }}>
          <h1>Posts</h1>

          <div className="post">
            {this.state.loading ? (
              <div>Loading..</div>
            ) : (
              this.state.submissions
                .reverse()
                .map((deliverable: any) => <View>{deliverable}</View>)
            )}
          </div>
        </View>
      </BodyWrapper>
    );
  }
}
