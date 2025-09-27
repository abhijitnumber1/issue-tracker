"use client";
import Link from "next/link";
import React from "react";
import { GiBugNet } from "react-icons/gi";
import { GiLongAntennaeBug } from "react-icons/gi";
import ActiveLink from "./components/ActiveLink";
import { useSession } from "next-auth/react";
import { Avatar, Box, DropdownMenu } from "@radix-ui/themes";
import Image from "next/image";
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
		<nav className="flex justify-between border-b h-14 px-4">
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
			</ul>

			<div className="flex items-center">
				{status === "authenticated" ? (
					<DropdownMenu.Root>
						{/* Use asChild so Avatar acts as the trigger */}
						<DropdownMenu.Trigger>
							<button>
								<Avatar
									src={session.user?.image || ""}
									fallback={session.user?.name?.[0] || "?"}
									size="3"
									radius="full"
									className="cursor-pointer"
								/>
							</button>
						</DropdownMenu.Trigger>

						<DropdownMenu.Content className="bg-white shadow-md rounded-md p-2">
							<DropdownMenu.Label className="px-2 py-1 font-medium">
								{session.user?.name}
							</DropdownMenu.Label>
							<DropdownMenu.Item className="cursor-pointer px-2 py-1 hover:bg-gray-100 rounded">
								<ActiveLink href="/api/auth/signout">
									Logout
								</ActiveLink>
							</DropdownMenu.Item>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				) : (
					<ActiveLink href="/api/auth/signin">Login</ActiveLink>
				)}
			</div>
		</nav>
	);
};

export default NavBar;
