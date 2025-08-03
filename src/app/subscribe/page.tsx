
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from "lucide-react";

export default function SubscribePage() {
  return (
    <div className="container flex items-center justify-center py-12 sm:py-24">
      <Card className="w-full max-w-xl shadow-xl">
        <CardHeader className="text-center">
           <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-4">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold">Subscribe to our Newsletter</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Get the latest updates on university events delivered straight to your inbox.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex w-full max-w-md mx-auto items-center space-x-2">
            <Input
              type="email"
              placeholder="you@example.com"
              className="flex-1 h-12"
            />
            <Button type="submit" className="h-12">
              Subscribe
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
