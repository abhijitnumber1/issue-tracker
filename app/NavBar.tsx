"use client";
import Link from "next/link";
import React from "react";
import { GiBugNet } from "react-icons/gi";
import { GiLongAntennaeBug } from "react-icons/gi";
import ActiveLink from "./components/ActiveLink";
import { useSession } from "next-auth/react";
import { Box } from "@radix-ui/themes";
const NavBar = () => {
	const { data: session, status } = useSession();
	const links = [
		{
			label: "Dashboard",
			href: "/",
		},
		{
			label: "Issues",
			href: "/issues",
		},
	];
	return (
		<nav className="flex justify-between border-b h-14">
			<ul className="flex space-x-6 items-center">
				<li className="flex items-baseline">
					<GiBugNet size={40} />
					<GiLongAntennaeBug />
				</li>
				{links.map((link) => (
					<li key={link.href}>
						<ActiveLink href={link.href}>{link.label}</ActiveLink>
					</li>
				))}
				{status === "authenticated" ? (
					<ActiveLink href="/api/auth/signout">Logout</ActiveLink>
				) : (
					<ActiveLink href="/api/auth/signin">Login</ActiveLink>
				)}
			</ul>
			<Box></Box>
		</nav>
	);
};

export default NavBar;
