import * as React from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import { User } from "../../../common/interfaces/users.interface";
import { Colors } from "../constants/Colors";
import sentStatus from "../models/sentStatus";

interface UserWidgetState {
  user: User | undefined;
  status: sentStatus;
}

interface UserWidgetPropsObject {
  user: User;
}

interface UserWidgetPropsId {
  userId: string;
}

// Takes either a userId or a User object as a prop. If given user ID, fetches user from back end

export default class UserWidget extends React.Component<
  UserWidgetPropsId | UserWidgetPropsObject,
  UserWidgetState
> {
  state: UserWidgetState = {
    status: "userId" in this.props ? sentStatus.UNSENT : sentStatus.SUCCESS,
    user: "userId" in this.props ? undefined : this.props.user,
  };
  componentDidMount() {
    if (
      this.state.status === sentStatus.UNSENT &&
      this.state.user === undefined
    ) {
      fetch(
        "http://localhost:3000/users/id" +
          (this.props as UserWidgetPropsId).userId
      ).then((responseJson) => {
        if (responseJson.status === 200 || responseJson.status === 201) {
          responseJson.json().then((data) => {
            this.setState({ user: data.data, status: sentStatus.SUCCESS });
          });
        } else if (responseJson.status === 404) {
          this.setState({ status: sentStatus.FAILED });
        } else if (responseJson.status === 400 || responseJson.status === 500) {
          this.setState({ status: sentStatus.FAILED });
        }
      });
    }
  }

  render() {
    switch (this.state.status) {
      case sentStatus.PENDING:
        return <Text>Loading..</Text>;
      case sentStatus.FAILED:
        return <Text>Еrror loading user info</Text>;
      case sentStatus.SUCCESS:
        return (
          <View>
            <Text>
              🙂 {(this.state.user as User).firstName}{" "}
              {(this.state.user as User).lastName}
            </Text>
          </View>
        );
      default:
        return <Text>An error occurred</Text>;
    }
  }
}

const styles = StyleSheet.create({
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
