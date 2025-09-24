import { z } from "zod";

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
		.max(255, { message: "Title must be at most 255 characters" }),
	description: z
		.string({ message: "Description is required" })
		.min(10, { message: "Description must be at least 10 characters" }),
	id: z.number({ message: "ID is required" }),
});
