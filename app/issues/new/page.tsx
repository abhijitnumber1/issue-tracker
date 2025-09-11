import { Button, TextArea, TextField } from "@radix-ui/themes";
import React from "react";

const NewIssue = () => {
	return (
		<div className="max-w-lg p-4 space-y-3">
			<TextField.Root placeholder="Search the docs…"></TextField.Root>

			<TextArea placeholder="Reply to comment…" />
			<Button>Create New Issue</Button>
		</div>
	);
};

export default NewIssue;
