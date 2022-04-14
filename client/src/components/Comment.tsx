import { Divider } from "@material-ui/core";
import React from "react";
import { Button, TextInput } from "react-native";
import sentStatus from "../models/sentStatus";
import { getID } from "../models/User";
import "./Comment.css";

export default class Comment extends React.Component<any> {
  state = {
    newComment: null,
    comments: null,
    loading: true,
  };
  componentDidMount() {
    // console.log(this.props);
    if (this.props.post.comments) {
      setTimeout(() => {
        fetch(
          "http://localhost:3000/education/post/comment/" + this.props.post._id
        ).then((responseJson) => {
          if (responseJson.status === 200 || responseJson.status === 201) {
            responseJson.json().then((data) => {
              // console.log(data);
              this.setState({ comments: data.data, loading: false });
            });
          } else {
            this.setState({ comments: null, loading: false });
          }
        });
      }, 1000);
    }
  }

  postComment = () => {
    const userId: string = getID();
    console.log(
      `Sending comment ${this.state.newComment} as user ID ${userId} to post ${this.props.post._id}`
    );
    if (this.state.newComment && userId) {
      this.setState({ commentStatus: sentStatus.PENDING });
      fetch(
        "http://localhost:3000/education/post/comment/" + this.props.post._id,
        {
          body: JSON.stringify({
            userId: userId,
            content: this.state.newComment,
          }),
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      ).then((responseJson) => {
        if (responseJson.status === 200 || responseJson.status === 201) {
          responseJson.json().then((data) => {
            this.setState({
              commentStatus: sentStatus.SUCCESS,
              newComment: null,
            });
          });
        } else {
          this.setState({ commentStatus: sentStatus.FAILED });
        }
      });
    }
  };

  commentsHTML = (comments: any) => {
    // console.log(comments);
    if (!comments) return <div key="no data">No comments</div>;
    return (
      <div key="data" className="innerComments">
        {comments.map((c: any, i: number) => {
          return (
            <div key={i} className="innerComment">
              {/* <div className="commentPostedBy">Posted by: {c.userId}</div>
            <div className="commentPostedAt">at {c.createdAt}</div> */}
              <div className="commentContent">{c.content}</div>
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    return (
      <div>
        <h3>Comments:</h3>
        <div className="comments" style={{ borderBottom: "Solid 3px orange" }}>
          {this.state.loading
            ? "Loading"
            : this.commentsHTML(this.state.comments)}
        </div>
        <div className="createComment">
          <TextInput
            style={{ padding: 5 }}
            placeholder="Enter a comment"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => this.setState({ newComment: text })}
          />
          <div style={{ width: 100, padding: 11 }}>
            <Button
              title="Post"
              color="#EFAA82"
              onPress={() => this.postComment()}
              disabled={!this.state.newComment}
            />
          </div>
        </div>
      </div>
    );
  }
}
