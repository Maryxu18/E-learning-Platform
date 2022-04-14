import React from "react";

export default class PostPreview extends React.Component<any> {
  state = {
    loading: true,
    user: undefined,
  };
  componentDidMount() {
    fetch("http://localhost:3000/users/" + this.props.post.postUser).then(
      (responseJson) => {
        if (responseJson.status === 200 || responseJson.status === 201) {
          responseJson.json().then((data) => {
            this.setState({ user: data, loading: false });
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
      <div className="postPreview">
        <div>
          Posted by:{" "}
          {this.state.loading ? "Loading" : this.state.user || "Unknown User"}
        </div>
        <h2>{this.props.post.title}</h2>
        <div>
          {this.getContentPreview(
            this.props.post.contentType,
            this.props.post.content
          )}
        </div>
        <div>{this.props.post.description}</div>
        <div>{this.props.post.tags}</div>
      </div>
    );
  }
}
