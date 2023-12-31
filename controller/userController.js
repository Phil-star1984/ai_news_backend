/* import Mongoose Schema User, and evtl. Cloudinary config */
import User from "../models/userSchema.js";

const userData = { message: "Hello from user Route!", user: "Phil Splash" };

export const getAllUsers = async (req, res, next) => {
  try {
    const result = await User.find();
    if (!result) {
      throw new Error("There is no user in database");
    }

    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getOneUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await User.findById(id);
    if (!result) {
      throw new Error(`There is no user with id: ${id}`);
    }

    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const createNewUser = async (req, res, next) => {
  // get user data from body
  // prüfen ob der User schon existiert
  // wenn ja, Fehlermeldung, wenn nein ...
  // neuen user mit Mongoose Schema anlegen
  // in Mongo Database speichern
  // Erfolgs- oder Fehlermeldung zurückgeben

  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res.status(400).send("User already exists. Please sign in.");
    }

    const newUser = await User.create({
      name: name,
      email: email,
      password: password,
    });

    res.status(201).send(newUser);
    console.log(newUser);
  } catch (err) {
    next(err);
  }
};
