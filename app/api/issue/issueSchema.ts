import { z } from "zod";
import { Status } from "@/app/generated/prisma";
export const issueSchema = z.object({
	title: z
		.string({ message: "Title is required" })
		.min(5, { message: "Title must be at least 5 characters" })
		.max(255, { message: "Title must be at most 255 characters" }),
	description: z
		.string({ message: "Description is required" })
		.min(10, { message: "Description must be at least 10 characters" }),
});
export const editIssueSchema = z.object({
	title: z
		.string({ message: "Title is required" })
		.min(5, { message: "Title must be at least 5 characters" })
		.max(255, { message: "Title must be at most 255 characters" })
		.optional(),
	description: z
		.string({ message: "Description is required" })
		.min(10, { message: "Description must be at least 10 characters" })
		.optional(),
	id: z.number({ message: "ID is required" }).optional(),
	assignedToUserId: z
		.string({ message: "Please provide valie User Id" })
		.optional()
		.nullable(),
});
