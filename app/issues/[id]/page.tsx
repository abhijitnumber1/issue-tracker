import StatusBadge from "@/app/components/StatusBadge";
import prisma from "@/prisma/client";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";
import ReactMarkdown from "react-markdown";
import { Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";

const IndividualIssues = async ({ params }: { params: { id: string } }) => {
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
		<Grid columns={{ initial: "1", md: "2" }} gap="5">
			<Box>
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
				<Button>
					<Pencil2Icon />
					<Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
				</Button>
			</Box>
		</Grid>
	);
};

export default IndividualIssues;
