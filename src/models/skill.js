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
      required: true, // e.g., 'Web Development', 'Languages', 'Tools & Others'
    },
  },
  { timestamps: true },
);

const Skill = models.Skill || mongoose.model("Skill", SkillSchema);

export default Skill;
