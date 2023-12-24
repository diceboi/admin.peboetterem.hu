import mongoose, { Schema } from "mongoose";

const TermekekSchema = new mongoose.Schema(
  {
      nev: String,
      kategoria: String,
      elsodlegesar: String,
      masodlagosar: String,
      elsoelotag: String,
      masodikelotag: String,
      allergenek: String,
  },
  {
      timestamps: true,
  }
);

const Termekek = mongoose.models.Termekek || mongoose.model("Termekek", TermekekSchema);

export default Termekek;
