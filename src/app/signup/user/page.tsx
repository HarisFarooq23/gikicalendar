
"use client";

import React from "react";
import { UserPlus } from "lucide-react";
import { useRouter } from 'next/navigation';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";

export default function UserSignupPage() {
  const { toast } = useToast();
  const { login } = useAuth();
  const router = useRouter();


  const handleGoogleSignup = async () => {
    // This is where you would implement Firebase Google Authentication.
    // For now, we'll just simulate a login and show a notification.
    login(false); // Login as a regular user
    toast({
        title: "Signed In!",
        description: "You have successfully signed up.",
    });
    router.push('/');
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
            <Button onClick={handleGoogleSignup} className="w-full h-12 text-base">
                Sign Up with Google
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}
