import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import YoutubePlayer, { getYoutubeMeta } from "react-native-youtube-iframe";
import { getTags } from "../models/Tags";
import { BodyWrapper } from "../components/BodyWrapper";
import { getVideosByTag } from "../services/ContentService";
import { useHistory } from "react-router-dom";

interface Props {
  navigation: any;
}

export default class ContentScreen extends React.Component<Props> {
  state = {
    selectedTagValue: "All",
    selectedTagLabel: "all",
    allTags: getTags(),
    videos: [],
  };

  componentDidMount() {
    this.setState({
      allTags: [{ value: "All", label: "all" }, ...this.state.allTags],
    });
    getVideosByTag("All").then((response) =>
      this.setState({ videos: response })
    );
    // this.setState({ videos: getVideosByTag("all") });
  }

  renderTag = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.tagsButton}
      onPress={() => {
        this.setState({ selectedTagValue: item.value });
        this.setState({ selectedTagLabel: item.label });
        getVideosByTag(item.value).then((response) =>
          this.setState({ videos: response })
        );
      }}
    >
      <Text>{item.value}</Text>
    </TouchableOpacity>
  );

  VideoItem = ({
    vId,
    vTitle,
    vDescription,
  }: {
    vId: string;
    vTitle: string;
    vDescription: string;
  }) => {
    const [videoMeta, setVideoMeta] = React.useState(null);
    const history = useHistory();
    useEffect(() => {
      getYoutubeMeta(vId).then((data) => {
        setVideoMeta(data);
      });
    }, [vId]);
    if (videoMeta) {
      return (
        <TouchableOpacity
          style={{ flexDirection: "column", marginVertical: 16 }}
          onPress={() =>
            history.push(`/educational-content/view/${vId}`, {
              URL: vId,
              title: vTitle,
              description: vDescription,
            })
          }
        >
          <Image
            source={{ uri: videoMeta.thumbnail_url }}
            style={{
              width: 250,
              height: 140,
            }}
          />
          <View style={{ justifyContent: "center" }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 12,
                width: 250,
              }}
            >
              {videoMeta.title}
            </Text>
            <Text style={{ paddingTop: 3, fontSize: 10, width: 250 }}>
              {videoMeta.author_name}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
    return null;
  };

  FileUpload = () => {
    const history = useHistory();
    return (
      <TouchableOpacity
        onPress={() => {
          // this.props.navigation.navigate("UploadContentScreen")
          history.push("/educational-content/upload");
        }}
        style={styles.uploadButton}
      >
        <Text>Click here to upload a video...</Text>
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <BodyWrapper>
        <View style={styles.container}>
          <this.FileUpload />
          <FlatList
            horizontal={true}
            data={this.state.allTags}
            renderItem={this.renderTag}
            keyExtractor={(item) => item.value}
          />
          <Text style={styles.categoryText}>{this.state.selectedTagValue}</Text>
          <FlatList
            columnWrapperStyle={{
              flex: 1 / 4,
              justifyContent: "flex-start",
            }}
            numColumns={4}
            data={this.state.videos}
            renderItem={({ item }) => (
              <View
                style={{
                  // maxWidth: Dimensions.get("window").width / 4,
                  // flex: 1 / 4,
                  backgroundColor: "#fff",
                  marginBottom: 10,
                  margin: 30,
                  justifyContent: "space-between",
                }}
              >
                <this.VideoItem
                  vId={item.URL}
                  vTitle={item.title}
                  vDescription={item.description}
                />
              </View>
            )}
          />
        </View>
      </BodyWrapper>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    alignContent: "center",
  },
  uploadButton: {
    alignSelf: "center",
    backgroundColor: "#EFD3D3",
    color: "black",
    textAlign: "center",
    width: "80%",
    borderRadius: 5,
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  tagsButton: {
    backgroundColor: "#EFAA82",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 20,
    marginLeft: 10,
  },
  videosContainer: {
    alignContent: "space-between",
  },
  categoryText: {
    marginTop: 30,
    fontSize: 20,
    borderBottomColor: "#EFAA82",
    borderBottomWidth: 3,
  },
});
