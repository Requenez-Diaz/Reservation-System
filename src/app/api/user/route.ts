import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import * as z from "zod";

// Define a schema for input validation
const userShema = z
  .object({
    username: z.string().min(1, 'Username is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have than 8 characters'),
  })
  
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, username, password } = userShema.parse(body);

        // Check if email already exists
        const existingUserByEmail = await db.users.findUnique({
            where: { email: email }
        });
        if (existingUserByEmail) {
            return NextResponse.json({ user: null, message: "Email already exists" }, { status: 400 })
        }

        // Check if username already exists
        const existingUserByUsername = await db.users.findUnique({
            where: { username: username }
        });
        if (existingUserByUsername) {
            return NextResponse.json({ user: null, message: "Username already exists" }, { status: 400 })
        }

        const hashedPassword = await hash(password, 10)
        const newUser = await db.users.create({
            data: {
                username,
                email,
                password: hashedPassword,
                role: "USER"
            }
        });
        const { password: newUserPassword, ...rest } = newUser;



        return NextResponse.json({ user: rest, message: "User created successfully" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }

}