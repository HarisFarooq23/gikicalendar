
"use client";

import React from "react";
import { signInWithPopup } from "firebase/auth";
import { UserPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { auth, googleProvider } from "@/lib/firebase";

export default function UserSignupPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const signInWithGoogle = async () => {
    setIsSubmitting(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("User signed in: ", user);
      toast({
        title: "Account Created!",
        description: `Welcome, ${user.displayName}!`,
      });
      // Here you would typically save the user to your database
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
            <UserPlus className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold">Create a User Account</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Sign up with Google to stay updated with all campus events.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <Button onClick={signInWithGoogle} className="w-full h-12 text-base" disabled={isSubmitting}>
                {isSubmitting ? "Signing Up..." : "Sign Up with Google"}
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}
