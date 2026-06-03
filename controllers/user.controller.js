import { User } from "#models";
import bcrypt from "bcryptjs";

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username: username,
      password: hashedPassword,
    });
    res.json(user);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
  } catch (error) {}
};

export default { register, login };
