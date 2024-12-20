import User from "../Model/user.model";

export const RegisterUser = async (req, res) => {
  try {
    const { fullName, email, password, gender } = req.body;
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
