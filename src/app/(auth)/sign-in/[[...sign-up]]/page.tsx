import { SignIn } from "@clerk/nextjs";

const Page = () => {
  return (
    <div>
      <SignIn redirectUrl="/dashboard"  />
    </div>
  );
};

export default Page;
