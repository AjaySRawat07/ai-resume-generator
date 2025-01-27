import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import DarkModeSwitch from "./DarkModeSwitch";
import { checkUser } from "@/lib/checkUser";
import CheckUserClient from "./CheckUserClient";

const Header = async () => {
  await checkUser();

  return (
    <div className="fixed top-0 w-full  backdrop-blur-md z-50 border-b">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between lg:px-12">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={"/android-chrome-512x512.png"}
            alt="Logo"
            width={35}
            height={35}
            className="rounded-full"
          />
          <span className="text-xl font-bold tracking-tight">
            AI Resume Builder
          </span>
        </Link>
        <div className="flex items-center space-x-4">
          <Button>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <SignedIn>
            <DarkModeSwitch />
          </SignedIn>

          <SignedOut>
            <SignInButton forceRedirectUrl="/dashboard">
              <Button variant="outline">Login</Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            />
          </SignedIn>
        </div>
        <CheckUserClient/>
      </nav>
    </div>
  );
};

export default Header;
