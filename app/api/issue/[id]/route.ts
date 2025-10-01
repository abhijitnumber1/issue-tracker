import { NextRequest, NextResponse } from "next/server";
import { issueSchema, editIssueSchema } from "../issueSchema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function PATCH(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const session = await getServerSession(authOptions);
		if (!session) {
			redirect("/api/auth/signin");
		}
		const body = await request.json();
		const valid = editIssueSchema.safeParse(body);
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
				id: parseInt(params.id),
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
				id: parseInt(params.id),
			},
			data: {
				title: body.title,
				description: body.description,
				assignedToUserId: body.assignedToUserId,
			},
		});
		return NextResponse.json(updatedIssue, {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ message: "Something went wrong" },
			{
				status: 500,
				headers: { "Content-Type": "application/json" },
			}
		);
	}
}

export async function DELETE(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const session = await getServerSession(authOptions);
		if (!session) {
			redirect("/api/auth/signin");
		}
		const issue = await prisma.issue.findUnique({
			where: {
				id: parseInt(params.id),
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
		await prisma.issue.delete({
			where: {
				id: parseInt(params.id),
			},
		});
		return NextResponse.json(
			{ message: "Issue deleted successfully" },
			{
				status: 200,
				headers: { "Content-Type": "application/json" },
			}
		);
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
