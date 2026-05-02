import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function LoginPage() {
  return (
    <>
      <Header />
      <main className="flex-1 flex items-center justify-center py-16 px-6">
        <div className="w-full max-w-md">
          <h1 className="font-heading text-2xl font-bold text-center mb-2">
            Welcome Back
          </h1>
          <p className="text-center text-muted-foreground mb-8">
            Log in to your LWYRD account
          </p>
          <Card>
            <CardContent className="pt-6">
              <form className="space-y-4">
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
                  <Input type="password" placeholder="Your password" />
                </div>
                <Button type="submit" className="w-full">
                  Log In
                </Button>
              </form>
              <Separator className="my-6" />
              <Button variant="outline" className="w-full">
                Send Magic Link
              </Button>
              <p className="text-sm text-center text-muted-foreground mt-4">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-foreground underline">
                  Sign up
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
