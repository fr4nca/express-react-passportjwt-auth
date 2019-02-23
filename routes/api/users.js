const express = require("express");
const router = express.Router();

const passport = require("passport");

const checkUserRole = require("../../utils/checkUserRole");

const UserController = require("../../controllers/userController");

// @route   POST api/users/register
// @desc    Login a user
// @returns JWT token
// @params  email, password
// @access  public
router.post("/register", UserController.register);

// @route   POST api/users/register
// @desc    Register a user
// @returns Registered user
// @params  email, password, name
// @access  public
router.post("/login", UserController.login);

// @route   GET api/users/current
// @desc    Returns the current user
// @returns Current user
// @params  email, password, name
// @access  private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  checkUserRole(["admin"]),
  UserController.current
);

module.exports = router;
