import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { connectDB } from "./mongodb";
import Admin, { IAdmin } from "./models/Admin";

const JWT_SECRET = new TextEncoder().encode(
  process.env.AUTH_SECRET || "tronx-ai-super-secret-jwt-key-2026-production"
);

const TOKEN_NAME = "tronx_admin_token";

export interface JWTPayload {
  id: string;
  email: string;
  name: string;
  role: string;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function signAdminToken(payload: JWTPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(JWT_SECRET);
}

export async function verifyAdminToken(
  token: string
): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as JWTPayload;
  } catch {
    return null;
  }
}

export async function getAuthAdmin(): Promise<JWTPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(TOKEN_NAME)?.value;
    if (!token) return null;
    return await verifyAdminToken(token);
  } catch {
    return null;
  }
}

export async function ensureDefaultAdmin(): Promise<IAdmin | null> {
  try {
    await connectDB();
    const count = await Admin.countDocuments();
    if (count === 0) {
      const defaultPassword = process.env.ADMIN_DEFAULT_PASSWORD || "admin123";
      const hashedPassword = await hashPassword(defaultPassword);
      const newAdmin = await Admin.create({
        name: "TRONX Admin",
        email: "admin@tronx.ai",
        passwordHash: hashedPassword,
        role: "superadmin",
      });
      console.log("🔑 Default admin initialized: admin@tronx.ai / admin123");
      return newAdmin;
    }
    return null;
  } catch (error) {
    console.error("Failed to ensure default admin:", error);
    return null;
  }
}
