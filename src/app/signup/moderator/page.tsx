
"use client";

import React, { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { ShieldCheck, KeyRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { auth, googleProvider } from "@/lib/firebase";

const MODERATOR_SECRET_KEY = "23";

export default function ModeratorSignupPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [secretKey, setSecretKey] = useState("");

  const handleVerifyKey = () => {
    if (secretKey === MODERATOR_SECRET_KEY) {
      setIsVerified(true);
      toast({
        title: "Key Verified!",
        description: "You can now proceed to sign up.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Invalid Secret Key",
        description: "The key you entered is incorrect. Please try again.",
      });
    }
  };

  const signInWithGoogle = async () => {
    setIsSubmitting(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("Moderator signed in: ", user);
      toast({
        title: "Moderator Account Created!",
        description: `Welcome, ${user.displayName}! You now have moderator privileges.`,
      });
      // In a real app, you would assign a 'moderator' role to this user in your database.
    } catch (error) {
      console.error("Error signing in with Google", error);
       toast({
        variant: "destructive",
        title: "Oh no! Something went wrong.",
        description: "There was a problem with your sign-up. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container flex items-center justify-center py-12 sm:py-24">
      <Card className="w-full max-w-lg shadow-xl">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-4">
            <ShieldCheck className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold">Create a Moderator Account</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            {isVerified
              ? "Sign up with Google to manage events."
              : "Enter the secret key to become a moderator."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isVerified ? (
            <div className="space-y-4">
                <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        type="password"
                        placeholder="Secret Key"
                        value={secretKey}
                        onChange={(e) => setSecretKey(e.target.value)}
                        className="pl-10 h-12"
                    />
                </div>
              <Button onClick={handleVerifyKey} className="w-full h-12 text-base">
                Verify Key
              </Button>
            </div>
          ) : (
            <Button onClick={signInWithGoogle} className="w-full h-12 text-base" disabled={isSubmitting}>
              {isSubmitting ? "Signing Up..." : "Sign Up with Google"}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
