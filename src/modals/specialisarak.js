import mongoose, { Schema } from "mongoose";

const SpecialisarakSchema = new mongoose.Schema(
  {
      csomagolas: String,
      kaposfured: String,
      toponar: String,
      juta: String,
      kaposujlak: String,
      taszar: String,
  },
  {
      timestamps: true,
  }
);

const Specialisarak = mongoose.models.Specialisarak || mongoose.model("Specialisarak", SpecialisarakSchema);

export default Specialisarak;
