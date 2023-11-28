import mongoose from "mongoose";

const AlapadatokSchema = new mongoose.Schema(
  {
      title: String,
      data: String,
  },
  {
      timestamps: true,
  }
);

const Alapadatok = mongoose.models.Alapadatok || mongoose.model("Alapadatok", AlapadatokSchema);

export default Alapadatok;
