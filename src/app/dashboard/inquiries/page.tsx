import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { sampleInquiries, specialties, lawFirms } from "@/lib/seed-data";

export default function UserInquiriesPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="font-heading text-2xl font-bold mb-2">My Inquiries</h1>
      <p className="text-muted-foreground mb-8">
        Track the status of all your legal inquiries.
      </p>

      <div className="space-y-4">
        {sampleInquiries.map((inq) => {
          const specialty = specialties.find((s) => s.id === inq.specialtyId);
          const firm = inq.firmId
            ? lawFirms.find((f) => f.id === inq.firmId)
            : null;
          return (
            <Card key={inq.id}>
              <CardContent className="pt-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium">{inq.message}</p>
                    <div className="flex flex-wrap gap-2 mt-2 text-xs text-muted-foreground">
                      {specialty && <span>{specialty.name}</span>}
                      {firm && <span>&middot; {firm.name}</span>}
                      <span>
                        &middot; {new Date(inq.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <Badge>{inq.status}</Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
