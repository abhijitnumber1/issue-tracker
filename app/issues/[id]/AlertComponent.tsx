"use client";
import { AlertDialog } from "radix-ui";
import "./AlertComponent.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
interface Props {
	delete_id: number;
}

const AlertDialogDemo = ({ delete_id }: Props) => {
	const router = useRouter();
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const handleDelete = async () => {
		try {
			await axios.delete("/api/issue/" + delete_id);
			router.push("/issues");
			router.refresh();
		} catch (error) {
			console.error(error);
			setErrorMessage("Failed to delete account. Please try again.");
		}
	};
	return (
		<AlertDialog.Root>
			<AlertDialog.Trigger asChild>
				<button className="Button red" color="red">
					Delete account
				</button>
			</AlertDialog.Trigger>
			<AlertDialog.Portal>
				<AlertDialog.Overlay className="AlertDialogOverlay" />
				<AlertDialog.Content className="AlertDialogContent">
					<AlertDialog.Title className="AlertDialogTitle">
						Are you absolutely sure?
					</AlertDialog.Title>
					<AlertDialog.Description className="AlertDialogDescription">
						This action cannot be undone. This will permanently
						delete your account and remove your data from our
						servers.
					</AlertDialog.Description>
					<div
						style={{
							display: "flex",
							gap: 25,
							justifyContent: "flex-end",
						}}
					>
						<AlertDialog.Cancel asChild>
							<button className="Button mauve">Cancel</button>
						</AlertDialog.Cancel>
						<AlertDialog.Action asChild>
							<button
								className="Button red"
								onClick={handleDelete}
							>
								Yes, delete account
							</button>
						</AlertDialog.Action>

						{errorMessage && (
							<p style={{ color: "red", marginTop: "10px" }}>
								{errorMessage}
							</p>
						)}
					</div>
				</AlertDialog.Content>
			</AlertDialog.Portal>
		</AlertDialog.Root>
	);
};

export default AlertDialogDemo;
