import express from 'express'
import { addFood,listFood,removeFood,editFood, editIdFood, kurangiStokFood, getFoodById } from '../controllers/foodController.js'
import multer from 'multer'

const foodRouter = express.Router()

// image storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads'); // Pastikan folder "uploads" ada
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

    const upload = multer({storage:storage})

foodRouter.post('/add', upload.single('image'), async (req, res) => {
  try {
    // Debugging - Lihat semua data yang masuk
    console.log("Body:", req.body);
    console.log("File:", req.file);

    const { kodeProduk } = req.body; // Pastikan ini terbaca
    
    if (!kodeProduk) {
      return res.status(400).json({
        success: false,
        message: "Kode produk kosong di backend"
      });
    }
    // ... lanjutkan proses
  } catch (error) {
    console.error("Error detail:", error);
  }
});
foodRouter.get("/list",listFood)
foodRouter.get("/detail/:id",getFoodById)
foodRouter.post("/remove",removeFood)
foodRouter.post("/edit", upload.single("image"), editFood);
foodRouter.get("/edit/:id", editIdFood);
foodRouter.post("/kurangi-stok", kurangiStokFood);






    


export default foodRouter