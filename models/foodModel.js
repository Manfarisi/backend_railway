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

// Generate idProduk seperti PJ-AYM-001
foodSchema.pre("save", function (next) {
  if (!this.isModified("kodeAngka") && !this.isModified("namaProduk"))
    return next();

  const inisial = this.namaProduk
    .replace(/\s+/g, "") // hapus spasi
    .toUpperCase() // kapital semua
    .slice(0, 3); // ambil 3 huruf pertama

  const angka = String(this.kodeAngka).padStart(3, "0"); // 1 → 001

  this.idProduk = `PJ-${inisial}-${angka}`;

  next();
});

foodSchema.pre("save", async function (next) {
  // Kalau baru, generate kodeAngka dan idProduk
  if (this.isNew) {
    // 1️⃣ Ambil dan increment counter
    const counter = await counterModel.findByIdAndUpdate(
      { _id: "food_kodeAngka" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.kodeAngka = counter.seq;

    // 2️⃣ Buat inisial nama produk
    const inisial = this.namaProduk
      .replace(/\s+/g, "")
      .toUpperCase()
      .slice(0, 3);

    const angka = String(this.kodeAngka).padStart(3, "0");
    this.idProduk = `PJ-${inisial}-${angka}`;
  }
  next();
});

const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);
export default foodModel;
