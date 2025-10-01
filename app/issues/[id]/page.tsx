import StatusBadge from "@/app/components/StatusBadge";
import prisma from "@/prisma/client";
import {
	Box,
	Button,
	Card,
	Flex,
	Grid,
	Heading,
	Select,
	Text,
} from "@radix-ui/themes";
import { notFound, redirect } from "next/navigation";
import React from "react";
import ReactMarkdown from "react-markdown";
import { Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import AlertDialogDemo from "./AlertComponent";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import AssigneeComponent from "./AssigneeComponent";

const IndividualIssues = async ({ params }: { params: { id: string } }) => {
	const session = await getServerSession(authOptions);
	if (!session) {
		redirect("/api/auth/signin");
	}
	// Await the params object before using its properties
	const { id } = await params;
	const issue = await prisma.issue.findUnique({
		where: {
			id: parseInt(id),
		},
	});
	if (!issue) {
		notFound(); // 👈 Redirects to the 404 page
	}
	return (
		<Grid columns={{ initial: "1", md: "5" }} gap="5">
			<Box className="lg:col-span-4">
				<Heading>{issue?.title}</Heading>
				<Flex className="space-x-3" my="2">
					<StatusBadge status={issue.status}></StatusBadge>
					<Text>{issue.createdAt.toDateString()}</Text>
				</Flex>
				<Card className="prose">
					<ReactMarkdown>{issue.description}</ReactMarkdown>
				</Card>
			</Box>
			<Box>
				<Flex direction={"column"} gap="3">
					<AssigneeComponent
						issueId={issue.id}
						assignedTo={issue.assignedToUserId}
					/>

					<Button>
						<Pencil2Icon />
						<Link href={`/issues/${issue.id}/edit`}>
							Edit Issue
						</Link>
					</Button>
					<AlertDialogDemo delete_id={issue.id} />
				</Flex>
			</Box>
		</Grid>
	);
};

export default IndividualIssues;
