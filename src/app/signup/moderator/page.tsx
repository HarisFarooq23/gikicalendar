
"use client";

import React from "react";
import { ShieldCheck, KeyRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ModeratorSignupPage() {

  return (
    <div className="container flex items-center justify-center py-12 sm:py-24">
      <Card className="w-full max-w-lg shadow-xl">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-4">
            <ShieldCheck className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold">Create a Moderator Account</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Enter the secret key to become a moderator.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        type="password"
                        placeholder="Secret Key"
                        className="pl-10 h-12"
                    />
                </div>
              <Button className="w-full h-12 text-base" disabled>
                Verify Key
              </Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
