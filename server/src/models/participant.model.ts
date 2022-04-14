import { model, Schema, Document } from "mongoose";
import { Participant } from "@interfaces/participant.interface";

const participantSchema: Schema = new Schema({
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

const participantModel = model<Participant & Document>(
  "Participant",
  participantSchema
);

export default participantModel;
