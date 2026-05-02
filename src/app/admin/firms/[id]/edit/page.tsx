import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { lawFirms, specialties } from "@/lib/seed-data";
import { ArrowLeft } from "lucide-react";

export default async function EditFirmPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const firm = lawFirms.find((f) => f.id === id);
  if (!firm) notFound();

  return (
    <div className="max-w-3xl">
      <Link
        href="/admin/firms"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Firms
      </Link>

      <h1 className="font-heading text-2xl font-bold mb-6">
        Edit: {firm.name}
      </h1>

      <Card>
        <CardContent className="pt-6">
          <form className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">
                  Firm Name
                </label>
                <Input defaultValue={firm.name} />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Slug</label>
                <Input defaultValue={firm.slug} />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">
                Description
              </label>
              <Textarea defaultValue={firm.description} rows={4} />
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">City</label>
                <Input defaultValue={firm.city} />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">
                  State
                </label>
                <Input defaultValue={firm.state} />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">
                  Firm Size
                </label>
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  defaultValue={firm.firmSize}
                >
                  <option value="solo">Solo</option>
                  <option value="small">Small (2-10)</option>
                  <option value="mid">Mid (11-50)</option>
                  <option value="large">Large (50+)</option>
                </select>
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">
                  Email
                </label>
                <Input type="email" defaultValue={firm.email} />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">
                  Phone
                </label>
                <Input type="tel" defaultValue={firm.phone} />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">
                  Website
                </label>
                <Input defaultValue={firm.website} />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">
                Specialties
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {specialties.map((s) => (
                  <label key={s.id} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      className="rounded"
                      defaultChecked={firm.specialtyIds.includes(s.id)}
                    />
                    {s.name}
                  </label>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="rounded"
                defaultChecked={firm.featured}
              />
              <label className="text-sm font-medium">Featured firm</label>
            </div>
            <div className="flex gap-3">
              <Button type="submit">Save Changes</Button>
              <Link href="/admin/firms">
                <Button variant="outline">Cancel</Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
