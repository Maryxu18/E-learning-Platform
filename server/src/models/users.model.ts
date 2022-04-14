import { model, Schema, Document } from "mongoose";
import { User } from "@interfaces/users.interface";

const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },

  /*profileId: {
	type: String, 
	},*/
});

const userModel = model<User & Document>("User", userSchema);

export default userModel;

// role: participant, mentor, partner
