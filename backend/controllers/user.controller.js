import User from "../model/user.model.js";
import bcrypt from "bcrypt";
import "dotenv/config";
import jwt from "jsonwebtoken";

export default class UserController {
  getRegister = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      if (!(password.length >= 6 && password.length < 13)) {
        return res.status(400).json({
          error: "Password length should be between 6 and 12 characters.",
        });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, password: hashedPassword });

      // code for token

      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        { expiresIn: "3h" }
      );
      user.token = token;
      await user.save();

      res
        .status(201)
        .json({ message: "Registration Successful!", user, token });
    } catch (error) {
      console.error("Registration Failed:", error);
      res.status(500).json({ error: "Registration Failed" });
    }
  };

  getLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not Found" });
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (isValidPassword) {
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          { expiresIn: "3h" }
        );
        user.token = token;
        await user.save();

        res.status(200).json({ message: "Login Successfull", token });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    } catch (error) {
      res.status(500).json({ error: "Login Failed" });
    }
  };
}
