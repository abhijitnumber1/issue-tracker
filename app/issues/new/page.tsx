import React from "react";
import IssueForm from "../_components/IssueForm";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const NewIssue = async () => {
	const session = await getServerSession(authOptions);
	if (!session) {
		redirect("/api/auth/signin");
	}
	return <IssueForm />;
};

export default NewIssue;
