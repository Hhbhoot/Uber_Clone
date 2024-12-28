import CaptainModel from "../Model/captain.model.js";

export const RegisterCaptainService = async ({
  fullName,
  email,
  password,
  vehicle,
  gender,
}) => {
  try {
    if (!fullName || !email || !password || !vehicle) {
      throw new Error("Please fill in all fields");
    }

    const captain = await CaptainModel.create({
      fullName: {
        firstName: fullName?.firstName,
        lastName: fullName?.lastName,
      },
      email,
      password,
      vehicle: {
        plate: vehicle?.plate,
        capacity: vehicle?.capacity,
        type: vehicle?.type,
        color: vehicle?.color,
      },
      gender,
    });

    return captain;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
