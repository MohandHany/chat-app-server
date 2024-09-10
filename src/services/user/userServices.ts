import { Request, Response } from "express";
import User from "../../models/userModel";
import { AuthUserDto } from "../../types";
import { generateToken } from "../../constants/generateToken";
import bcrypt from "bcrypt";

/**
 * Handles user sign up
 * @param req - Request object
 * @param res - Response object
 * @returns - 201 response with newly created user, a success message, and a JWT token
 */
export const signUp = async (req: Request, res: Response) => {
  const { username, email, password, profileUrl } = req.body as AuthUserDto;

  // Check if all fields are required
  if (!username || !email || !password) {
    res.status(400).json({ message: "All fields are required" });
  }

  // Check if a user with the same username already exists
  const findUserByUsername = await User.findOne({ username });

  if (findUserByUsername) {
    return res.status(400).json({ message: "Username already exists" });
  }

  // Check if a user with the same email already exists
  const findUserByEmail = await User.findOne({ email });

  if (findUserByEmail) {
    return res.status(400).json({ message: "Email already exists" });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save the new user to the database
  const createdUser = await User.create({
    username,
    email,
    password: hashedPassword,
    userPic: profileUrl,
  });

  // Return a successful response with the newly created user, a success message, and a JWT token
  return res.status(201).json({
    newUser: createdUser,
    message: "User created",
    token: generateToken(createdUser._id as unknown as string),
  });
};

/**
 * Handles user sign in
 * @param req - Request object
 * @param res - Response object
 * @returns - 200 response with the user object, a success message, and a JWT token
 */
export const signIn = async (req: Request, res: Response) => {
  const { email, password, username } = req.body as AuthUserDto;

  // Check if all fields are required
  if ((!username && !email) || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // If the user is signing in with a username
  if (username) {
    // Check if a user with the same username already exists
    const findUserByUsername = await User.findOne({ username });

    if (!findUserByUsername) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check if the password matches the one stored in the database
    const passwordMatch = await bcrypt.compare(
      password,
      findUserByUsername.password
    );

    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Return a successful response with the user object, a success message, and a JWT token
    return res.status(200).json({
      user: findUserByUsername,
      message: "Login successful",
      token: generateToken(findUserByUsername._id as unknown as string),
    });
  }

  // If the user is signing in with an email
  // Check if a user with the same email already exists
  const findUserByEmail = await User.findOne({ email });

  if (!findUserByEmail) {
    return res.status(400).json({ message: "User not found" });
  }

  // Check if the password matches the one stored in the database
  const passwordMatch = await bcrypt.compare(
    password,
    findUserByEmail.password
  );

  if (!passwordMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // Return a successful response with the user object, a success message, and a JWT token
  return res.status(200).json({
    user: findUserByEmail,
    message: "Login successful",
    token: generateToken(findUserByEmail._id as unknown as string),
  });
};
