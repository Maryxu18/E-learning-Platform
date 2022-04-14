import { model, Schema, Document } from "mongoose";
import { Deliverable } from "@interfaces/deliverable.interface";

const deliverableSchema: Schema = new Schema({
  createdDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  criteria: String,
});

const deliverableModel = model<Deliverable & Document>(
  "Deliverable",
  deliverableSchema
);

export default deliverableModel;
