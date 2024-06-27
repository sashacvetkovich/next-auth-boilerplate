"use client";

import { useRouter } from "next/navigation";

interface LoginButtonProps {
  children: React.ReactNode;
}

const LoginButton = ({ children }: LoginButtonProps) => {
  const router = useRouter();

  const clickHanlder = () => {
    router.push("/auth/login");
  };
  return (
    <div onClick={clickHanlder} className="cursor-pointer">
      {children}
    </div>
  );
};

export default LoginButton;
