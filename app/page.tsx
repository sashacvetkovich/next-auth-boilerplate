import Image from "next/image";
import { Button } from "@/components/ui/button";
import LoginButton from "@/components/auth/LoginButton";

export default function Home() {
  return (
    <main>
      <h1>Auth</h1>
      <LoginButton>
        <Button variant="secondary">Sign in</Button>
      </LoginButton>
    </main>
  );
}
