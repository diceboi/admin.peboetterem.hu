import mongoose from "mongoose";

const NapimenuadatokSchema = new mongoose.Schema(
  {
    amenuar: String,
    bmenuar: String,
    amenucsakfoetel: String,
    bmenucsakfoetel: String,
    menurendeles: String,
    menukiszallitas: String,
    amenuelfogyott: Boolean,
    bmenuelfogyott: Boolean,
    amenuleveselfogyott: Boolean,
    bmenuleveselfogyott: Boolean,
  },
  {
    timestamps: true,
  }
);

const Napimenuadatok = mongoose.models.Napimenuadatok || mongoose.model("Napimenuadatok", NapimenuadatokSchema);

export default Napimenuadatok;
