import { SignOutButton, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <UserButton />
      This is protected page
    </div>
  );
}
