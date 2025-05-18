"use client";
import Link from "next/link";
import { useState } from "react";
import { FaHome, FaProjectDiagram, FaVideo, FaCreditCard, FaRegLightbulb, FaBars, FaTimes } from "react-icons/fa";

const navItems = [
	{ href: "/", label: "Home", icon: <FaHome /> },
	{ href: "/projects", label: "Projects", icon: <FaProjectDiagram /> },
	{ href: "/videos", label: "Videos", icon: <FaVideo /> },
	{ href: "/payment", label: "Payment", icon: <FaCreditCard /> },
	{ href: "/thoughts", label: "Thoughts", icon: <FaRegLightbulb /> },
];

export default function Navbar() {
	const [open, setOpen] = useState(false);
	return (
		<>
			{/* Desktop Navbar */}
			<nav className="hidden md:flex fixed top-6 left-6 z-50 flex-col gap-4 bg-[#18181b]/80 rounded-xl p-4 shadow-lg backdrop-blur-md">
				{navItems.map((item) => (
					<a
						key={item.href}
						href={item.href}
						className="flex items-center gap-3 text-white hover:text-[#00ff66] font-semibold dm-sans text-lg transition"
					>
						<span className="text-2xl">{item.icon}</span>
						<span>{item.label}</span>
					</a>
				))}
			</nav>
			{/* Mobile Hamburger */}
			<button
				className="md:hidden fixed top-6 left-6 z-50 bg-[#18181b] text-white rounded-full p-3 shadow-lg"
				onClick={() => setOpen(true)}
				aria-label="Open menu"
			>
				<FaBars className="text-2xl" />
			</button>
			{/* Mobile Menu Modal */}
			{open && (
				<div className="fixed inset-0 z-[100] bg-black/80 flex flex-col">
					<button
						className="absolute top-6 right-6 bg-[#23232b] text-white rounded-full p-3 shadow-lg"
						onClick={() => setOpen(false)}
						aria-label="Close menu"
					>
						<FaTimes className="text-2xl" />
					</button>
					<nav className="flex flex-col items-center justify-center flex-1 gap-8">
						{navItems.map((item) => (
							<a
								key={item.href}
								href={item.href}
								className="flex items-center gap-3 text-white hover:text-[#00ff66] font-semibold dm-sans text-2xl transition"
								onClick={() => setOpen(false)}
							>
								<span className="text-3xl">{item.icon}</span>
								<span>{item.label}</span>
							</a>
						))}
					</nav>
				</div>
			)}
		</>
	);
}
