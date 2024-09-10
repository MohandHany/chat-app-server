import jwt from "jsonwebtoken";

/**
 * Generates a JWT token for the given user ID, with an expiration time of 30 days.
 * This token can be used to authenticate the user in the chat application.
 * @param id - The user ID to generate the token for.
 * @returns The generated JWT token.
 */
export const generateToken = (id: string): string => {
  // Use the JWT_SECRET environment variable to sign the token
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    // Set the expiration time to 30 days
    expiresIn: "30d",
  });
};
