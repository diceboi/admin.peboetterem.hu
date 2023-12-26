import mongoose from "mongoose";

const NapimenuSchema = new mongoose.Schema(
  {
    date: String, 
    aMenuLeves: String,
    aMenuFoetel: String,
    bMenuLeves: String,
    bMenuFoetel: String,
  },
  {
      timestamps: true,
  }
);

const Napimenu = mongoose.models.Napimenu || mongoose.model("Napimenu", NapimenuSchema);

export default Napimenu;
