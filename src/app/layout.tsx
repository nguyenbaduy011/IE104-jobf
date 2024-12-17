import type { Metadata } from "next";
import "@/styles/globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "JobF",
  description: "Được tạo bởi create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const resolvedHeaders = await headers();
  const session = await auth.api.getSession({
    headers: resolvedHeaders,
  });

  return (
    <html lang="en">
      <body>
        <main>
          <Header session={session?.session} user={session?.user}/>
          {children}
          <Footer />
        </main>
        <Toaster />
      </body>
    </html>
  );
}
