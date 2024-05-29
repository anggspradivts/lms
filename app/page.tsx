import { SignOutButton, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <UserButton />
      This is ubprotected page
    </div>
  );
}
