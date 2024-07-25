const router = require("express").Router();
const { application } = require("express");
const { route } = require("express/lib/application");
const controllerUser = require("../controller/userController");
const multer = require("multer");
const utilApps = require("../utils/utils_apps");
const uploadFile = multer({
  storage: utilApps.uploadFile,
}).single("gambar");

router.post("/registrasi", (req, res) => {
  controllerUser
    .registrasiUser(req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/login", (req, res) => {
  controllerUser
    .loginUser(req.body)
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/inputKategori", (req, res) => {
  controllerKategori
    .inputKategori(req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/user-get-all", (req, res) => {
  controllerUser
    .getAllUser(req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/get-user-by-id/:idUser", (req, res) => {
  console.log(req.params.idUser);
  controllerUser
    .getById(req.params.idUser)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put("/updateUser/:idUser", uploadFile, (req, res) => {
  let newBody = JSON.parse(req.body.data);
  console.log(newBody);
  controllerUser
    .updateWebUser(req.params.idUser, newBody)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put("/update/:idUser", uploadFile, (req, res) => {
  let newBody = req.body.data;
  let gambar = utilApps.cekNull(req.file);
  if (gambar !== null) {
    newBody.gambar = gambar;
  }
  // console.log(newBody);
  // console.log(req.params.idUser);
  controllerUser
    .update(req.params.idUser, newBody)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;

//app.use('/users', require())
