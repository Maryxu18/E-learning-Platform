import * as React from "react";
import "./Profile.css";
import { ImageBackground, StyleSheet, Image, Text, View } from "react-native";
import {
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { useEffect, useState, createRef } from "react";

export default function CreateProfileScreen() {
  const [FirstName, setFirstName] = React.useState("");
  const [LastName, setLastName] = React.useState("");
  const [Email, setEmail] = React.useState("");
  const [PhoneNum, setPhoneNum] = React.useState("");
  const [AboutMe, setAboutMe] = React.useState("");
  const [ProfessionalBg, setProfessionalBg] = React.useState("");
  const [Skill, setSkill] = React.useState("");

  return (
    <div>
      <head>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
        ></link>
      </head>

      <div className="title">
        <h2>
          <div className="bar">
            <div className="top_left">African Impact Challenge</div>
            <div className="User_Logo">
              <a href="http://baidu.com">
                <i className="glyphicon glyphicon-user"></i>
              </a>
            </div>
          </div>
          <div className="title">User Profile</div>
        </h2>
        <hr />
      </div>

      <div className="other_pages">
        <p>
          <a href="http://google.com">
            <i className="glyphicon glyphicon-th"></i>
          </a>
        </p>
        <br />
        <p>
          <a href="http://google.com">
            <i className="glyphicon glyphicon-briefcase"></i>
          </a>
        </p>
        <br />
        <p>
          <a href="http://google.com">
            <i className="glyphicon glyphicon-expand"></i>
          </a>
        </p>
        <br />
        <p>
          <a href="http://google.com">
            <i className="glyphicon glyphicon-user"></i>
          </a>
        </p>
        <br />
        <p>
          <a href="http://google.com">
            <i className="glyphicon glyphicon-list-alt"></i>
          </a>
        </p>
        <br />
        <p>
          <a href="http://google.com">
            <i className="glyphicon glyphicon-calendar"></i>
          </a>
        </p>
        <br />
        <p>
          <a href="http://google.com">
            <i className="glyphicon glyphicon-comment"></i>
          </a>
        </p>
      </div>

      <div className="basic_info">
        <div className="class4">
          <img src="user.png"></img>
        </div>
        <p>ID:</p>
        <p>Name:</p>
        <p>Company:</p>
        <p>Email:</p>
        <p>Phone Number:</p>
      </div>

      <div className="main_text">
        <div className="field_title">
          First Name
          <input width="50px" type="text" placeholder="" />
        </div>
        <div className="field_title">
          Last Name
          <input type="text" placeholder="" />
        </div>
        <div className="field_title">
          Email
          <input type="text" placeholder="" />
        </div>
        <div className="field_title">
          Contact Number
          <input maxLength="50" type="text" placeholder="" />
        </div>
        <div className="field_title1">
          About Me
          <input type="text" placeholder="" />
        </div>
        <div className="field_title1">
          Professional Backgournd
          <input type="text" placeholder="" />
        </div>
        <div className="field_title1">
          Interests/Skills
          <input type="text" placeholder="" />
        </div>
      </div>
    </div>
  );
}
