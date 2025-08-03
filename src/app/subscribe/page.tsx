
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Send } from "lucide-react";
import Image from "next/image";

export default function SubscribePage() {
  return (
    <div className="container py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 overflow-hidden rounded-2xl border border-primary/20 bg-card shadow-2xl lg:grid-cols-2">
        <div className="relative hidden aspect-square lg:block">
          <Image 
            src="https://placehold.co/600x600.png" 
            alt="Students subscribing to a newsletter"
            fill
            className="object-cover"
            data-ai-hint="newsletter university"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        </div>
        <div className="flex flex-col justify-center p-8 lg:p-12">
          <div className="mb-6 w-fit rounded-full bg-primary/10 p-3">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Never Miss an Event
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Subscribe to our newsletter and get exclusive updates on the latest events, workshops, and happenings around campus, delivered straight to your inbox.
          </p>
          <form className="mt-8 flex w-full max-w-md items-center space-x-2">
            <Input
              type="email"
              placeholder="you@giki.edu.pk"
              className="h-12 flex-1 rounded-l-full border-r-0 focus:ring-primary"
            />
            <Button type="submit" className="h-12 rounded-r-full px-6">
              <span className="hidden sm:inline">Subscribe</span>
              <Send className="sm:hidden" />
            </Button>
          </form>
          <p className="mt-3 text-xs text-muted-foreground">
            We respect your privacy. No spam.
          </p>
        </div>
      </div>
    </div>
  );
}
