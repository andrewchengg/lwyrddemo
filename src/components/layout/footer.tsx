import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground mt-auto">
      <div className="mx-auto max-w-screen-2xl px-6 md:px-10 lg:px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="border border-primary-foreground/30 px-2.5 py-1.5 font-heading text-lg font-bold tracking-wider inline-block mb-4">
              LWYRD
            </div>
            <p className="text-sm text-primary-foreground/70">
              Making specialized legal services accessible to small businesses,
              startups, and individuals.
            </p>
          </div>
          <div>
            <h4 className="font-heading text-sm font-semibold mb-3 uppercase tracking-wider">
              Navigate
            </h4>
            <div className="space-y-2">
              <Link
                href="/assessment"
                className="block text-sm text-primary-foreground/70 hover:text-primary-foreground"
              >
                Legal Assessment
              </Link>
              <Link
                href="/directory"
                className="block text-sm text-primary-foreground/70 hover:text-primary-foreground"
              >
                Find a Firm
              </Link>
              <Link
                href="/inquiry"
                className="block text-sm text-primary-foreground/70 hover:text-primary-foreground"
              >
                Contact Us
              </Link>
            </div>
          </div>
          <div>
            <h4 className="font-heading text-sm font-semibold mb-3 uppercase tracking-wider">
              Account
            </h4>
            <div className="space-y-2">
              <Link
                href="/login"
                className="block text-sm text-primary-foreground/70 hover:text-primary-foreground"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="block text-sm text-primary-foreground/70 hover:text-primary-foreground"
              >
                Sign Up
              </Link>
              <Link
                href="/dashboard"
                className="block text-sm text-primary-foreground/70 hover:text-primary-foreground"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-primary-foreground/20 text-center text-sm text-primary-foreground/50">
          &copy; 2026 LWYRD. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
