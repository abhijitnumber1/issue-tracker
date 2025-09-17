import prisma from "@/prisma/client";
import { Button, Table } from "@radix-ui/themes";
import { Record } from "@prisma/client/runtime/library";
import StatusBadge from "../components/StatusBadge";
import Link from "next/link";
export type color = "orange" | "yellow" | "green";
const IssuesPage = async () => {
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

export default IssuesPage;
