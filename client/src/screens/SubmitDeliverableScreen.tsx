import React from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { BodyWrapper } from "../components/BodyWrapper";
import { useParams } from "react-router-dom";
import * as DocumentPicker from "expo-document-picker";

interface fileBlob {
  file: Buffer;
  name: string;
}

export default function SubmitDeliverablesScreen({
  navigation,
  _deliverable,
  _companyId,
  _dueDate,
}: {
  navigation: any;
  deliverable: string; //placeholder
  companyId: string;
  dueDate: Date;
}) {
  const { companyId } = useParams<{ companyId: string }>();
  const { deliverable } = useParams<{ deliverable: string }>();
  const { dueDate } = useParams<{ dueDate: string }>();

  console.log(dueDate);

  // const [fileBlobs, setFileBlobs] = React.useState<fileBlob[]>([]);
  // const uploadContent = async () => {
  //     if (!fileBlobs) alert("Please submit at least 1 file");
  //     else {
  //         const data = new FormData();
  //         data.append("companyId", companyId);
  //         data.append("files", fileBlobs);
  //         fetch("http://localhost:3000/deliverable:id/submit", {
  //             method: "POST",
  //             headers: {
  //                 Accept: "application/json",
  //                 "Content-Type": "multipart/form-data",
  //             },
  //             body: data,
  //         }).then((response) => {
  //             if ([200, 201].includes(response.status)) alert("Upload Sucessful");
  //             else if ([400, 404, 500].includes(response.status))
  //                 alert("An error occurred. Please try again later");
  //         });
  //     }
  // };

  // const selectFile = async () => {
  //     try {
  //       const res = await DocumentPicker.getDocumentAsync({
  //         type: "*/*",
  //       });
  //       if (res.type === "success") {
  //         const base64Response = await fetch(res.uri);
  //         const blob = await base64Response.blob();
  //         const fileBlob: fileBlob = {
  //             file:blob,
  //             name:res.name
  //         };
  //         setFileBlobs(fileBlobs.concat(fileBlob));
  //       } else if ((res.type = "cancel")) {
  //       }
  //     } catch (err) {
  //       alert("unknown error: " + JSON.stringify(err));
  //       throw err;
  //     }
  //   };

  return (
    <BodyWrapper>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.pageHeader}> Upload Files</Text>
        </View>
        {Date.parse(dueDate) > Date.now() || dueDate == undefined ? (
          <View style={styles.innerContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate("ContentScreen")}
              style={styles.button}
            >
              <Text> Cancel</Text>
            </TouchableOpacity>
            <form
              className="fileUploader"
              action={
                "http://localhost:3000/deliverable" + deliverable + "/submit"
              }
              method="POST"
              encType="multipart/form-data"
            >
              <input type="file" multiple accept="*/*" name="uploadedFiles" />
              <button type="submit">upload</button>
            </form>

            {/* <TouchableOpacity onPress={selectFile} style={styles.button}>
                        <Text>Add file</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={uploadContent} style={styles.button}>
                        <Text>Submit</Text>
                      </TouchableOpacity> */}
            {/* <View><Text>
            Due: {dueDate}</Text></View> */}
          </View>
        ) : (
          "The due date has passed."
        )}
      </View>
    </BodyWrapper>
  );
}

const styles = StyleSheet.create({
  pageHeader: {
    fontSize: 25,
    textAlign: "center",
    marginBottom: 140,
    alignSelf: "center",
  },
  header: {
    fontSize: 17,
    marginTop: 8,
    paddingRight: 20,
    maxWidth: 140,
  },
  innerContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 10,
  },
  textContainer: {
    minHeight: 600,
    marginBottom: 100,
  },
  container: {
    flex: 1,
    position: "absolute",
    minWidth: 700,
    flexDirection: "column",
    alignContent: "center",
    fontFamily: "Titillium Web",
    marginHorizontal: "20%",
    // marginVertical: "5%",
    alignItems: "baseline",
    marginTop: 20,
  },
  textInputTitle: {
    // alignContent: "flex-start",
    // justifyContent: "flex-end",
    height: 40,
    width: 618,
    borderColor: "#EFAA82",
    borderWidth: 2,
    borderRadius: 5,
    marginLeft: 62,
    paddingLeft: 10,
  },
  textInputDescription: {
    width: 620,
    height: 120,
    borderColor: "#EFAA82",
    borderWidth: 2,
    borderRadius: 5,
    marginLeft: 30,
    paddingLeft: 10,
    // paddingBottom: 30,
  },
  textInputURL: {
    width: 620,
    height: 40,
    borderColor: "#EFAA82",
    borderWidth: 2,
    borderRadius: 5,
    marginLeft: 0,
    paddingLeft: 10,
  },
  button: {
    alignSelf: "center",
    backgroundColor: "#EFAA82",
    color: "black",
    alignItems: "center",
    textAlign: "center",
    height: 40,
    width: 100,
    borderRadius: 5,
    marginLeft: 125,
    marginRight: 125,
    paddingTop: 10,
  },
  iconButton: {
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    marginBottom: 50,
  },
});
