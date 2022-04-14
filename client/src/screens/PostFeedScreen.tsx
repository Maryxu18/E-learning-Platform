import * as React from "react";
import { View } from "react-native";

import { BodyWrapper } from "../components/BodyWrapper";
import CreatePost from "../components/CreatePost";
import PostPreview from "../components/PostPreview";

import "./PostFeedScreen.css";

export default class PostFeedScreen extends React.Component {
  state = {
    loading: true,
    posts: [],
  };
  componentDidMount() {
    fetch("http://localhost:3000/education/post").then((responseJson) => {
      if (responseJson.status === 200 || responseJson.status === 201) {
        responseJson.json().then((data) => {
          this.setState({ posts: data.data, loading: false });
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
        <CreatePost />
        <View style={{ height: "100%", width: "100%" }}>
          <div className="post">
            {this.state.loading ? (
              <div>Loading..</div>
            ) : (
              this.state.posts
                .reverse()
                .map((post: any) => <PostPreview key={post._id} post={post} />)
            )}
          </div>
        </View>
      </BodyWrapper>
    );
  }
}
