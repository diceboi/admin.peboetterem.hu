import mongoose, { Schema } from "mongoose";

const AlapadatokSchema = new mongoose.Schema(
  {
      newData: String,
  },
  {
      timestamps: true,
  }
);

const Alapadatok = mongoose.models.Alapadatok || mongoose.model("Alapadatok", AlapadatokSchema);

export default Alapadatok;
