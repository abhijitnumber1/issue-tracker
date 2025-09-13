import { Badge } from "@radix-ui/themes";
import React from "react";
import { color } from "../issues/page";

const StatusBadge = ({
	children,
	color,
}: {
	children: React.ReactNode;
	color: color;
}) => {
	return (
		<Badge color={color} size="1">
			{children}
		</Badge>
	);
};

export default StatusBadge;
