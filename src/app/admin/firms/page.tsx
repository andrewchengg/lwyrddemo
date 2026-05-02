import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { lawFirms, getSpecialtiesForFirm } from "@/lib/seed-data";
import { Plus, Pencil } from "lucide-react";

export default function AdminFirmsPage() {
  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold">Law Firms</h1>
          <p className="text-muted-foreground text-sm">
            {lawFirms.length} firms in the network
          </p>
        </div>
        <Link href="/admin/firms/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Firm
          </Button>
        </Link>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Specialties</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lawFirms.map((firm) => {
              const specs = getSpecialtiesForFirm(firm);
              return (
                <TableRow key={firm.id}>
                  <TableCell>
                    <div>
                      <span className="font-medium">{firm.name}</span>
                      {firm.featured && (
                        <Badge variant="outline" className="ml-2 text-xs">
                          Featured
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">
                    {firm.city}, {firm.state}
                  </TableCell>
                  <TableCell className="text-sm capitalize">
                    {firm.firmSize}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {specs.slice(0, 2).map((s) => (
                        <Badge key={s.id} variant="outline" className="text-xs">
                          {s.name}
                        </Badge>
                      ))}
                      {specs.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{specs.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/admin/firms/${firm.id}/edit`}>
                      <Button variant="ghost" size="sm">
                        <Pencil className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
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
