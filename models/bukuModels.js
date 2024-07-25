const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

const barangScheme = new mongoose.Schema({
  judulBuku: {
    type: String,
  },
  lokasiBuku: {
    type: String,
  },
  gambar: {
    type: String,
  },
  keterangan: {
    type: String,
  },
});

module.exports = mongoose.model("buku", barangScheme);
