import { Badge } from "@radix-ui/themes";
import React from "react";
import { color } from "../issues/page";
import { Status } from "../generated/prisma";

const StatusBadge = ({ status }: { status: Status }) => {
	const statusBadgeColor: Record<Status, color> = {
		OPEN: "orange",
		IN_PROGRESS: "yellow",
		CLOSED: "green",
	};
	return (
		<Badge color={statusBadgeColor[status]} size="1">
			{status}
		</Badge>
	);
};

export default StatusBadge;
