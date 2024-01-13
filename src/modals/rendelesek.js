import mongoose from "mongoose";

const RendelesekSchema = new mongoose.Schema(
  { 
    elkeszult: Boolean,
    kiszallitva: Boolean,
    formData: {
      nev: String,
      email: String,
      tel: String,
      irszam: String,
      telepules: String,
      utca: String,
      emelet: String,
      fizetesi: {
        keszpenz: Boolean,
        bankkartya: Boolean,
        szepkartya: Boolean,
      },
      megjegyzes: String,
      adatkezelesi: Boolean,
    },
    cartItems: [
      {
        count: Number,
        tipus: Number,
        elsodlegesar: String,
        masodlagosar: String,
        nev: String,
        _id: String,
        allergenek: String,
        elsoelotag: String,
        kategoria: String,
        masodikelotag: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Rendelesek = mongoose.models.Rendelesek || mongoose.model("Rendelesek", RendelesekSchema);

export default Rendelesek;
