import prisma from "@/prisma/client";
import { Button, Table } from "@radix-ui/themes";
import { Record } from "@prisma/client/runtime/library";
import StatusBadge from "../components/StatusBadge";
import Link from "next/link";
import { getServerSession } from "next-auth";
export type color = "orange" | "yellow" | "green";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
const IssuesPage = async () => {
	const session = await getServerSession(authOptions);
	if (!session) {
		redirect("/api/auth/signin");
	}
	const allIssues = await prisma.issue.findMany();
	return (
		<div>
			<Link href={`/issues/new`}>
				<Button>New Issue</Button>
			</Link>
			<Table.Root variant="surface" className="mt-4">
				<Table.Header>
					<Table.Row>
						<Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell className="max-md:hidden">
							Description
						</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell className="max-md:hidden">
							Status
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
								{issue.description}
							</Table.Cell>
							<Table.Cell className="max-md:hidden">
								{issue.status}
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
