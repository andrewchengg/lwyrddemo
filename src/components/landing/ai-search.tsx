"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Loader2, MapPin, Send } from "lucide-react";

type RecommendedFirm = {
  firm_id: string;
  firm_name: string;
  match_reason: string;
  slug: string;
  city: string;
  state: string;
  firmSize: string;
  specialties: string[];
};

type SearchResult = {
  summary: string;
  identified_specialties: string[];
  recommended_firms: RecommendedFirm[];
  advice: string;
};

export function AISearch() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SearchResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSearch() {
    if (query.trim().length < 10) {
      setError("Please describe your situation in a bit more detail.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong.");
      } else {
        setResult(data);
      }
    } catch {
      setError("Failed to connect. Please try again.");
    } finally {
      setLoading(false);
    }
  }

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

      {loading && (
        <div className="mt-12 flex flex-col items-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-primary/40" />
          <p className="text-sm text-muted-foreground">
            Analyzing your situation...
          </p>
        </div>
      )}

      {result && (
        <div className="mt-12 text-left">
          <p className="text-foreground leading-relaxed">{result.summary}</p>

          {result.identified_specialties.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {result.identified_specialties.map((s) => (
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

          <div className="mt-8 space-y-3">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-[0.15em]">
              Recommended Firms
            </p>
            {result.recommended_firms.map((firm) => (
              <Link
                key={firm.firm_id}
                href={`/directory/${firm.slug}`}
                className="group block border-b border-border py-5 last:border-0 hover:pl-2 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading text-lg font-semibold group-hover:text-primary/80 transition-colors">
                      {firm.firm_name}
                    </h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" />
                      {firm.city}, {firm.state}
                    </p>
                    <p className="text-sm text-foreground/70 mt-2 leading-relaxed">
                      {firm.match_reason}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {firm.specialties.map((s) => (
                        <span key={s} className="text-xs text-muted-foreground">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary shrink-0 mt-1.5 transition-colors" />
                </div>
              </Link>
            ))}
          </div>

          {result.advice && (
            <p className="mt-6 text-sm text-muted-foreground italic">
              {result.advice}
            </p>
          )}

          <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
            <Link
              href="/inquiry"
              className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
            >
              Prefer a personal match?
            </Link>
            <button
              onClick={() => {
                setResult(null);
                setQuery("");
              }}
              className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
            >
              Search again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
