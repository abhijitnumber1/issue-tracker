import prisma from "@/prisma/client";
import { Button, Flex, Table } from "@radix-ui/themes";
import StatusBadge from "../components/StatusBadge";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import IssueFilter from "./_components/IssueFilter";
import { Status } from "../generated/prisma";
export type color = "orange" | "yellow" | "green";
interface Props {
	searchParams: { status: Status; orderBy: string };
}
const validStatus = Object.values(Status) as string[];

export const generateUrlParam = (status: string, orderBy: string) => {
	const param = new URLSearchParams();
	if (status) {
		param.set("status", status);
	}
	if (orderBy) {
		param.set("orderBy", orderBy);
	}
	return param ? "?" + param.toString() : "";
};

const IssuesPage = async ({ searchParams }: Props) => {
	const session = await getServerSession(authOptions);
	if (!session) {
		redirect("/api/auth/signin");
	}
	const resolvedSearchParams = await searchParams;
	const status = resolvedSearchParams.status;
	const orderBy = resolvedSearchParams.orderBy;
	let where =
		status && validStatus.includes(status)
			? { status: status as Status }
			: {};
	const orderOptions = orderBy
		? { [orderBy]: "asc" } // e.g., { title: "asc" }
		: undefined;
	const allIssues = await prisma.issue.findMany({
		where,
		orderBy: orderOptions,
	});

	return (
		<div>
			<Flex justify="between">
				<Link href={`/issues/new`}>
					<Button>New Issue</Button>
				</Link>
				<IssueFilter />
			</Flex>
			<Table.Root variant="surface" className="mt-4">
				<Table.Header>
					<Table.Row>
						<Table.ColumnHeaderCell>
							<Link
								href={
									"/issues" +
									generateUrlParam(status, "title")
								}
							>
								Issue
							</Link>
						</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell className="max-md:hidden">
							<Link
								href={
									"/issues" +
									generateUrlParam(status, "status")
								}
							>
								Status
							</Link>
						</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell className="max-md:hidden">
							<Link
								href={
									"/issues" +
									generateUrlParam(status, "createdAt")
								}
							>
								Created At
							</Link>
						</Table.ColumnHeaderCell>
					</Table.Row>
				</Table.Header>

				<Table.Body>
					{allIssues.map((issue) => (
						<Table.Row key={issue.id}>
							<Table.RowHeaderCell>
								<Link href={`/issues/${issue.id}`}>
									{issue.title}
									<StatusBadge
										status={issue.status}
									></StatusBadge>
								</Link>
							</Table.RowHeaderCell>
							<Table.Cell className="max-md:hidden">
								{issue.status}
							</Table.Cell>
							<Table.Cell className="max-md:hidden">
								{issue.createdAt.toDateString()}
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table.Root>
		</div>
	);
};

export const dynamic = "force-dynamic";

export default IssuesPage;
