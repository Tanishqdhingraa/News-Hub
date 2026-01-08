const multer = require("multer");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowed = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/webp"
];

  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Only JPEG and PNG images allowed"), false);
};

module.exports = multer({ storage, fileFilter });
