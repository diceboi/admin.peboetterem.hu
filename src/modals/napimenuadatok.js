import mongoose from "mongoose";

const NapimenuadatokSchema = new mongoose.Schema(
  {
    amenuar: String,
    bmenuar: String,
    amenucsakfoetel: String,
    bmenucsakfoetel: String,
    menurendeles: String,
    menukiszallitas: String,
  },
  {
    timestamps: true,
  }
);

const Napimenuadatok = mongoose.models.Napimenuadatok || mongoose.model("Napimenuadatok", NapimenuadatokSchema);

export default Napimenuadatok;
