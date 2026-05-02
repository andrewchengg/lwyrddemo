import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getFirmBySlug, getSpecialtiesForFirm } from "@/lib/seed-data";
import {
  MapPin,
  Users,
  Globe,
  Mail,
  Phone,
  Calendar,
  ArrowLeft,
} from "lucide-react";

const firmSizeLabels: Record<string, string> = {
  solo: "Solo Practitioner",
  small: "Small (2-10 attorneys)",
  mid: "Mid-size (11-50 attorneys)",
  large: "Large (50+ attorneys)",
};

export default async function FirmProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const firm = getFirmBySlug(slug);
  if (!firm) notFound();

  const firmSpecialties = getSpecialtiesForFirm(firm);

  return (
    <>
      <Header />
      <main className="flex-1 py-16 px-6">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/directory"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Directory
          </Link>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="font-heading text-3xl font-bold">{firm.name}</h1>
                {firm.featured && <Badge>Featured</Badge>}
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {firm.city}, {firm.state}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {firmSizeLabels[firm.firmSize]}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Est. {firm.yearFounded}
                </span>
              </div>
            </div>
            <Link href={`/inquiry/${firm.id}`}>
              <Button size="lg">Contact This Firm</Button>
            </Link>
          </div>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="font-heading text-lg font-semibold mb-3">About</h2>
              <p className="text-foreground/80 leading-relaxed">
                {firm.description}
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="font-heading text-lg font-semibold mb-3">
                Practice Areas
              </h2>
              <div className="flex flex-wrap gap-2">
                {firmSpecialties.map((s) => (
                  <Link key={s.id} href={`/directory?specialty=${s.slug}`}>
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    >
                      {s.name}
                    </Badge>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h2 className="font-heading text-lg font-semibold mb-3">
                Contact Information
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>{firm.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{firm.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <span>{firm.website}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
