import React from "react";
import { auth } from "@/auth";

const SettinsPage = async () => {
  const data = await auth();

  return <div>{JSON.stringify(data?.user)}</div>;
};

export default SettinsPage;
