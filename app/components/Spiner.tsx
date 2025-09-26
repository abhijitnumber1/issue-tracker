import { BookmarkIcon } from "@radix-ui/react-icons";
import { Spinner } from "@radix-ui/themes";
import React from "react";

const Spiner = () => {
	return (
		<Spinner loading>
			<BookmarkIcon />
		</Spinner>
	);
};

export default Spiner;
