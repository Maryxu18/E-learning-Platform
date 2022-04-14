import { model, Schema, Document } from "mongoose";
import { Mentor } from "@interfaces/mentor.interface";

const mentorSchema: Schema = new Schema({
  userID: {
    type: String,
    required: true,
    unique: true,
  },
  aboutMe: {
    type: String,
  },
  proBackground: {
    type: String,
  },
  skills: {
    type: String,
  },
  companyName: {
    type: String,
  },
  companyDescription: {
    type: String,
  },
});

const mentorModel = model<Mentor & Document>("Mentor", mentorSchema);

export default mentorModel;
