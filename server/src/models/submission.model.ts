import { model, Schema, Document } from "mongoose";
import Submission from "@interfaces/submission.interface";

const submissionSchema: Schema = new Schema(
  {
    companyId: {
      type: String,
      required: true,
    },
    deliverableId: {
      type: String,
      required: true,
    },
    fileId: {
      type: String,
      required: true,
    },
    fileName: String,
    grade: Number,
    feedback: String,
    onTime: Boolean,
    isGraded: Boolean,
    graderId: String,
  },
  { timestamps: true }
);

const submissionModel = model<Submission & Document>(
  "Submission",
  submissionSchema
);

export default submissionModel;
