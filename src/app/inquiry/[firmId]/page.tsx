import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { lawFirms, getSpecialtiesForFirm } from "@/lib/seed-data";
import { ArrowLeft } from "lucide-react";

export default async function FirmInquiryPage({
  params,
}: {
  params: Promise<{ firmId: string }>;
}) {
  const { firmId } = await params;
  const firm = lawFirms.find((f) => f.id === firmId);
  if (!firm) notFound();

  const firmSpecialties = getSpecialtiesForFirm(firm);

  return (
    <>
      <Header />
      <main className="flex-1 py-16 px-6">
        <div className="mx-auto max-w-2xl">
          <Link
            href={`/directory/${firm.slug}`}
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to {firm.name}
          </Link>

          <h1 className="font-heading text-2xl md:text-3xl font-bold uppercase tracking-wider mb-2">
            Contact {firm.name}
          </h1>
          <div className="flex flex-wrap gap-1.5 mb-8">
            {firmSpecialties.map((s) => (
              <Badge key={s.id} variant="outline">
                {s.name}
              </Badge>
            ))}
          </div>

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
                    Message
                  </label>
                  <Textarea
                    placeholder={`Tell ${firm.name} about your legal needs...`}
                    rows={5}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Send Inquiry
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
