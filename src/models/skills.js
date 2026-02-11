import mongoose, { models } from "mongoose";

const SkillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Skill = models.skills || mongoose.model("skills", SkillSchema);

export default Skill;
