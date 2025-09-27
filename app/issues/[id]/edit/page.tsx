import React from "react";
import IssueForm from "../../_components/IssueForm";
import prisma from "@/prisma/client";
import { notFound, redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
interface Props {
	params: { id: string };
}
const EditIssue = async ({ params }: Props) => {
	const session = await getServerSession(authOptions);
	if (!session) {
		redirect("/api/auth/signin");
	}
	const { id } = await params;
	const issue = await prisma.issue.findUnique({
		where: {
			id: parseInt(id), //params.id
		},
	});
	if (!issue) {
		notFound();
	}
	return <IssueForm issue={issue} />;
};

export default EditIssue;
