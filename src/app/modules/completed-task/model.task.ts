import { model, Schema } from "mongoose";
import { TTask } from "./interface.task";

const taskSchema = new Schema<TTask>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      required: true,
    },
    deadline: { type: Date, required: true },
    isCompleted: { type: Boolean, default: false },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// export const Tasks = model<TTask>("Task", taskSchema);
