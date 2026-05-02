"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Loader2, MapPin, Send } from "lucide-react";
import { lawFirms, getSpecialtiesForFirm } from "@/lib/seed-data";

type ParsedFirm = {
  id: string;
  name: string;
  reason: string;
  slug: string;
  city: string;
  state: string;
  specialties: string[];
};

function parseStreamedResponse(text: string) {
  const summary =
    text.match(/===SUMMARY===\s*([\s\S]*?)(?=\n===|$)/)?.[1]?.trim() || "";
  const specialtiesMatch =
    text.match(/===SPECIALTIES===\s*([\s\S]*?)(?=\n===|$)/)?.[1]?.trim() || "";
  const identifiedSpecialties = specialtiesMatch
    ? specialtiesMatch
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];
  const advice =
    text.match(/===ADVICE===\s*([\s\S]*?)(?=\n===|$)/)?.[1]?.trim() || "";

  const firmBlocks = text.split("===FIRM===").slice(1);
  const firms: ParsedFirm[] = firmBlocks
    .map((block) => {
      const id = block.match(/ID:\s*(\S+)/)?.[1] || "";
      const name = block.match(/Name:\s*(.+)/)?.[1]?.trim() || "";
      const reason =
        block.match(/Reason:\s*([\s\S]*?)(?=\n===|$)/)?.[1]?.trim() || "";
      const firm = lawFirms.find((f) => f.id === id);
      const specs = firm ? getSpecialtiesForFirm(firm) : [];
      return {
        id,
        name: name || firm?.name || "",
        reason,
        slug: firm?.slug || "",
        city: firm?.city || "",
        state: firm?.state || "",
        specialties: specs.map((s) => s.name),
      };
    })
    .filter((f) => f.id && f.name);

  return { summary, identifiedSpecialties, firms, advice };
}

export function AISearch() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [streamedText, setStreamedText] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(async () => {
    if (query.trim().length < 10) {
      setError("Please describe your situation in a bit more detail.");
      return;
    }

    setLoading(true);
    setError(null);
    setStreamedText("");
    setDone(false);

    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Something went wrong.");
        setLoading(false);
        return;
      }

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      if (reader) {
        while (true) {
          const { done: readerDone, value } = await reader.read();
          if (readerDone) break;
          accumulated += decoder.decode(value, { stream: true });
          setStreamedText(accumulated);
        }
      }

      setDone(true);
    } catch {
      setError("Failed to connect. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [query]);

  const parsed = streamedText ? parseStreamedResponse(streamedText) : null;
  const showResults = parsed && (parsed.summary || parsed.firms.length > 0);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Search input */}
      <div className="relative border-b-2 border-primary/30 focus-within:border-primary transition-colors">
        <input
          type="text"
          placeholder="Describe your legal situation..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSearch();
            }
          }}
          className="w-full bg-transparent text-lg text-foreground placeholder:text-muted-foreground/50 focus:outline-none py-4 pr-14"
          disabled={loading}
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="absolute right-0 top-1/2 -translate-y-1/2 p-2.5 text-primary hover:text-primary/70 disabled:text-muted-foreground/30 transition-colors"
          aria-label="Search"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </button>
      </div>
      <p className="mt-2 text-xs text-muted-foreground/60">
        Press Enter to search &middot; AI-powered matching
      </p>

      {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

      {showResults && (
        <div className="mt-12 text-left">
          {parsed.summary && (
            <p className="text-foreground leading-relaxed">{parsed.summary}</p>
          )}

          {parsed.identifiedSpecialties.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {parsed.identifiedSpecialties.map((s) => (
                <Badge
                  key={s}
                  variant="outline"
                  className="text-xs font-normal"
                >
                  {s}
                </Badge>
              ))}
            </div>
          )}

          {parsed.firms.length > 0 && (
            <div className="mt-8 space-y-3">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-[0.15em]">
                Recommended Firms
              </p>
              {parsed.firms.map((firm) => (
                <Link
                  key={firm.id}
                  href={`/directory/${firm.slug}`}
                  className="group block border-b border-border py-5 last:border-0 hover:pl-2 transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading text-lg font-semibold group-hover:text-primary/80 transition-colors">
                        {firm.name}
                      </h3>
                      {firm.city && (
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3" />
                          {firm.city}, {firm.state}
                        </p>
                      )}
                      {firm.reason && (
                        <p className="text-sm text-foreground/70 mt-2 leading-relaxed">
                          {firm.reason}
                        </p>
                      )}
                      {firm.specialties.length > 0 && (
                        <div className="flex flex-wrap gap-3 mt-3">
                          {firm.specialties.map((s) => (
                            <span
                              key={s}
                              className="text-xs text-muted-foreground"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary shrink-0 mt-1.5 transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          )}

          {parsed.advice && done && (
            <p className="mt-6 text-sm text-muted-foreground italic">
              {parsed.advice}
            </p>
          )}

          {done && (
            <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
              <Link
                href="/inquiry"
                className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
              >
                Prefer a personal match?
              </Link>
              <button
                onClick={() => {
                  setStreamedText("");
                  setDone(false);
                  setQuery("");
                }}
                className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
              >
                Search again
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
