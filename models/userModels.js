const mongoose = require("mongoose");

const userModel = mongoose.Schema({
  namaLengkap: {
    type: String,
  },
  noHp: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
  },
  gambar: {
    type: String,
  },
  jenis_bukti: {
    type: String,
  },
  status_akun: {
    type: String,
  },
});

module.exports = mongoose.model("users", userModel);
