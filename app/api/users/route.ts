import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import prisma from "@/prisma/client";

export async function GET() {
	try {
		const session = getServerSession(authOptions);
		if (!session) {
			redirect("/api/auth/signin");
		}
		const alluser = await prisma.user.findMany();
		if (alluser) {
			return NextResponse.json(alluser, {
				status: 200,
				headers: { "Content-Type": "application/json" },
			});
		} else {
			return NextResponse.json([], {
				status: 200,
				headers: { "Content-Type": "application/json" },
			});
		}
	} catch (error) {
		return NextResponse.json(
			{ message: "Something went wrong" },
			{
				status: 500,
				headers: { "Content-Type": "application/json" },
			}
		);
	}
}
