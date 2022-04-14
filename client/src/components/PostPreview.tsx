import React from "react";
import Comment from "./Comment";
import "./PostPreview.css";

export default class PostPreview extends React.Component<any> {
  state = {
    loading: true,
    user: undefined,
  };
  componentDidMount() {
    fetch("http://localhost:3000/users/id" + this.props.post.postUser).then(
      (responseJson) => {
        if (responseJson.status === 200 || responseJson.status === 201) {
          responseJson.json().then((data) => {
            this.setState({ user: data.data, loading: false });
          });
        } else {
          this.setState({ user: null, loading: false });
        }
      }
    );
  }

  getContentPreview = (contentType: any, content: any) => {
    if (!content) return <div>No content</div>;
    switch (contentType) {
      case "MEDIA":
        return <div>Media content type not supported.</div>;
      case "TEXT":
        return <div className="textPost">{content.text}</div>;
      case "EMBED":
        return (
          <div>
            <a href={content.URL}>{content.URL}</a>
          </div>
        );
      default:
        return <div>Invalid content type</div>;
    }
  };

  render() {
    return (
      <div
        key={this.props.post._id}
        className="postPreview"
        style={{ borderColor: "#DAA69F", borderWidth: 5 }}
      >
        <div style={{ float: "none" }}>
          <h2 className="postTitle" style={{ float: "left" }}>
            {this.props.post.title}
          </h2>
          <div
            className="postUser"
            style={{ float: "left", paddingTop: 4, paddingLeft: 20 }}
          >
            Posted by:{" "}
            {this.state.loading
              ? "Loading"
              : this.state.user
              ? `${this.state.user.firstName} ${this.state.user.lastName}`
              : "Unknown User"}
          </div>
          <div style={{ float: "right" }} className="postDateTime">
            {this.props.post.postDateTime}
          </div>
        </div>

        <div style={{ float: "none", paddingTop: 30 }}>
          <div style={{ float: "none" }}>
            {this.getContentPreview(
              this.props.post.contentType,
              this.props.post.content
            )}
          </div>
          <div style={{ float: "none" }} className="postDescription">
            {this.props.post.description}
          </div>
          <div style={{ float: "none" }} className="tags">
            {this.props.post.tags.join(" ")}
          </div>

          <div
            style={{
              padding: 10,
              border: "3px solid orange",
              borderRadius: "25px",
              margin: 10,
            }}
          >
            <Comment post={this.props.post} />
          </div>
        </div>
      </div>
    );
  }
}
