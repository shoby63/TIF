// import { Snowflake } from "@theinternetfolks/snowflake";
const Snowflake = require("@theinternetfolks/snowflake");
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
// Generate a version 4 (random) UUID

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
// import User from '../Models/user'
const User = require("../Models/user");
const bcrypt = require("bcrypt");
exports.postSignup = (req, res, next) => {
  let { email, name, password } = req.body;
console.log(req.body);
//   const {email,}
  const id = uuidv4();
  console.log('Generated UUID:', id);
  console.log(req.body.email);
  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (!err) {
      console.log("Hashed password:", hash);
      password = hash;
    } else {
      console.log("hashing failed",err);
    }
  });
//   const id = Snowflake.generate({ timestamp: 1649157035498, shard_id: 4 });
  console.log(id)
  console.log(process.env.SECRET_KEY)
  const newUser = new User({
    id,
    name,
    email,
    password, // Remember to hash the password before saving it
  });
  newUser
    .save()
    .then((savedUser) => {
      const encryptuser = {
        id: id,
        email: email,
        name:name,
        password:req.body.password
      };
    //   const secretKey = crypto.randomBytes(64).toString("hex");
   
      const accessToken = jwt.sign(encryptuser, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });
      const responsePayload = {
        status: true,
        content: {
          data: {
            id:id,
            name: name,
            email: email,
            password: req.body.password            
          },
          meta: {
            access_token: accessToken,
          },
        },
      };
      return res.status(200).json(responsePayload);
    })
    .catch((err) => {
      console.error("User creation failed:", err);
      return res.status(500).json({
        status: false,
        message: "User creation failed",
      });
    });
};
exports.postSignin =  (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email: email, password: password })
    .exec()
    .then((user) => {
      if (!user) {
        console.log("User not found");
        return res
          .status(200)
          .json({ status: false, message: "User does not exist" });
      } else {
        bcrypt
          .compare(password,user?.password)
          .then((result) => {
            if (result) {
              const encryptuser = {
                id: user?.id,
                email: user?.email,
              };
              const accessToken = jwt.sign(
                encryptuser,
                process.env.SECRET_KEY,
                { expiresIn: "1h" }
              );
              const responsePayload = {
                status: true,
                content: {
                  data: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    created_at: user.created_at,
                  },
                  meta: {
                    access_token: accessToken, // Replace with the actual access token
                  },
                },
              };

              return res.status(200).json(responsePayload);
            } else {
              console.log("Password is incorrect");
              return res
                .status(401)
                .json({ message: "Authentication failed, Bad Credentials" });
            }
          })
          .catch((err) => {
            console.error("Password comparison failed:", err);
            //   res.redirect('/v1/auth/signin');
          });
      }
    })
    .catch((error) => {
      console.error("User lookup failed:", error);
      return res.status().json({ message: "try again" });
    });
};
exports.getDetails = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res
      .status(401)
      .json({ status: false, message: "Unauthorized: Missing token" });
  }

  jwt.verify(
    token.replace("Bearer ", ""),
    process.env.SECRET_KEY,
    (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Forbidden: Invalid token" });
      } else {
        const userId = user.id;
        User.findById(id)
          .then((result) => {
            const payload = {
              status: true,
              content: {
                data: {
                  id: result.id,
                  name: result.name,
                  email: result.email,
                  created_at: result.created_at,
                },
              },
            };
            return res.status(200).json(payload);
          })
          .catch((err) => {
            return res
              .status(400)
              .json({ status: false, message: "Request Failed" });
          });
      }
    }
  );
};
