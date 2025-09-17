import StatusBadge from "@/app/components/StatusBadge";
import prisma from "@/prisma/client";
import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";
import ReactMarkdown from "react-markdown";

const IndividualIssues = async ({ params }: { params: { id: string } }) => {
	const issue = await prisma.issue.findUnique({
		where: {
			id: parseInt(params.id),
		},
	});
	if (!issue) {
		notFound(); // 👈 Redirects to the 404 page
	}
	return (
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
	);
};

export default IndividualIssues;
