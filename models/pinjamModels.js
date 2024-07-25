const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

const barangScheme = new mongoose.Schema({
  email: {
    type: String,
  },
  tgl_pinjam: {
    type: String,
  },
  tgl_pengembalian: {
    type: String,
  },
  judulBuku: {
    type: String,
  },
  status: {
    type: String,
  },
});

module.exports = mongoose.model("peminjaman", barangScheme);
