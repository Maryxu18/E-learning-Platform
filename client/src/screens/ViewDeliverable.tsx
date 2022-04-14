import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { BodyWrapper } from "../components/BodyWrapper";
import { getCompID } from "../models/Company";
import { getID } from "../models/User";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useHistory } from "react-router-dom";
import CompanyPage from "./CompanyPage";
import { date } from "@storybook/addon-knobs";

interface Props {
  navigation: any;
}

let _navigation: { navigate: (arg0: string, arg1: any) => void } | undefined =
  undefined;

export default class ViewDeliverable extends React.Component<Props> {
  state = {
    Deli: [],
    Past: [],
    Upcoming: [],
  };

  componentDidMount() {
    _navigation = this.props.navigation;
    fetch(`http://localhost:3000/deliverable/Id${getID()}`, { method: "GET" })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ Deli: responseJson.data });
        for (let i = 0; i < this.state.Deli.length; i++) {
          if (Date.parse(this.state.Deli[i].dueDate) < Date.now()) {
            this.state.Past.push(this.state.Deli[i]);
            this.setState({ Past: this.state.Past });
          } else {
            this.state.Upcoming.push(this.state.Deli[i]);
            this.setState({ Upcoming: this.state.Upcoming });
          }
        }
      })
      .catch(console.log);
  }

  render() {
    return (
      <BodyWrapper>
        <View style={styles.container}>
          <View style={styles.userContainer}>
            <View style={styles.participantContainer}>
              <CreateDeliverable />
            </View>
            <Text style={styles.mentorContainer}>Upcoming Deliverables</Text>
            <Upcoming Upcoming={this.state.Upcoming} />
            <Text style={styles.mentorContainer}>Past Deliverables</Text>
            <Past Past={this.state.Past} />
            {/* <Text style={styles.partnerContainer}>Past Deliverable</Text>
            <PastDeli PastDeli={this.state.Deli} /> */}
          </View>
        </View>
      </BodyWrapper>
    );
  }
  navigateFunc(args: any) {
    // (_navigation as any).navigate('SubmitDeliverablesScreen', args);
  }
}

const CreateDeliverable = () => {
  const history = useHistory();
  return (
    <TouchableOpacity
      onPress={() => {
        history.push(`/CreateDeliverable`);
      }}
    >
      <Text>Click here to create a new deliverable</Text>
    </TouchableOpacity>
  );
};

const Deli = ({ Deli, goToSubmit }: { Deli: any; goToSubmit: Function }) => {
  const history = useHistory();
  return (
    <View>
      <View style={styles.listContainer}>
        {Deli.map((val: any, key: any) => {
          return (
            <View>
              <View style={styles.assignmentContainer}>
                <TouchableOpacity
                  key={key}
                  onPress={() => {
                    history.push(
                      `/deliverables/submit60f1ec71be6a565a10a56917/60f72f8b8f46611e50b8c724/2021-08-30T20:24:23.680+00:00`
                    );
                    // history.push(`/deliverables/submit${Deli._id}/${getCompID() || "60f72f8b8f46611e50b8c724"}/${Deli.dueDate.toString()}`);
                    // goToSubmit({
                    //   navigation: null,
                    //   deliverable: Deli._id,
                    //   companyId: getCompID() || "60f72f8b8f46611e50b8c724",
                    //   dueDate: Deli.dueDate
                    // })
                  }}
                >
                  <Text style={styles.nameText}>
                    {" "}
                    Assignment: {val.name} <br /> Due: {val.dueDate}
                  </Text>
                </TouchableOpacity>
              </View>
              <br />
            </View>
          );
        })}
      </View>
    </View>
  );
};

const Upcoming = ({ Upcoming }: { Upcoming: any }) => {
  const history = useHistory();
  return (
    <View>
      <View style={styles.listContainer}>
        {Upcoming.map((val: any, key: any) => {
          return (
            <View>
              <View style={styles.assignmentContainer}>
                <TouchableOpacity
                  key={key}
                  onPress={() => {
                    history.push(`/ViewFeedback/${val._id}`);
                  }}
                >
                  <Text style={styles.nameText}>
                    {" "}
                    Assignment: {val.name} <br /> Due: {val.dueDate}
                  </Text>
                </TouchableOpacity>
              </View>
              <br />
            </View>
          );
        })}
      </View>
    </View>
  );
};

const Past = ({ Past }: { Past: any }) => {
  const history = useHistory();
  return (
    <View>
      <View style={styles.listContainer}>
        {Past.map((val: any, key: any) => {
          return (
            <View>
              <View style={styles.assignmentContainer}>
                <TouchableOpacity
                  key={key}
                  onPress={() => {
                    history.push(`/ViewFeedback/${val._id}`);
                  }}
                >
                  <Text style={styles.nameText}>
                    {" "}
                    Assignment: {val.name} <br /> Due: {val.dueDate}
                  </Text>
                </TouchableOpacity>
              </View>
              <br />
            </View>
          );
        })}
      </View>
    </View>
  );
};

// const PastDeli = ({ PastDeli }: { PastDeli: any }) => {
//   const history = useHistory();
//   return (
//     <View>
//       <View style={styles.listContainer}>
//         {PastDeli.map((val: any, key: any) => {
//           return (
//             <View>
//               <TouchableOpacity
//                 key={key}
//                 onPress={() => {
//                   history.push(`/ViewCompany/${val._id}`);
//                 }}
//               >
//                 <Text style={styles.nameText}> {val.companyName} </Text>
//               </TouchableOpacity>
//             </View>
//           );
//         })}
//       </View>
//     </View>
//   );
// };

const styles = StyleSheet.create({
  leftAlign: {
    textAlign: "left",
  },
  assignmentContainer: {
    height: 50,
    width: "100%",
    borderColor: "#f7b7c6",
    borderRadius: 10,
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderRightWidth: 3,
  },
  container: {
    backgroundColor: "#f7e9e9",
    width: "100%",
    height: "20",
    flexDirection: "column",
    display: "flex",
    paddingBottom: 25,
  },
  userContainer: {
    backgroundColor: "white",
    marginTop: 25,
    marginLeft: 25,
    marginRight: 25,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  mentorContainer: {
    fontSize: 20,
    backgroundColor: "#f7b7c6",
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: 250,
  },
  partnerContainer: {
    backgroundColor: "#b6f2eb",
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: "max-content",
  },
  participantContainer: {
    backgroundColor: "#f2d8aa",
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: "max-content",
  },
  userTypeText: {
    fontSize: 20,
    fontFamily: "Titillium Web",
  },
  listContainer: {
    //backgroundColor: "#f2d8aa",
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    flexDirection: "column",
    display: "flex",
    width: "max-content",
  },
  listRowContainer: {
    backgroundColor: "#11d83a",
    marginBottom: 15,
    flexDirection: "row",
    display: "flex",
  },
  nameText: {
    fontSize: 15,
    fontFamily: "Titillium Web",
    textAlign: "left",
    paddingBottom: "5px",
  },
  submit: {
    color: "red",
    fontWeight: "700",
    fontSize: 30,
    textAlign: "left",
    textDecorationLine: "underline",
  },
});
