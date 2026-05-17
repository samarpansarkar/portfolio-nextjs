import crypto from "crypto";

const SECRET = process.env.JWT_SECRET || "retro-arcade-portfolio-admin-secret-key-987654321";

export function signToken(payload) {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const data = Buffer.from(JSON.stringify({ ...payload, exp: Date.now() + 24 * 60 * 60 * 1000 })).toString("base64url");
  const signature = crypto.createHmac("sha256", SECRET).update(`${header}.${data}`).digest("base64url");
  return `${header}.${data}.${signature}`;
}

export function verifyToken(token) {
  if (!token) return null;
  try {
    const [header, data, signature] = token.split(".");
    const expectedSig = crypto.createHmac("sha256", SECRET).update(`${header}.${data}`).digest("base64url");
    if (signature !== expectedSig) return null;
    const payload = JSON.parse(Buffer.from(data, "base64url").toString());
    if (payload.exp < Date.now()) return null; // Expired
    return payload;
  } catch (e) {
    return null;
  }
}

export function getAuthUser(req) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) return null;
  const token = authHeader.split(" ")[1];
  return verifyToken(token);
}
