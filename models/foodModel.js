import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    namaProduk: { type: String, required: true },
    keterangan: { type: String, required: true },
    harga: { type: Number, required: true },
    jumlah: { type: Number, required: true },
    kategori: {
      type: String,
      required: true,
      enum: [
        "Hampers",
        "Frozen",
        "Paket Mini Frozen",
        "Paket Matang",
        "Hampers Neela Klappertart",
      ],
    },
    image: { type: String, required: true },
    hpp: { type: Number, required: true },

    kodeAngka: { type: Number, unique: true },
    idProduk: { type: String, required: true, unique: true }, // kode otomatis
  },
  { timestamps: true }
);

foodSchema.pre("save", async function (next) {
  if (this.isNew) {
    // Auto-increment kodeAngka
    const counter = await counterModel.findByIdAndUpdate(
      { _id: "food_kodeAngka" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.kodeAngka = counter.seq;
  }

  // Generate idProduk dari nama dan kodeAngka
  const inisial = this.namaProduk
    .replace(/\s+/g, "") // hapus spasi
    .toUpperCase()       // kapital
    .slice(0, 3);         // 3 huruf

  const angka = String(this.kodeAngka).padStart(3, "0");

  this.idProduk = `PJ-${inisial}-${angka}`;

  next();
});


const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);
export default foodModel;
