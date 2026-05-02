import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { sampleInquiries, specialties } from "@/lib/seed-data";
import { ArrowRight } from "lucide-react";

const statusColors: Record<string, string> = {
  new: "default",
  reviewed: "secondary",
  matched: "outline",
  closed: "secondary",
};

export default function DashboardPage() {
  const userInquiries = sampleInquiries.slice(0, 3);

  return (
    <div className="max-w-4xl">
      <h1 className="font-heading text-2xl font-bold mb-2">Welcome back</h1>
      <p className="text-muted-foreground mb-8">
        Here&apos;s an overview of your legal journey with LWYRD.
      </p>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-bold">{userInquiries.length}</p>
            <p className="text-sm text-muted-foreground">Active Inquiries</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-bold">1</p>
            <p className="text-sm text-muted-foreground">Matched Firms</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-bold">2</p>
            <p className="text-sm text-muted-foreground">Saved Searches</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="font-heading text-lg font-semibold">Recent Inquiries</h2>
        <Link href="/dashboard/inquiries">
          <Button variant="ghost" size="sm">
            View All <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </div>

      <div className="space-y-3">
        {userInquiries.map((inq) => {
          const specialty = specialties.find((s) => s.id === inq.specialtyId);
          return (
            <Card key={inq.id}>
              <CardContent className="pt-4 pb-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{inq.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {specialty?.name} &middot;{" "}
                    {new Date(inq.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <Badge
                  variant={
                    statusColors[inq.status] as
                      | "default"
                      | "secondary"
                      | "outline"
                  }
                >
                  {inq.status}
                </Badge>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
