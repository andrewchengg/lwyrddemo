import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { specialties } from "@/lib/seed-data";
import { ArrowLeft } from "lucide-react";

export default function NewFirmPage() {
  return (
    <div className="max-w-3xl">
      <Link
        href="/admin/firms"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Firms
      </Link>

      <h1 className="font-heading text-2xl font-bold mb-6">Add New Firm</h1>

      <Card>
        <CardContent className="pt-6">
          <form className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">
                  Firm Name
                </label>
                <Input placeholder="e.g. Smith & Associates" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Slug</label>
                <Input placeholder="e.g. smith-associates" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">
                Description
              </label>
              <Textarea placeholder="Describe the firm..." rows={4} />
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">City</label>
                <Input placeholder="City" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">
                  State
                </label>
                <Input placeholder="ST" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">
                  Firm Size
                </label>
                <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
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
                <Input type="email" placeholder="firm@example.com" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">
                  Phone
                </label>
                <Input type="tel" placeholder="(555) 123-4567" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">
                  Website
                </label>
                <Input placeholder="https://..." />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">
                Specialties
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {specialties.map((s) => (
                  <label key={s.id} className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="rounded" />
                    {s.name}
                  </label>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <label className="text-sm font-medium">Featured firm</label>
            </div>
            <div className="flex gap-3">
              <Button type="submit">Create Firm</Button>
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
