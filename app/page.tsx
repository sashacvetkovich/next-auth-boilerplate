import Image from "next/image";
import LoginButton from "@/components/auth/LoginButton";

export default function Home() {
  return (
    <main>
      <h1>Auth</h1>
      <LoginButton>
        <button>Sign in</button>
      </LoginButton>
    </main>
  );
}
