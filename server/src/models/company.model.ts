import { model, Schema, Document } from "mongoose";
import { Company } from "@interfaces/company.interface";
import { User } from "@interfaces/users.interface";
import Submission from "@/../../common/interfaces/submission.interface";

const companySchema: Schema = new Schema({
  companyName: {
    type: String,
    required: true,
    //unique: true,
  },
  founderName: {
    type: String,
    unique: true,
  },
  website: {
    type: String,
  },
  industry: {
    type: String,
  },
  companyType: {
    type: String,
  },
  aboutUs: {
    type: String,
  },
  specialties: {
    type: String,
  },
  users: {
    type: [],
    required: true,
    unique: true,
  },
  submissions: {
    type: [],
  },
});

const companyModel = model<Company & Document>("Company", companySchema);

export default companyModel;
