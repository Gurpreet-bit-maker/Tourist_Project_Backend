const express = require("express");
let app = express();
let cors = require("cors");
// * important code
require("dotenv").config();
let mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");

// *MoongoDB atlas
async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("mongoDB connect with atlas");
  } catch (error) {
    console.log(error);
  }
}
main();

// * Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:5173", "https://tourist-project-backend.onrender.com"], // frontend URL
    credentials: true, // mandatory for cookies
  }),
);

// * All models
let SignUpModel = require("./Models/signUpModel");
let dummyTourData = require("./exampleData");
let flightData = require("./datas/flight");
let bookedData = require("./Models/bookedFlights");
// *static data
app.use("/Tourist", express.static("public/Tourist"));

// ! Authentication Routes
//  signUp Route
app.post("/user/signup", async (req, res) => {
  try {
    let { userName, userEmail, userPhone, userPassword } = req.body;
    let dcryptPassword = await bcrypt.hash(userPassword, 10);

    let storeData = await SignUpModel.create({
      userName: userName,
      userEmail: userEmail,
      userPhone: userPhone,
      userPassword: dcryptPassword,
    });
    res.status(201).json(storeData);
  } catch (error) {
    console.log(error);
  }
});
// login Route
app.post("/user/login", async (req, res) => {
  try {
    let { userName, userPassword } = req.body;
    let userData = await SignUpModel.findOne({
      $or: [{ userName: userName }, { userEmail: userName }],
    });
    if (!userData) return res.status(400).json({ message: "User Not Found" });
    let dcryptPassword = await bcrypt.compare(
      userPassword,
      userData.userPassword,
    );
    if (!dcryptPassword)
      return res.status(400).json({ message: "wrong Password" });
    let userId = userData._id;
    let userToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("userToken", userToken);
    res.status(201).json({ message: "working" });
  } catch (error) {
    console.log(error);
  }
});

// * auth middleware
let authRoute = (req, res, next) => {
  try {
    let token = req.cookies.userToken;
    let tokenResult = jwt.verify(token, process.env.JWT_SECRET);
    if (!tokenResult) return res.json("you need login again");
    req.user = tokenResult;
    // console.log(tokenResult);
    next();
  } catch (error) {
    res.status(401).json({ message: "please login" });
  }
};

// ! Protected Route
// Store Bookings
app.post("/user/book", authRoute, async (req, res) => {
  try {
    let {
      airline,
      arrivalTime,
      departureTime,
      booked,
      duration,
      from,
      to,

      availableSeats,
      stops,
    } = req.body;
    console.log(req.body);
    let bookedF = await bookedData.create({
      airline: airline,
      arrivalTime: arrivalTime,
      departureTime: departureTime,
      booked: booked,
      duration: duration,
      from: from,
      to: to,
      userId: req.user.userId,
      availableSeats: availableSeats,
      stops: stops,
    });
    console.log(bookedF);
    res.status(201).json("working");
  } catch (error) {
    console.log(error);
  }
});
// Profile
app.get("/user/profile", authRoute, async (req, res) => {
  try {
    let profileData = await SignUpModel.findOne({ _id: req.user.userId });
    res.status(201).json(profileData);
  } catch (error) {
    console.log("profile not");
  }
});
// Bookings
app.get("/user/bookings", authRoute, async (req, res) => {
  try {
    let bookings = await bookedData.findOne({ userId: req.user.userId });
    console.log(bookings);
    res.status(201).json(bookings);
  } catch (error) {
    res.status(400).json({ message: "no any bookings" });
  }
});
// ! get Tour api
// get tour apis
app.get("/user/gettour", (req, res) => {
  res.json(dummyTourData);
});
app.get("/user/flight", (req, res) => {
  res.json(flightData);
});
let PORT = process.env.PORT || 8080;
//! server port
app.listen(8080, () => {
  console.log(`Listning Port On 8080`);
});
