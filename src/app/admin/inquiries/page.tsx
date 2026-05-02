import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { sampleInquiries, specialties, lawFirms } from "@/lib/seed-data";

export default function AdminInquiriesPage() {
  return (
    <div className="max-w-5xl">
      <h1 className="font-heading text-2xl font-bold mb-2">Inquiries</h1>
      <p className="text-muted-foreground text-sm mb-6">
        {sampleInquiries.length} total inquiries
      </p>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Specialty</TableHead>
              <TableHead>Firm</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleInquiries.map((inq) => {
              const specialty = specialties.find(
                (s) => s.id === inq.specialtyId,
              );
              const firm = inq.firmId
                ? lawFirms.find((f) => f.id === inq.firmId)
                : null;
              return (
                <TableRow key={inq.id}>
                  <TableCell className="font-medium">{inq.name}</TableCell>
                  <TableCell className="text-sm">{inq.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {specialty?.name}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">
                    {firm?.name || "Match requested"}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        inq.status === "new"
                          ? "bg-orange-100 text-orange-700"
                          : inq.status === "matched"
                            ? "bg-green-100 text-green-700"
                            : inq.status === "reviewed"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {inq.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm">
                    {new Date(inq.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
