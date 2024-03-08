const UserModel = require("../model/user");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dmhos5nnv",
  api_key: "635444285841289",
  api_secret: "PJX7WiOOCe1p5AntC-l0OTmnUFc",
});

class UserController {
  static getalluser = async (req, res) => {
    try {
      res.send("hello world");
    } catch (error) {
      console.log(error);
    }
  };
  static userInsert = async (req, res) => {
    try {
      //console.log(req.files.image);
      const file = req.files.image;
      //image upload
      const uploadImage = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "profileimageapi",
      });
      //console.log(uploadImage);
      //console.log("insert data");
      //console.log(req.body);
      const { n, e, p, cp } = req.body;
      const user = await UserModel.findOne({ email: e });
      //console.log(user);
      if (user) {
        res
          .status(401)
          .json({ status: "failed", message: "THIS EMAIL IS ALREADY EXITS" });
      } else {
        if (n && e && p && cp) {
          if (p == cp) {
            const hashpassword = await bcrypt.hash(p, 10);
            const result = new UserModel({
              name: n,
              email: e,
              password: hashpassword,
              image: {
                public_id: uploadImage.public_id,
                url: uploadImage.secure_url,
              },
            });
            await result.save();
            res.status(201).json({
              status: "success",
              message: "Register Success plz Login! ",
            });
          } else {
            res.status(401).json({
              status: "failed",
              message: "PASSWORD AND CONFIRMPASSWORD DOES NOT MATCH",
            });
          }
        } else {
          res
            .status(401)
            .json({ status: "failed", message: "ALL FIELD ARE REQUIRED" });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
}
module.exports = UserController;
