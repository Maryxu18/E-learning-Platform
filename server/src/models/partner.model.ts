import { model, Schema, Document } from "mongoose";
import { Partner } from "@interfaces/partner.interface";

const partnerSchema: Schema = new Schema({
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

const partnerModel = model<Partner & Document>("Partner", partnerSchema);

export default partnerModel;
