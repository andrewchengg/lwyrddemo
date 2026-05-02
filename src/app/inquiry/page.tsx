import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { specialties } from "@/lib/seed-data";

export default async function InquiryPage({
  searchParams,
}: {
  searchParams: Promise<{ specialty?: string }>;
}) {
  const params = await searchParams;
  const preselectedSpecialty = params.specialty || "";

  return (
    <>
      <Header />
      <main className="flex-1 py-16 px-6">
        <div className="mx-auto max-w-2xl">
          <h1 className="font-heading text-2xl md:text-3xl font-bold uppercase tracking-wider mb-2">
            Request a Match
          </h1>
          <p className="text-muted-foreground mb-8">
            Tell us about your legal needs and we&apos;ll connect you with the
            right firm.
          </p>

          <Card>
            <CardContent className="pt-6">
              <form className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">
                      Full Name
                    </label>
                    <Input placeholder="Your name" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">
                      Email
                    </label>
                    <Input type="email" placeholder="you@example.com" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">
                    Phone (optional)
                  </label>
                  <Input type="tel" placeholder="(555) 123-4567" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">
                    Legal Specialty
                  </label>
                  <select
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    defaultValue={preselectedSpecialty}
                  >
                    <option value="">Select a specialty...</option>
                    {specialties.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">
                    Describe Your Legal Need
                  </label>
                  <Textarea
                    placeholder="Tell us about your situation..."
                    rows={5}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Submit Inquiry
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Your information is kept confidential and only shared with
                  matched firms.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
