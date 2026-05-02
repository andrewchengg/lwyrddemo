import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { lawFirms, specialties, getSpecialtiesForFirm } from "@/lib/seed-data";
import { MapPin, Users } from "lucide-react";
import { DirectorySearchBar } from "@/components/directory/search-bar";

const firmSizeLabels: Record<string, string> = {
  solo: "Solo Practitioner",
  small: "Small (2-10)",
  mid: "Mid-size (11-50)",
  large: "Large (50+)",
};

export default async function DirectoryPage({
  searchParams,
}: {
  searchParams: Promise<{ specialty?: string; state?: string; size?: string }>;
}) {
  const params = await searchParams;

  let filtered = [...lawFirms];

  if (params.specialty) {
    const spec = specialties.find((s) => s.slug === params.specialty);
    if (spec) {
      filtered = filtered.filter((f) => f.specialtyIds.includes(spec.id));
    }
  }
  if (params.state) {
    filtered = filtered.filter((f) => f.state === params.state);
  }
  if (params.size) {
    filtered = filtered.filter((f) => f.firmSize === params.size);
  }

  const states = [...new Set(lawFirms.map((f) => f.state))].sort();

  return (
    <>
      <Header />
      <main className="flex-1 py-16 px-6 md:px-10 lg:px-16">
        <div className="mx-auto max-w-screen-2xl">
          <h1 className="font-heading text-2xl md:text-3xl font-bold uppercase tracking-wider mb-2">
            Find a Law Firm
          </h1>
          <p className="text-muted-foreground mb-8">
            Browse our curated network of {lawFirms.length} vetted law firms.
          </p>

          <DirectorySearchBar />

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Link href="/directory">
              <Badge
                variant={
                  !params.specialty && !params.state && !params.size
                    ? "default"
                    : "outline"
                }
                className="cursor-pointer"
              >
                All
              </Badge>
            </Link>
            {specialties.map((s) => (
              <Link key={s.id} href={`/directory?specialty=${s.slug}`}>
                <Badge
                  variant={params.specialty === s.slug ? "default" : "outline"}
                  className="cursor-pointer"
                >
                  {s.name}
                </Badge>
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {states.map((state) => (
              <Link
                key={state}
                href={`/directory?state=${state}${params.specialty ? `&specialty=${params.specialty}` : ""}`}
              >
                <Badge
                  variant={params.state === state ? "default" : "outline"}
                  className="cursor-pointer text-xs"
                >
                  {state}
                </Badge>
              </Link>
            ))}
          </div>

          {/* Results */}
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground mb-4">
                No firms match your filters.
              </p>
              <Link href="/directory">
                <Button variant="outline">Clear Filters</Button>
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((firm) => {
                const firmSpecialties = getSpecialtiesForFirm(firm);
                return (
                  <Link key={firm.id} href={`/directory/${firm.slug}`}>
                    <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-heading text-lg font-semibold leading-tight">
                            {firm.name}
                          </h3>
                          {firm.featured && (
                            <Badge
                              variant="default"
                              className="text-xs shrink-0 ml-2"
                            >
                              Featured
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {firm.city}, {firm.state}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3.5 h-3.5" />
                            {firmSizeLabels[firm.firmSize]}
                          </span>
                        </div>
                        <p className="text-sm text-foreground/70 mb-4 line-clamp-2">
                          {firm.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {firmSpecialties.map((s) => (
                            <Badge
                              key={s.id}
                              variant="outline"
                              className="text-xs"
                            >
                              {s.name}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
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
