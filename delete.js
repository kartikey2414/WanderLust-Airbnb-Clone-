require("dotenv").config();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");

const dbUrl = process.env.ATLASDB_URL || "mongodb://127.0.0.1:27017/wanderlust";

async function deleteListing() {
  await mongoose.connect(dbUrl);
  await Listing.findByIdAndDelete("6aa27acbe190c129d728e5c3");
  console.log("Listing successfully delete ho gayi!");
  process.exit();
}

deleteListing();