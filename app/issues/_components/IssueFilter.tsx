"use client";
import { Status } from "@/app/generated/prisma";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { generateUrlParam } from "../page";

const IssueFilter = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const currentStatus = searchParams.get("status") || "ALL";
	const issuesStatus: { label: string; value: Status | "ALL" }[] = [
		{
			label: "All",
			value: "ALL",
		},
		{
			label: "Open",
			value: "OPEN",
		},
		{
			label: "In Progress",
			value: "IN_PROGRESS",
		},
		{
			label: "Closed",
			value: "CLOSED",
		},
	];

	return (
		<Select.Root
			defaultValue={currentStatus}
			onValueChange={(value) => {
				const urlParam = generateUrlParam(
					value,
					searchParams.get("orderBy") || ""
				);

				router.push(`/issues${urlParam}`);
			}}
		>
			<Select.Trigger />
			<Select.Content>
				<Select.Group>
					<Select.Label>Filter by Issue Status</Select.Label>
					{issuesStatus.map((status) => (
						<Select.Item key={status.value} value={status.value}>
							{status.label}
						</Select.Item>
					))}
				</Select.Group>
			</Select.Content>
		</Select.Root>
	);
};

export default IssueFilter;
