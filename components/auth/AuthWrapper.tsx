import React, { ReactNode } from "react";
import SocialLogin from "./SocialLogin";

interface AuthWrapperProps {
  children: ReactNode;
  headerLabel: string;
  showSocial?: boolean;
}

const AuthWrapper = ({
  children,
  showSocial,
  headerLabel,
}: AuthWrapperProps) => {
  return (
    <div>
      <h1>{headerLabel}</h1>
      {children}
      {showSocial && <SocialLogin />}
    </div>
  );
};

export default AuthWrapper;
