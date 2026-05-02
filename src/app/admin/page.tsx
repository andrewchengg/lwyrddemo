import { Card, CardContent } from "@/components/ui/card";
import { lawFirms, sampleInquiries, specialties } from "@/lib/seed-data";

export default function AdminDashboardPage() {
  const newInquiries = sampleInquiries.filter((i) => i.status === "new").length;
  const publishedFirms = lawFirms.length;

  return (
    <div className="w-full">
      <h1 className="font-heading text-2xl font-bold mb-2">Admin Dashboard</h1>
      <p className="text-muted-foreground mb-8">
        Overview of platform activity and data.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-bold">{publishedFirms}</p>
            <p className="text-sm text-muted-foreground">Law Firms</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-bold">{specialties.length}</p>
            <p className="text-sm text-muted-foreground">Specialties</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-bold">{sampleInquiries.length}</p>
            <p className="text-sm text-muted-foreground">Total Inquiries</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-bold text-orange-600">{newInquiries}</p>
            <p className="text-sm text-muted-foreground">New Inquiries</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <h2 className="font-heading text-lg font-semibold mb-4">
            Recent Inquiries
          </h2>
          <div className="space-y-3">
            {sampleInquiries.map((inq) => {
              const specialty = specialties.find(
                (s) => s.id === inq.specialtyId,
              );
              return (
                <div
                  key={inq.id}
                  className="flex items-center justify-between py-2 border-b border-border last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium">{inq.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {specialty?.name} &middot; {inq.email}
                    </p>
                  </div>
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
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
