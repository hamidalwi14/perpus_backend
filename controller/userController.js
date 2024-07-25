const userModel = require("../models/userModels");
const bcrypt = require("bcrypt");
const objectId = require("mongoose").Types.ObjectId;

exports.registrasiUser = (data) =>
  new Promise(async (resolve, reject) => {
    const salt = bcrypt.genSaltSync(10);
    const encript = bcrypt.hashSync(data.password, salt);
    Object.assign(data, {
      password: encript,
    });

    userModel
      .findOne({
        email: data.email,
      })
      .then((sudahAdaUser) => {
        if (sudahAdaUser) {
          reject({
            status: false,
            msg: "Email Sudah Terdaftar",
          });
        } else {
          userModel
            .create(data)
            .then(() => {
              resolve({
                status: true,
                msg: "Berhasil Membuat User Baru",
              });
            })
            .catch((err) => {
              reject({
                status: false,
                msg: "Terjadi Kesalahan Pada Server",
              });
            });
        }
      });
  });

exports.loginUser = (data) =>
  new Promise(async (resolve, reject) => {
    const { email, password } = data;

    console.log(email, password);

    userModel.findOne({ email: email }).then((user) => {
      if (user) {
        const isValid = bcrypt.compareSync(password, user.password);

        if (!isValid) {
          return resolve({
            status: false,
            msg: "password Salah!",
          });
        }
        resolve({
          status: true,
          msg: "Login Berhasil",
          data: user,
        });
      } else {
        reject({
          status: false,
          msg: "Email Anda Tidak Terdaftar",
        });
      }
    });
  });

exports.getAllUser = () =>
  new Promise((resolve, reject) => {
    userModel
      .find({})
      .then((user) => {
        if (user.length > 0) {
          resolve({
            status: true,
            msg: "Berhasil memuat data",
            data: user.reverse(),
          });
        } else {
          reject({
            status: false,
            msg: "Tidak ada data",
          });
        }
      })
      .catch((err) => {
        reject({
          status: false,
          msg: "Terjadi kesalahan pada server",
        });
      });
  });

exports.getById = (idUser) =>
  new Promise((resolve, reject) => {
    userModel
      .findOne({ _id: objectId(idUser) })
      .then((barangs) => {
        if (barangs != null) {
          resolve({
            status: true,
            msg: "Berhasil memuat data",
            data: barangs,
          });
        } else {
          reject({
            status: false,
            msg: "Tidak ada data",
          });
        }
      })
      .catch((err) => {
        reject({
          status: false,
          msg: "Terjadi kesalahan pada server",
        });
      });
  });

exports.update = (idUser, data) =>
  new Promise((resolve, reject) => {
    console.log(data);
    console.log(idUser);
    userModel
      .updateOne({ _id: objectId(idUser) }, data)
      .then(() => {
        resolve({
          status: true,
          msg: "Data berhasil dirubah",
        });
      })
      .catch((err) => {
        reject({
          status: false,
          msg: "Terjadi Kesalahan pada server",
        });
      });
  });

exports.updateWebUser = (idUser, data) =>
  new Promise((resolve, reject) => {
    userModel
      .updateOne({ _id: objectId(idUser) }, data)
      .then(() => {
        resolve({
          status: true,
          msg: "Data berhasil dirubah",
        });
      })
      .catch((err) => {
        reject({
          status: false,
          msg: "Terjadi Kesalahan pada server",
        });
      });
  });

exports.delete = (idBarang) =>
  new Promise((resolve, reject) => {
    userModel
      .deleteOne({ _id: objectId(idBarang) })
      .then(() => {
        resolve({
          status: true,
          msg: "Berhasil Menghapus data",
        });
      })
      .catch(() => {
        reject({
          status: false,
          msg: "Terjadi Kesalahan Pada server",
        });
      });
  });
