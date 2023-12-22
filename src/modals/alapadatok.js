import mongoose, { Schema } from "mongoose";

const AlapadatokSchema = new mongoose.Schema(
  {
      data: String,
  },
  {
      timestamps: true,
  }
);

const Alapadatok = mongoose.models.Alapadatok || mongoose.model("Alapadatok", AlapadatokSchema);

export default Alapadatok;
