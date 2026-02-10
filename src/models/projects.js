import mongoose, { Schema, models } from "mongoose";
const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    stack: {
      type: [String],
    },
    category: {
      type: String,
      required: true,
    },
    githubLink: {
      type: String,
      required: true,
    },
    liveLink: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
const projects = models.projects || mongoose.model("projects", projectSchema);

export default projects;
