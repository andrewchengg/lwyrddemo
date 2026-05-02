import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function SignupPage() {
  return (
    <>
      <Header />
      <main className="flex-1 flex items-center justify-center py-16 px-6">
        <div className="w-full max-w-md">
          <h1 className="font-heading text-2xl font-bold text-center mb-2">
            Create Account
          </h1>
          <p className="text-center text-muted-foreground mb-8">
            Join LWYRD to track your inquiries and save searches
          </p>
          <Card>
            <CardContent className="pt-6">
              <form className="space-y-4">
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
                <div>
                  <label className="text-sm font-medium mb-1.5 block">
                    Password
                  </label>
                  <Input type="password" placeholder="Create a password" />
                </div>
                <Button type="submit" className="w-full">
                  Create Account
                </Button>
              </form>
              <p className="text-sm text-center text-muted-foreground mt-4">
                Already have an account?{" "}
                <Link href="/login" className="text-foreground underline">
                  Log in
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
