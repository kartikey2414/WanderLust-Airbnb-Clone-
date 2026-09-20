
const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const ListingController = require("../controllers/listing.js");
const { isLoggedin, isOwner, validateListing } = require("../middleware.js");
const multer = require("multer");
const { storage } = require("../cloudconfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(ListingController.index))
  .post(
    isLoggedin,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(ListingController.createListing),
  );

router.get("/new", isLoggedin, ListingController.renderNewForm);

router
  .route("/:id")
  .get(isLoggedin, wrapAsync(ListingController.showListing))
  .put(
    isLoggedin,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(ListingController.updateListing),
  )
  .delete(
    isLoggedin,
    isOwner,
    wrapAsync(ListingController.destroyListing),
  );

router.get(
  "/:id/edit",
  isLoggedin,
  isOwner,
  wrapAsync(ListingController.editListing),
);

module.exports = router;