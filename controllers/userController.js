const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/User");

const keys = require("../config/keys");

class UserController {
  // Register a user
  static async register(req, res, next) {
    const { email, password, name, role } = req.body;
    try {
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ error: "Email already exists" });
      } else {
        const newUser = new User({
          name,
          email,
          password,
          role
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, async (err, hashed) => {
            if (err) throw err;
            newUser.password = hashed;
            try {
              const registeredUser = await newUser.save();
              return res.json(registeredUser);
            } catch (e) {
              return res.status(400).json({ error: e.message });
            }
          });
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  // Login a user
  static async login(req, res, next) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ error: "User not registered" });
      }

      try {
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
          const payload = {
            id: user.id,
            name: user.name,
            role: user.role
          };

          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({ success: true, token: "Bearer " + token });
            }
          );
        } else {
          return res.status(400).json({ error: "Password incorrect" });
        }
      } catch (e) {
        console.log(e);
      }
    } catch (e) {
      console.log(e);
    }
  }

  static async current(req, res, next) {
    res.json(req.user);
  }
}

module.exports = UserController;
