import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AISearch } from "@/components/landing/ai-search";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="py-28 md:py-36 px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="font-heading text-5xl sm:text-7xl md:text-8xl font-bold leading-[0.95] tracking-tight">
              <span className="uppercase tracking-[0.15em]">
                Making Specialized
              </span>
              <br />
              <span className="uppercase tracking-[0.15em]">
                Legal Services
              </span>
              <br />
              <span className="uppercase tracking-[0.15em]">Accessible</span>
            </h1>
            <p className="mt-10 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Describe your legal situation and we&apos;ll match you with the
              right vetted law firm — powered by AI.
            </p>
            <div className="mt-10">
              <AISearch />
            </div>
            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <Link
                href="/assessment"
                className="hover:text-foreground transition-colors underline underline-offset-4"
              >
                Guided Assessment
              </Link>
              <span className="text-border">|</span>
              <Link
                href="/directory"
                className="hover:text-foreground transition-colors underline underline-offset-4"
              >
                Browse All Firms
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 px-6 border-t border-border">
          <div className="mx-auto max-w-4xl">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-center mb-16 uppercase tracking-[0.15em]">
              How It Works
            </h2>
            <div className="grid md:grid-cols-3 gap-x-16 gap-y-12">
              <div className="text-center">
                <p className="font-heading text-5xl font-light text-primary/20 mb-4">
                  01
                </p>
                <h3 className="font-heading text-lg font-semibold mb-3">
                  Guided Assessment
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Answer a few questions to understand exactly what kind of
                  legal help you need — before you start searching.
                </p>
              </div>
              <div className="text-center">
                <p className="font-heading text-5xl font-light text-primary/20 mb-4">
                  02
                </p>
                <h3 className="font-heading text-lg font-semibold mb-3">
                  Vetted Firms
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Browse a curated network of specialized law firms that have
                  been reviewed and verified by our team.
                </p>
              </div>
              <div className="text-center">
                <p className="font-heading text-5xl font-light text-primary/20 mb-4">
                  03
                </p>
                <h3 className="font-heading text-lg font-semibold mb-3">
                  Easy Connection
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Submit an inquiry directly to a firm or let us match you with
                  the right legal team for your needs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 border-t border-border">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-2xl md:text-3xl font-bold uppercase tracking-[0.15em] mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground mb-10 leading-relaxed">
              Take our free legal needs assessment to find the right legal help
              for your situation.
            </p>
            <Link href="/assessment">
              <Button size="lg" className="text-base px-10 py-6">
                Start Assessment
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
