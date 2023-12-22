import mongoose, { Schema } from "mongoose";

const AlapadatokSchema = new mongoose.Schema(
  {
      cim: String,
      email: String,
      facebook: String,
      mobil: String,
      vezetekes: String,
  },
  {
      timestamps: true,
  }
);

const Alapadatok = mongoose.models.Alapadatok || mongoose.model("Alapadatok", AlapadatokSchema);

export default Alapadatok;
