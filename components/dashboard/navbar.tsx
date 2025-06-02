import React from "react";
import { SidebarTrigger } from "../ui/sidebar";

// const navItems = [
//     { name: "Home", href: "/dashboard" },
//     { name: "Profile", href: "/dashboard/profile" },
//     { name: "Settings", href: "/dashboard/settings" },
//     { name: "Logout", href: "/logout" },
// ];

const Navbar: React.FC = () => (
    <nav className="w-full py-2 bg-sidebar flex items-center justify-between px-5 border-b md:rounded-t-lg border">
        <div className="text-xl font-bold">
            <SidebarTrigger/>
        </div>
        {/* <ul className="flex space-x-6">
            {navItems.map((item) => (
                <li key={item.name}>
                    <Link href={item.href} className="transition">
                        {item.name}
                    </Link>
                </li>
            ))}
        </ul> */}
    </nav>
);

export default Navbar;