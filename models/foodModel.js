import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  namaProduk: String,
  harga: Number,
  jumlah: Number,
  keterangan: String,
  kategori: String,
  hpp: Number,
  kodeAngka: Number, // ini untuk auto-increment
  idProduk: String,  // ini untuk keperluan scan, cari, dsb
  image: String,
})

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
