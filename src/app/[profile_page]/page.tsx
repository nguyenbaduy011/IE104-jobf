import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, CircleUserRound, GraduationCap } from "lucide-react";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { user } from "@/drizzle/schema/auth";
import { db } from "@/drizzle/db";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import Link from "next/link";

interface userProps {
  searchParams: {
    id: string;
  };
}

export default async function ProfilePage({ searchParams }: userProps) {
  const resolvedHeaders = await headers();
  const session = await auth.api.getSession({
    headers: resolvedHeaders,
  });

  let user_page;
  try {
    user_page = await db.query.user.findFirst({
      where: eq(user.id, searchParams.id),
    });
  } catch (error) {
    console.error("Error fetching user page:", error);
    redirect("/");
  }

  if (!user_page) {
    return (
      <div>
        <h1>Không tìm thấy công ty</h1>
        <p>Công ty bạn đang tìm kiếm không tồn tại.</p>
      </div>
    );
  }
  return (
    <div className="container mx-auto p-4 space-y-6">
      <header className="flex justify-between">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <Avatar className="w-24 h-24">
            <AvatarImage
              src={user_page?.image || "/default-avatar.png"}
              alt={user_page?.name}
            />
            <AvatarFallback>J{user_page?.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-bold">{user_page?.name}</h1>
            <p className="text-xl text-muted-foreground">
              Senior Software Engineer
            </p>
          </div>
        </div>
        {(session?.user.id === searchParams.id) &&
        <Link href={"/"}>
          <Button className="relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-input text-black bg-white hover:bg-slate-400 ">
            <CircleUserRound className="opacity-60" size={16} strokeWidth={2} />
          </Button>
        </Link>}
      </header>

      <section>
        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Experienced software engineer with a passion for creating
              efficient and scalable applications. Skilled in full-stack
              development with a focus on JavaScript technologies. Looking for
              challenging opportunities in innovative tech companies.
            </p>
          </CardContent>
        </Card>
      </section>

      <section>
        <Card>
          <CardHeader>
            <CardTitle>Work Experience</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                title: "Senior Software Engineer",
                company: "Tech Innovators Inc.",
                period: "2020 - Present",
                description:
                  "Lead developer for core product features. Mentored junior developers and implemented best practices.",
              },
              {
                title: "Software Engineer",
                company: "StartUp Solutions",
                period: "2017 - 2020",
                description:
                  "Developed and maintained multiple client-facing applications. Improved app performance by 40%.",
              },
            ].map((job, index) => (
              <div
                key={index}
                className="border-b last:border-b-0 pb-4 last:pb-0"
              >
                <h3 className="font-semibold flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  {job.title} at {job.company}
                </h3>
                <p className="text-sm text-muted-foreground">{job.period}</p>
                <p className="mt-2">{job.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section>
        <Card>
          <CardHeader>
            <CardTitle>Education</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              <h3 className="font-semibold">BS in Computer Science</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              University of Technology, 2013 - 2017
            </p>
          </CardContent>
        </Card>
      </section>

      <section>
        <Card>
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-1">
              <li>Open source contributor to various JavaScript libraries</li>
              <li>Speaker at local tech meetups</li>
              <li>Passion for mentoring and teaching coding skills</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <div className="flex justify-center">
        <Button size="lg">Download Resume</Button>
      </div>
    </div>
  );
}
