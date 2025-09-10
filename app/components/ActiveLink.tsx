// components/ActiveLink.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ActiveLink({
	href,
	children,
}: {
	href: string;
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	const isActive = pathname === href;

	return (
		<Link
			href={href}
			className={
				isActive
					? "text-zinc-900"
					: "text-zinc-500 hover:text-zinc-800 transition-colors"
			}
		>
			{children}
		</Link>
	);
}
