const router = require("express").Router();
const pinjamControler = require("../controller/peminjamanController");

const utilApps = require("../utils/utils_apps");
const multer = require("multer");
const barangModels = require("../models/pinjamModels");
const { isObjectIdOrHexString } = require("mongoose");

router.post("/input", (req, res) => {
  console.log(req.body);
  pinjamControler
    .input(req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.json(error);
    });
});

router.get("/get-all-barang", (req, res) => {
  pinjamControler
    .getAllBarang()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/get-all-pinjam/:idPinjam", (req, res) => {
  pinjamControler
    .getPinjam(req.params.idPinjam)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/get-barang-by-id/:idBarang", (req, res) => {
  console.log(req.params.idBarang);
  pinjamControler
    .getBarangById(req.params.idBarang)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put("/update/:idBarang", (req, res) => {
  //   console.log(req.body);
  let newBody = req.body;
  pinjamControler
    .update(req.params.idBarang, newBody)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.delete("/delete/:idBarang", (req, res) => {
  pinjamControler
    .delete(req.params.idBarang)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
