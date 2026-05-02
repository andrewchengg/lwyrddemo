import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const sampleUsers = [
  {
    id: "u1",
    name: "Rahul Kochar",
    email: "rahul@lwyrd.co",
    role: "admin",
    joinedAt: "2026-01-15",
  },
  {
    id: "u2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "user",
    joinedAt: "2026-04-28",
  },
  {
    id: "u3",
    name: "Mike Torres",
    email: "mike@example.com",
    role: "user",
    joinedAt: "2026-04-27",
  },
  {
    id: "u4",
    name: "Priya Patel",
    email: "priya@example.com",
    role: "user",
    joinedAt: "2026-04-25",
  },
  {
    id: "u5",
    name: "James Lee",
    email: "james@example.com",
    role: "user",
    joinedAt: "2026-05-01",
  },
];

export default function AdminUsersPage() {
  return (
    <div className="max-w-5xl">
      <h1 className="font-heading text-2xl font-bold mb-2">Users</h1>
      <p className="text-muted-foreground text-sm mb-6">
        {sampleUsers.length} registered users
      </p>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Joined</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell className="text-sm">{user.email}</TableCell>
                <TableCell>
                  <Badge
                    variant={user.role === "admin" ? "default" : "outline"}
                  >
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm">
                  {new Date(user.joinedAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
