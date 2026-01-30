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
    origin: true,
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
    res.cookie("userToken", userToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 3600000,
      path: "/",
    });
    
    res.status(201).json("now you are login for 1 hour");
  } catch (error) {
    console.log(error);
  }
});

// logout

// * auth middleware
let authRoute = (req, res, next) => {
  try {
    let token = req.cookies.userToken;
    let tokenResult = jwt.verify(token, process.env.JWT_SECRET);
    if (!tokenResult) return res.json("token expire");
    req.user = tokenResult;
    
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json("please Login");
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
    let bookings = await bookedData.find({ userId: req.user.userId });

    res.status(201).json(bookings);
  } catch (error) {
    res.status(400).json({ message: "no any bookings" });
  }
});
// Bookings best flight
app.post("/user/best", authRoute, async (req, res) => {
  let checkMaxLimit = await bookedData.find({ userId: req.user.userId });
  if (checkMaxLimit.length >= 2) {
    return res.json({ message: "length is full" });
  }
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
      price,
      persons,
    } = req.body;
    let bestBook = await bookedData.create({
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
      price: price,
      persons: persons,
    });
    // console.log(bestBook);
    res.status(201).json(bestBook);
  } catch (error) {
    console.log(error);
  }
});
// Events
app.get("/user/events", authRoute, async (req, res) => {
  try {
    let eventData = await bookedData.find({ _id: req.user.userId });
    res.json(eventData);
  } catch (error) {
    console.log(error);
  }
});
app.post("/user/logout", (req, res) => {
  res.cookie("userToken", "", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    path: "/",
    expires: new Date(0),
  });

  res.json("removed");
});

// ! get Tour api
app.get("/user/gettour", (req, res) => {
  res.json(dummyTourData);
});
app.get("/user/flight", (req, res) => {
  res.json(flightData);
});
let PORT = process.env.PORT || 5000;

//! server port
app.listen(PORT, () => {
  console.log(`Listning Port On ${PORT}`);
});

// try {
//   let {
//     airline,
//     arrivalTime,
//     departureTime,
//     booked,
//     duration,
//     from,
//     to,
//     availableSeats,
//     stops,
//     price,
//     persons,
//   } = req.body;
//   let bookedF = await bookedData.create({
//     airline: airline,
//     arrivalTime: arrivalTime,
//     departureTime: departureTime,
//     booked: booked,
//     duration: duration,
//     from: from,
//     to: to,
//     userId: req.user.userId,
//     availableSeats: availableSeats,
//     stops: stops,
//     price: price,
//     persons: persons,
//   });
//   console.log(bookedF);
//   res.status(201).json(bookedF);
// } catch (error) {
//   console.log(error);
//   res.status(400).json({ message: "bad request" });
// }
