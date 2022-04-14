// import react and components
import "react-native-gesture-handler";
import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "typeface-titillium-web";

// import all screens
import SignupScreen from "./src/screens/SignupScreen";
import LoginScreen from "./src/screens/LoginScreen";
import CreateParticipantProfile from "./src/screens/CreateParticipantProfile";
import UploadContentScreen from "./src/screens/UploadContentScreen";
import ContentScreen from "./src/screens/ContentScreen";
import ViewContentScreen from "./src/screens/ViewContentScreen";
import ResetPasswordScreen from "./src/screens/ResetPasswordScreen";
import ForgotPasswordScreen from "./src/screens/ForgotPasswordScreen";
import ParticipantProfile from "./src/screens/ParticipantProfile";
import MentorProfile from "./src/screens/MentorProfile";
import PartnerProfile from "./src/screens/PartnerProfile";
import EditPartnerProfile from "./src/screens/EditPartnerProfile";
import EditMentorProfile from "./src/screens/EditMentorProfile";
import EditParticipantProfile from "./src/screens/EditPartnerProfile";
import CreatePartnerProfile from "./src/screens/CreatePartnerProfile";
import NotFoundScreen from "./src/screens/NotFoundScreen";
import PostFeedScreen from "./src/screens/PostFeedScreen";
import PeopleScreen from "./src/screens/PeopleScreen";
import CreateDeliverables from "./src/screens/CreateDeliverables";
import ViewCompany from "./src/screens/ViewCompany";
import CreateCompanyProfile from "./src/screens/CreateCompanyProfile";
import EditCompanyProfile from "./src/screens/EditCompanyProfile";
import CompanyPage from "./src/screens/CompanyPage";
import SubmitDeliverablesScreen from "./src/screens/SubmitDeliverableScreen";
import ViewDeliverable from "./src/screens/ViewDeliverable";

// Temporary screens for each page
import {
  DummyFeed,
  DummyEducationalContent,
  DummyCompanies,
  DummyPeople,
  DummyDeliverables,
  DummyMessages,
} from "./src/screens/DummyScreens";
import MessagesScreen from "./src/screens/MessagesScreen";
import NewConversationScreen from "./src/screens/NewConversationScreen";
import DeliverablesScreen from "./src/screens/DeliverablesScreen";
import SubmissionsFeed from "./src/components/SubmissionsList";


// Temporary screens for each page
import { DummyCalendar, DummySettings } from "./src/screens/DummyScreens";
import ViewFeedback from "./src/screens/ViewFeedback";


const Stack = createStackNavigator();

export default function App() {
  const [userID, setUserID] = React.useState();

  if (!userID) {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/reset/:userId/:userToken"
            component={ResetPasswordScreen}
          />
          <Route exact path="/">
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Feed">
                <Stack.Screen
                  name="LoginScreen"
                  options={{ headerShown: false }}
                >
                  {(props) => <LoginScreen {...props} setUserID={setUserID} />}
                </Stack.Screen>
                <Stack.Screen
                  name="SignupScreen"
                  component={SignupScreen}
                  // Hiding header for Splash Screen
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="ForgotPasswordScreen"
                  component={ForgotPasswordScreen}
                  // Hiding header for Splash Screen
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="CreateDeliverables"
                  component={CreateDeliverables}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="CreatePartnerProfile"
                  component={CreatePartnerProfile}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="EditParticipantProfile"
                  component={EditParticipantProfile}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="EditMentorProfile"
                  component={EditMentorProfile}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="EditPartnerProfile"
                  component={EditPartnerProfile}
                  options={{ headerShown: false }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </Route>
          <Route path="/" component={NotFoundScreen} />
        </Switch>
      </Router>
    );
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/feed" component={PostFeedScreen} />
        <Route exact path="/educational-content" component={ContentScreen} />
        <Route
          exact
          path="/educational-content/view/:VideoId"
          component={ViewContentScreen}
        />
        <Route
          exact
          path="/educational-content/upload"
          component={UploadContentScreen}
        />
        <Route exact path="/companies" component={CompanyPage} />
        <Route exact path="/people" component={PeopleScreen} />
        <Route exact path="/deliverables/submissions" component={SubmissionsFeed} />
        <Route exact path="/deliverables" component={DeliverablesScreen} />
        <Route exact path="/CreateDeliverable" component={CreateDeliverables} />
        <Route exact path="/calendar" component={DummyCalendar} />
        {/* <Route exact path="/messages" component={MessagesScreen} /> */}
        <Route exact path="/messages" component={MessagesScreen} />
        <Route
          exact
          path="/messages/new-conversation"
          component={NewConversationScreen}
        />
        ;
        <Route exact path="/settings" component={DummySettings} />
        <Route
          exact
          path="/CreateCompanyProfile"
          component={CreateCompanyProfile}
        />
        <Route
          exact
          path="/EditCompanyProfile/:CompId/:Id"
          component={EditCompanyProfile}
        />
        <Route exact path="/ViewCompany/:CompId" component={ViewCompany} />
        <Route
          exact
          path="/people/participant/:userId"
          component={ParticipantProfile}
        />
        <Route exact path="/people/mentor/:userId" component={MentorProfile} />
        <Route exact path="/people/partner/:userId" component={PartnerProfile} />
        <Route exact path="/deliverables/submit:deliverable/:companyId/:dueDate">
          {(props: any) => <SubmitDeliverablesScreen {...props} navigation={null} deliverable='60f1ec71be6a565a10a56917' companyId='60f72f8b8f46611e50b8c724' />}
        </Route>
        <Route exact path="/ViewFeedback/:deliID" component={ViewFeedback} />
        <Route
          exact
          path="/people/partner/:userId"
          component={PartnerProfile}
        />
        <Route exact path="/">
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Feed">
              <Stack.Screen name="Feed" component={PostFeedScreen} />
              {/* <Stack.Screen name="Messages" component={MessagesScreen} /> */}
              <Stack.Screen name="Messages" component={MessagesScreen} />
              <Stack.Screen
                name="CreatePartnerProfile"
                component={CreatePartnerProfile}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SubmitDeliverablesScreen"
                // component={SubmitDeliverablesScreen}
                options={{ headerShown: false }}
              >
                {(props: any) => <SubmitDeliverablesScreen
                  navigation={null}
                  deliverable='60f1ec71be6a565a10a56917'
                  companyId='60f72f8b8f46611e50b8c724'
                  {...props}
                />}
              </Stack.Screen>
              <Stack.Screen
                name="CreateParticipantProfile"
                component={CreateParticipantProfile}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="EditParticipantProfile"
                component={EditParticipantProfile}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="EditMentorProfile"
                component={EditMentorProfile}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="EditPartnerProfile"
                component={EditPartnerProfile}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ParticipantProfile"
                component={ParticipantProfile}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="MentorProfile"
                component={MentorProfile}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="PartnerProfile"
                component={PartnerProfile}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="CompanyPage"
                component={CompanyPage}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ViewCompany"
                component={ViewCompany}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </Route>
      </Switch>
    </Router>
  );
}
