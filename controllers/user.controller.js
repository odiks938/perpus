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
    const { username, password } = req.body; 
     const login = await Users.findAll({ 
       where: { 
         username: username 
         } 
      });
      if (login.length === 0) return res.status(404).send("User"); 
       const user = login[0]; 
       // Verifikasi password 
        const isMatch = await bcrypt.compare(password, user.password); 
        
  } catch (error) {}
};

export default { register, login };
