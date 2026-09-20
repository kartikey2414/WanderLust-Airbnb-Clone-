const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const wrapAsync = require("../utils/wrapAsync.js");
const signupController = require("../controllers/user.js");

router
  .route("/signup")
  .get(signupController.renderSignup)
  .post(wrapAsync(signupController.signup));

router
  .route("/login")
  .get((req, res) => {
    res.render("users/login.ejs");
  })
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    signupController.login,
  );

router.get("/logout", signupController.logout);

module.exports = router;
