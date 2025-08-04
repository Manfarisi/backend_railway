import mongoose from 'mongoose';
import foodModel from './models/foodModel';

await mongoose.connect(process.env.MONGO_URI);
await foodModel.deleteMany({});
console.log("Semua data di collection 'foods' sudah dihapus.");
