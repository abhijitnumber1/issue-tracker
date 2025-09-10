import Link from "next/link";
import React from "react";
import { GiBugNet } from "react-icons/gi";
import { GiLongAntennaeBug } from "react-icons/gi";
import ActiveLink from "./components/ActiveLink";
const NavBar = () => {
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
			</ul>
		</nav>
	);
};

export default NavBar;
