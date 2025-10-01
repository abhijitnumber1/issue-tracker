"use client";
import { User } from "@/app/generated/prisma";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Skeleton from "react-loading-skeleton";
import toast, { Toaster } from "react-hot-toast";
interface Props {
	issueId: number;
	assignedTo: string | null;
}
const AssigneeComponent = ({ issueId, assignedTo }: Props) => {
	const {
		data: users,
		isPending,
		error,
	} = useQuery<User[]>({
		queryKey: ["users"],
		queryFn: () => fetch("/api/users").then((r) => r.json()),
		staleTime: 60,
	});
	const [selectedValue, setSelectedValue] = React.useState<string | null>(
		assignedTo
	);
	if (isPending) {
		return <Skeleton />;
	}
	return (
		<>
			<Toaster />
			<Select.Root
				value={selectedValue || "unassigned"}
				onValueChange={async (value) => {
					try {
						setSelectedValue(value === "unassigned" ? null : value);
						toast.success("Successfully Assigned to user!");
						await axios.patch("/api/issue/" + issueId, {
							assignedToUserId:
								value === "unassigned" ? null : value,
						});
					} catch (error) {
						toast.error("Unable to Assign to user");
					}
				}}
			>
				<Select.Trigger />
				<Select.Content>
					<Select.Group>
						<Select.Label>Select an Assignee</Select.Label>
						<Select.Item value="unassigned">Unassigned</Select.Item>
						{users?.map((user) => {
							return (
								<Select.Item value={user.id} key={user.id}>
									{user.name}
								</Select.Item>
							);
						})}
					</Select.Group>
				</Select.Content>
			</Select.Root>
		</>
	);
};

export default AssigneeComponent;
