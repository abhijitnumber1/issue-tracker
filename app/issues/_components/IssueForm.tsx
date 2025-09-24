"use client";

import { Button, TextField } from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";
import dynamic from "next/dynamic";
import axios from "axios";
import { z } from "zod";
import { issueSchema } from "@/app/api/issue/route";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

// Dynamically import the SimpleMDE component and disable server-side rendering
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
	ssr: false,
});
import "easymde/dist/easymde.min.css";
type IssueData = z.infer<typeof issueSchema>;
interface Props {
	issue?: IssueData;
}

const IssueForm = ({ issue }: Props) => {
	const {
		register,
		handleSubmit,
		control,
		watch,
		reset,
		formState: { errors },
	} = useForm<IssueData>({
		resolver: zodResolver(issueSchema),
	});
	const router = useRouter();
	return (
		<form
			className="max-w-lg p-4 space-y-3"
			onSubmit={handleSubmit(async (data) => {
				try {
					const response = await axios.post("/api/issue", data);
					reset();
					router.push(`/issues`);
				} catch (error) {
					console.log(error);
				}
			})}
		>
			<TextField.Root
				placeholder="Search the docs…"
				defaultValue={issue?.title}
				{...register("title")}
			></TextField.Root>
			{errors.title && (
				<p className="text-red-500">{errors.title.message}</p>
			)}
			<Controller
				control={control}
				name="description"
				defaultValue={issue?.description}
				render={({ field }) => (
					<SimpleMDE value={field.value} onChange={field.onChange} />
				)}
			/>
			{errors.description && (
				<p className="text-red-500">{errors.description.message}</p>
			)}
			<Button>Create New Issue</Button>
		</form>
	);
};

export default IssueForm;
