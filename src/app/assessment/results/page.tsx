import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { specialties, getFirmsBySpecialty } from "@/lib/seed-data";
import { ArrowRight, Search } from "lucide-react";

export default async function ResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ specialties?: string }>;
}) {
  const params = await searchParams;
  const ids = (params.specialties || "").split(",").map(Number).filter(Boolean);

  const recommended = specialties.filter((s) => ids.includes(s.id));

  return (
    <>
      <Header />
      <main className="flex-1 py-16 px-6">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-heading text-2xl md:text-3xl font-bold uppercase tracking-wider mb-2">
            Your Results
          </h1>
          <p className="text-muted-foreground mb-8">
            Based on your answers, here are the legal specialties that match
            your needs.
          </p>

          {recommended.length === 0 ? (
            <Card>
              <CardContent className="pt-8 text-center">
                <p className="text-muted-foreground mb-4">
                  We couldn&apos;t determine a specific recommendation. Try the
                  assessment again or browse our directory.
                </p>
                <div className="flex gap-4 justify-center">
                  <Link href="/assessment">
                    <Button variant="outline">Retake Assessment</Button>
                  </Link>
                  <Link href="/directory">
                    <Button>Browse All Firms</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {recommended.map((specialty) => {
                const firms = getFirmsBySpecialty(specialty.id);
                return (
                  <Card key={specialty.id}>
                    <CardContent className="pt-6">
                      <h3 className="font-heading text-lg font-semibold mb-1">
                        {specialty.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {specialty.description}
                      </p>
                      <p className="text-sm text-foreground/70 mb-4">
                        {firms.length} vetted firm
                        {firms.length !== 1 ? "s" : ""} available
                      </p>
                      <div className="flex gap-3">
                        <Link href={`/directory?specialty=${specialty.slug}`}>
                          <Button size="sm" variant="outline">
                            <Search className="w-4 h-4 mr-2" />
                            View Firms
                          </Button>
                        </Link>
                        <Link href={`/inquiry?specialty=${specialty.id}`}>
                          <Button size="sm">
                            Request a Match
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
