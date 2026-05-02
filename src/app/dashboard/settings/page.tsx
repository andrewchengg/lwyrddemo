import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="font-heading text-2xl font-bold mb-2">Account Settings</h1>
      <p className="text-muted-foreground mb-8">
        Manage your profile and preferences.
      </p>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <h2 className="font-heading text-lg font-semibold mb-4">Profile</h2>
          <form className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">
                Full Name
              </label>
              <Input defaultValue="Sarah Johnson" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Email</label>
              <Input type="email" defaultValue="sarah@example.com" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Phone</label>
              <Input type="tel" defaultValue="(555) 111-2222" />
            </div>
            <Button type="submit">Save Changes</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h2 className="font-heading text-lg font-semibold mb-4">Security</h2>
          <form className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">
                Current Password
              </label>
              <Input type="password" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">
                New Password
              </label>
              <Input type="password" />
            </div>
            <Button type="submit" variant="outline">
              Update Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
