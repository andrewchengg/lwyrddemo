import Link from "next/link";
import {
  LayoutDashboard,
  Building2,
  MessageSquare,
  Users,
  ArrowLeft,
} from "lucide-react";

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
    <div className="flex h-full min-h-screen">
      <aside className="hidden md:flex md:flex-col w-56 bg-sidebar text-sidebar-foreground p-6 shrink-0">
        <Link href="/" className="flex items-center gap-2 mb-8">
          <div className="border border-sidebar-foreground/30 px-2 py-1 font-heading text-sm font-bold tracking-wider">
            LWYRD
          </div>
        </Link>
        <p className="text-[10px] font-semibold uppercase tracking-widest mb-4 text-sidebar-foreground/40">
          Admin
        </p>
        <nav className="space-y-1 flex-1">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-sidebar-accent transition-colors text-sidebar-foreground/70 hover:text-sidebar-foreground"
            >
              <link.icon className="w-4 h-4" />
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-2 text-xs text-sidebar-foreground/40 hover:text-sidebar-foreground transition-colors"
        >
          <ArrowLeft className="w-3 h-3" />
          Back to site
        </Link>
      </aside>
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">{children}</main>
    </div>
  );
}
