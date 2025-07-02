import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET||"";


export function generateJwt(userId: number, email: string) {
  return jwt.sign(
    { userId, email },
    JWT_SECRET,
    { expiresIn: "3h" } // token valid for 1 hour
  );
}

export function verifyJwt(token: string) {
  return jwt.verify(token, JWT_SECRET);
}
