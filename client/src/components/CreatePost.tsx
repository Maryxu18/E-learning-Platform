import React, { useContext } from "react";
import { Button, TextInput } from "react-native";
import "./CreatePost.css";

import { LoggedInUserContext } from "../helper/LoginAuth";
import { getID } from "../models/User";

enum postStatus {
  UNSENT,
  PENDING,
  SUCCESS,
  FAILED,
}

type createPostState = {
  postText: string | null;
  postTitle: string | null;
  postTags: string | null;
  postDescription: string | null;
  // userId: string | null,
  postStatus: postStatus;
};

type createPostProps = {
  // userId: String
};

export default class CreatePost extends React.Component<createPostProps> {
  state: createPostState = {
    postText: null,
    postTitle: null,
    postTags: null,
    postDescription: null,
    postStatus: postStatus.UNSENT,
    // userId: null
  };
  handlePostClick = (userId: string | null) => {
    console.log("Sending post as user ID", userId);
    if (
      this.state.postText &&
      this.state.postDescription &&
      this.state.postTags &&
      this.state.postTitle &&
      userId
      // this.state.userId
    ) {
      this.setState({ postStatus: postStatus.PENDING });
      fetch("http://localhost:3000/education/post", {
        body: JSON.stringify({
          description: this.state.postDescription,
          viewAccess: "ANYONE",
          postUser: userId,
          title: this.state.postTitle,
          contentType: "TEXT",
          tags: JSON.stringify([this.state.postTags]),
          content: { text: this.state.postText },
        }),
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }).then((responseJson) => {
        if (responseJson.status === 200 || responseJson.status === 201) {
          responseJson.json().then((data) => {
            this.setState({
              postStatus: postStatus.SUCCESS,
              postText: null,
              postDescription: null,
              postTags: null,
              postTitle: null,
            });
          });
        } else {
          this.setState({ postStatus: postStatus.FAILED });
        }
      });
    }
  };

  postStatusDisplay(status: postStatus) {
    switch (status) {
      case postStatus.UNSENT:
        return <div>Post unsent</div>;
      case postStatus.PENDING:
        return <div>Post sending..</div>;
      case postStatus.SUCCESS:
        return <div>Posted!</div>;
      case postStatus.FAILED:
        return <div>Failed to send post</div>;
      default:
        return <div>Post status error</div>;
    }
  }

  render() {
    return (
      <div
        className="createPost"
        style={{
          padding: 10,
          border: "2px solid #EFD3D3",
          borderRadius: "25px",
          margin: 10,
          backgroundColor: "#EFD3D3",
        }}
      >
        <div style={{ float: "left", alignContent: "left" }}>
          <div style={{ float: "left" }}>
            <TextInput
              placeholder="Enter a title"
              placeholderTextColor="#003f5c"
              onChangeText={(text) => this.setState({ postTitle: text })}
            />
            <TextInput
              placeholder="Tags"
              placeholderTextColor="#003f5c"
              onChangeText={(text) => this.setState({ postTags: text })}
            />
          </div>
          <div style={{ float: "right" }}>
            <TextInput
              placeholder="Enter post text"
              placeholderTextColor="#003f5c"
              onChangeText={(text) => this.setState({ postText: text })}
            />
            <TextInput
              placeholder="Enter a description"
              placeholderTextColor="#003f5c"
              onChangeText={(text) => this.setState({ postDescription: text })}
            />
          </div>
        </div>
        <div style={{ float: "right", padding: 11 }}>
          <Button
            title="Post"
            onPress={() => this.handlePostClick(getID())}
            color="#EFAA82"
            disabled={
              !(
                this.state.postText &&
                this.state.postDescription &&
                // this.state.postTags &&
                this.state.postTitle
              )
            }
          />
        </div>
      </div>
    );
  }
}
