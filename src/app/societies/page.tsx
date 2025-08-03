
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSocieties } from "@/lib/societies";
import { Users } from "lucide-react";

export default async function SocietiesPage() {
  const societies = await getSocieties();

  return (
    <div className="container py-12 sm:py-16">
      <section className="mb-12 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
          Student Societies
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Discover the diverse range of student-led societies and clubs at our university.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {societies.map((society) => (
          <Card key={society.id} className="flex flex-col transition-all hover:shadow-xl hover:-translate-y-1 duration-300">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-2xl font-bold">{society.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">{society.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
