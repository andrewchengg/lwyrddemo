import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LayoutDashboard, MessageSquare, Settings } from "lucide-react";

const sidebarLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/inquiries", label: "My Inquiries", icon: MessageSquare },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="flex-1 flex">
        <aside className="hidden md:block w-56 border-r border-border p-6">
          <h2 className="font-heading text-sm font-semibold uppercase tracking-wider mb-4 text-muted-foreground">
            Dashboard
          </h2>
          <nav className="space-y-1">
            {sidebarLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
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
