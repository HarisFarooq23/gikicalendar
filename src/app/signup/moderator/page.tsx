
"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ShieldCheck, KeyRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const moderatorSignupSchema = z.object({
  secretKey: z.string().min(1, { message: "Secret key is required." }),
});

type ModeratorSignupFormValues = z.infer<typeof moderatorSignupSchema>;

export default function ModeratorSignupPage() {
  const { toast } = useToast();

  const form = useForm<ModeratorSignupFormValues>({
    resolver: zodResolver(moderatorSignupSchema),
    defaultValues: {
      secretKey: "",
    },
  });

  const onSubmit = (data: ModeratorSignupFormValues) => {
    if (data.secretKey === "23") {
      toast({
        title: "Success!",
        description: "Secret key verified. You can now proceed.",
        variant: "default",
      });
      // Here you would typically redirect the user or grant moderator privileges
    } else {
      toast({
        title: "Error",
        description: "Invalid secret key. Please try again.",
        variant: "destructive",
      });
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
            Enter the secret key to become a moderator.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="secretKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Secret Key</FormLabel>
                    <div className="relative">
                      <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Secret Key"
                          className="pl-10 h-12"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full h-12 text-base" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Verifying..." : "Verify Key"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
