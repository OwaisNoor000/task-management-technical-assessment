import jwt from "jsonwebtoken";

const JWT_SECRET = "c2VjdXJlX3JlYWxseV9yYW5kb21fMTIzNDU2Nzg5MGFiY2Rl";

export function generateJwt(userId: number, email: string) {
  return jwt.sign(
    { userId, email },
    JWT_SECRET,
    { expiresIn: "1h" } // token valid for 1 hour
  );
}

export function verifyJwt(token: string) {
  return jwt.verify(token, JWT_SECRET);
}
