import mongoose from 'mongoose';
import foodModel from './models/foodModel';

await mongoose.connect(process.env.MONGODB_URI);
await foodModel.deleteMany({});
console.log("Semua data di collection 'foods' sudah dihapus.");
