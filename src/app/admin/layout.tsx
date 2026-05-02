import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LayoutDashboard, Building2, MessageSquare, Users } from "lucide-react";

const sidebarLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/firms", label: "Law Firms", icon: Building2 },
  { href: "/admin/inquiries", label: "Inquiries", icon: MessageSquare },
  { href: "/admin/users", label: "Users", icon: Users },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="flex-1 flex">
        <aside className="hidden md:block w-56 bg-sidebar text-sidebar-foreground p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider mb-4 text-sidebar-foreground/60">
            Admin Panel
          </h2>
          <nav className="space-y-1">
            {sidebarLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-sidebar-accent transition-colors text-sidebar-foreground/80 hover:text-sidebar-foreground"
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="flex-1 p-6 md:p-10">{children}</main>
      </div>
      <Footer />
    </>
  );
}
