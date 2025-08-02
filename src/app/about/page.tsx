import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const teamMembers = [
  {
    name: "Alex Johnson",
    role: "Project Lead",
    avatar: "https://placehold.co/100x100.png",
    bio: "Passionate about building communities and connecting people through technology.",
  },
  {
    name: "Samantha Lee",
    role: "Lead Designer",
    avatar: "https://placehold.co/100x100.png",
    bio: "Creates intuitive and beautiful user experiences that users love.",
  },
  {
    name: "Michael Chen",
    role: "Lead Developer",
    avatar: "https://placehold.co/100x100.png",
    bio: "Expert in full-stack development and architecting scalable solutions.",
  },
];

const missionPoints = [
    "Centralize all campus events in one accessible place.",
    "Empower student societies to reach a wider audience.",
    "Enhance student engagement and campus life.",
    "Provide a seamless and modern user experience."
]

export default function AboutPage() {
  return (
    <div className="container py-12 sm:py-16">
      {/* Mission Section */}
      <section className="grid md:grid-cols-2 gap-12 items-center mb-24">
        <div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-6">Our Mission</h1>
          <p className="text-lg text-muted-foreground mb-8">
            At Campus Events Calendar, our mission is to foster a vibrant and connected university community. We believe that student life is enriched by participation, and our platform is designed to make discovering and attending events easier than ever.
          </p>
          <ul className="space-y-4">
            {missionPoints.map((point, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
                <span className="text-foreground">{point}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative h-80 md:h-full w-full rounded-xl overflow-hidden shadow-lg">
             <Image
                src="https://placehold.co/600x600.png"
                alt="Students collaborating"
                fill
                className="object-cover"
                data-ai-hint="happy students campus"
             />
        </div>
      </section>

      {/* Team Section */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Meet the Team</h2>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
            The dedicated individuals behind the Campus Events Calendar.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <Card key={member.name} className="text-center transition-all hover:shadow-xl hover:-translate-y-1 duration-300">
              <CardHeader className="items-center">
                <div className="relative h-24 w-24 rounded-full overflow-hidden">
                    <Image
                        src={member.avatar}
                        alt={member.name}
                        fill
                        className="object-cover"
                        data-ai-hint="professional headshot"
                    />
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-xl font-semibold">{member.name}</CardTitle>
                <p className="text-primary font-medium mb-4">{member.role}</p>
                <p className="text-muted-foreground text-sm">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
