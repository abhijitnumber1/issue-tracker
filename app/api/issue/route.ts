import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";
const issueSchema = z.object({
	title: z.string().min(5).max(255),
	description: z.string().min(10),
});
export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const valid = issueSchema.safeParse(body);
		if (!valid.success) {
			return NextResponse.json(
				{ errors: valid.error.issues }, // 👈 structured JSON
				{
					status: 400,
					headers: { "Content-Type": "application/json" },
				}
			);
		}
		const newIssue = await prisma.issue.create({
			data: {
				title: body.title,
				description: body.description,
			},
		});
		return NextResponse.json(newIssue, {
			status: 201,
			headers: { "Content-Type": "application/json" },
		});
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
