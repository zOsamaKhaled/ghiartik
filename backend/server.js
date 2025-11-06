const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const path = require("path"); // ✅ مضافة هنا

dotenv.config();

app.use(cors());
app.use(express.json());

// ✅ تعريف الموديل
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
  })
);

// ✅ REST API routes
app.post("/register", async (req, res) => {
  const { email, password, phone } = req.body;
  try {
    const newUser = new User({ email, password, phone });
    await newUser.save();
    res.status(201).json({ message: "تم إنشاء الحساب بنجاح", newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "حدث خطأ في السيرفر" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (user) {
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
      res.status(201).json({ message: "تم تسجيل الدخول بنجاح", token });
    } else {
      res.status(400).json({ message: "بيانات غير صحيحة" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "حدث خطأ في السيرفر" });
  }
});

app.post("/forgot", async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "البريد الإلكتروني غير موجود" });
    }
    user.password = newPassword;
    await user.save();
    res.status(200).json({ message: "تم تحديث كلمة المرور بنجاح" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "حدث خطأ في السيرفر" });
  }
});

app.post("/change_data", async (req, res) => {
  const { email, password, phone } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "المستخدم غير موجود" });
    }
    if (password) user.password = password;
    if (phone) user.phone = phone;
    await user.save();
    res.status(200).json({
      message: "تم تحديث البيانات بنجاح",
      updatedUser: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "حدث خطأ في السيرفر" });
  }
});

// ✅ خدمة الواجهة الأمامية
app.use(express.static(path.join(__dirname, "public")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
