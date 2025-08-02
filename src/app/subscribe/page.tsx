

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SubscribePage() {
  return (
    <div className="container py-12">
      <div className="max-w-xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Subscribe to our Newsletter</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Get the latest updates on university events delivered straight to your
          inbox.
        </p>
        <form className="flex gap-4">
          <Input type="email" placeholder="you@example.com" />
          <Button type="submit">Subscribe</Button>
        </form>
      </div>
    </div>
  );
}
