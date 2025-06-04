"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { SidebarTrigger } from "../ui/sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ChevronRight } from "lucide-react";

function toTitleCase(str: string) {
    return str
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
}

const Navbar: React.FC = () => {
    const pathname = usePathname();
    const pathSegments = pathname.split("/").filter(Boolean);

    // Build breadcrumb items
    const breadcrumbs = [
        { label: "Home", href: "/" },
        ...pathSegments.map((segment, idx) => {
            const href = "/" + pathSegments.slice(0, idx + 1).join("/");
            return {
                label: toTitleCase(segment),
                href,
            };
        }),
    ];

    return (
        <nav className="w-full py-2 bg-sidebar flex items-center justify-between px-5 border-b md:rounded-t-lg border">
            <div className="flex items-center gap-4">
                <SidebarTrigger />
                <Breadcrumb className="flex items-center gap-2 text-sm">
                    {breadcrumbs.map((item, idx) => (
                        <React.Fragment key={item.href ?? item.label}>
                            <BreadcrumbItem>
                                {idx < breadcrumbs.length - 1 ? (
                                    <Link href={item.href!} passHref legacyBehavior>
                                        <BreadcrumbLink>
                                            {item.label}
                                        </BreadcrumbLink>
                                    </Link>
                                ) : (
                                    <span>{item.label}</span>
                                )}
                            </BreadcrumbItem>
                            {idx < breadcrumbs.length - 1 && <BreadcrumbSeparator className="list-none"> <ChevronRight /> </BreadcrumbSeparator>}
                        </React.Fragment>
                    ))}
                </Breadcrumb>
            </div>
        </nav>
    );
};

export default Navbar;