import { NextRequest, NextResponse } from "next/server";
import { issueSchema } from "../route";
import prisma from "@/prisma/client";

export async function PATCH(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
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
		const issue = await prisma.issue.findUnique({
			where: {
				id: Number(params.id),
			},
		});
		if (!issue) {
			return NextResponse.json(
				{ message: "Issue not found" },
				{
					status: 404,
					headers: { "Content-Type": "application/json" },
				}
			);
		}
		const updatedIssue = await prisma.issue.update({
			where: {
				id: Number(params.id),
			},
			data: {
				title: body.title,
				description: body.description,
			},
		});
		return NextResponse.json(updatedIssue, {
			status: 200,
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
