import * as React from "react";
import { Text, View } from "react-native";
import { BodyWrapper } from "../components/BodyWrapper";
import { getTags } from "../models/Tags";
import { getID } from "../models/User";
import { getUserByid } from "../services/UserService";
import { User } from "../../../common/interfaces/users.interface";
import { DummyDeliverables } from "./DummyScreens";
import CreateDeliverables from "./CreateDeliverables";
import SubmissionsFeed from "../components/SubmissionsList";
import { Redirect } from "react-router-dom";

interface Props {
  navigation: any;
  userId: string;
}

interface State {
  user: User | undefined;
}

export default class DeliverablesScreen extends React.Component<Props, State> {
  state: State = {
    user: undefined,
  };

  componentDidMount() {
    getUserByid(this.props.userId || getID()).then((user) => {
      this.setState({
        user: user,
      });
      // console.log("user", user);
    });
  }

  render() {
    if (!this.state.user) {
      return (
        <BodyWrapper>
          <View>
            <Text>{"Loading..."}</Text>
          </View>
        </BodyWrapper>
      );
    } else if (this.state.user.role === "mentor") {
      return (
        <View>
          {/* <CreateDeliverables navigation={this.props.navigation} /> */}
          <View>
            <Redirect to="/deliverables/submissions" />
            <SubmissionsFeed
              navigation={this.props.navigation}
              userId={this.state.user._id}
            />
          </View>
        </View>
      );
      // this.props.navigation.navigate("/deliverables/submissions", {"navigation":this.props.navigation, "userId":this.props.userId});
    } else if (this.state.user.role === "participant") {
      return <DummyDeliverables />;
    } else {
      return (
        <BodyWrapper>
          <View>
            <Text>{"An error occurred"}</Text>
          </View>
        </BodyWrapper>
      );
    }
  }
}
