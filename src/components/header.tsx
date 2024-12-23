import Link from "next/link";
import {
  // NavigationMenu,
  // NavigationMenuContent,
  // NavigationMenuItem,
  NavigationMenuLink,
  // NavigationMenuList,
  // NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {  LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Profile } from "@/components/ui/profile";

import { cn } from "@/lib/utils";

import Image from "next/image";
import React from "react";

type HeaderProps = {
  session?: {
    id: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    expiresAt: Date;
    token: string;
    ipAddress?: string | null | undefined;
    userAgent?: string | null | undefined;
  };
  user?: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: string | null;
    role?: string;
  };
};

export default function Header({ session, user }: HeaderProps) {
  return (
    <nav className="flex px-20 py-2 justify-between items-center bg-primary-foreground sticky inset-x-0 top-0 w-full z-10">
      <Link className="font-bold text-4xl " href="/">
        <Image src="/jobf.svg" alt="JobF logo" width={100} height={100} />
      </Link>
      <div className="space-x-10 font-medium text-xl/6 tracking-tight flex items-center">
        {/* <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="hover:text-black focus:bg-primary-foreground data-[active]:bg-primary-foreground/50 data-[state=open]:bg-bg-primary-foreground/50 text-xl/6 bg-primary-foreground hover:bg-primary-foreground transition-colors">
                Việc làm
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="w-[135.56px]">
                  <ListItem
                    key="N5"
                    title="N5"
                    href="/N5"
                    className="bg-white text-center hover:bg-primary hover:text-white"
                  ></ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu> */}
        <Link className="hover:underline hover:underline-offset-8" href="/companies">
          Công ty
        </Link>
        <Link className="hover:underline hover:underline-offset-8" href="#">
          Blog
        </Link>

        {session && user ? (
          <div className="flex items-center space-x-10">
            {/* <Button asChild className="w-full sm:w-auto">
              <Link href="/blogs/createBlog">
                <PlusCircle className="h-4 w-4" />
              </Link>
            </Button> */}
            {user.role === "admin" && (
              <Button asChild variant="outline" className="w-full sm:w-auto">
                <Link href="/admin">
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  Dashboard
                </Link>
              </Button>
            )}
            <Profile
              user={{
                ...user,
                image: user.image ?? "",
              }}
            />
          </div>
        ) : (
          <Button asChild>
            <Link href="/login">Đăng nhập</Link>
          </Button>
        )}
      </div>
    </nav>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
