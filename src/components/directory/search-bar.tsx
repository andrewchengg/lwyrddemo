"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { lawFirms, getSpecialtiesForFirm } from "@/lib/seed-data";
import { Search, MapPin, Users, X } from "lucide-react";

const firmSizeLabels: Record<string, string> = {
  solo: "Solo",
  small: "2-10",
  mid: "11-50",
  large: "50+",
};

export function DirectorySearchBar() {
  const [search, setSearch] = useState("");
  const [focused, setFocused] = useState(false);

  const query = search.toLowerCase().trim();
  const results =
    query.length >= 2
      ? lawFirms.filter((f) => {
          const specs = getSpecialtiesForFirm(f);
          const searchable = [
            f.name,
            f.description,
            f.city,
            f.state,
            ...specs.map((s) => s.name),
          ]
            .join(" ")
            .toLowerCase();
          return searchable.includes(query);
        })
      : [];

  const showDropdown = focused && query.length >= 2;

  return (
    <div className="relative mb-8">
      <div className="relative">
        <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 200)}
          placeholder="Search firms by name, specialty, or location..."
          className="w-full bg-transparent text-base text-foreground placeholder:text-muted-foreground/40 focus:outline-none py-3 pl-8 pr-8 border-b border-border focus:border-primary transition-colors"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-muted-foreground/50 hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {showDropdown && (
        <div className="absolute z-40 top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg max-h-80 overflow-y-auto">
          {results.length === 0 ? (
            <p className="px-4 py-6 text-sm text-muted-foreground text-center">
              No firms match &ldquo;{search}&rdquo;
            </p>
          ) : (
            results.map((firm) => {
              const specs = getSpecialtiesForFirm(firm);
              return (
                <Link
                  key={firm.id}
                  href={`/directory/${firm.slug}`}
                  className="block px-4 py-3 hover:bg-muted/50 transition-colors border-b border-border last:border-0"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-heading font-semibold text-sm">
                        {firm.name}
                      </p>
                      <div className="flex items-center gap-3 mt-0.5 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {firm.city}, {firm.state}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {firmSizeLabels[firm.firmSize]}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-1 shrink-0 ml-4">
                      {specs.slice(0, 2).map((s) => (
                        <Badge
                          key={s.id}
                          variant="outline"
                          className="text-[10px]"
                        >
                          {s.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
