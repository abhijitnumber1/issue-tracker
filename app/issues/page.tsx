import prisma from "@/prisma/client";
import { Button, Table } from "@radix-ui/themes";
import { Record } from "@prisma/client/runtime/library";
import StatusBadge from "../components/StatusBadge";
import { Status } from "../generated/prisma";
export type color = "orange" | "yellow" | "green";
const IssuesPage = async () => {
	const statusBadge: Record<Status, color> = {
		OPEN: "orange",
		IN_PROGRESS: "yellow",
		CLOSED: "green",
	};

	const allIssues = await prisma.issue.findMany();
	return (
		<div className="m-4">
			<Button>New Issue</Button>
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
								{issue.title}
								<StatusBadge color={statusBadge[issue.status]}>
									{issue.status}
								</StatusBadge>
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
