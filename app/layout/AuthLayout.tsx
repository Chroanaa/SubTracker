import Sidebar from "../components/Sidebar";
import React from "react";

type AuthLayoutUser = {
  name?: string | null;
  email?: string | null;
};

type AuthLayoutProps = {
  children: React.ReactNode;
  user?: AuthLayoutUser;
};

export default function AuthLayout({ children, user }: AuthLayoutProps) {
  return (
    <div className='finance-shell flex min-h-screen flex-col text-[var(--finance-ink)] lg:flex-row'>
      <Sidebar user={user} />

      <div className='flex min-h-screen flex-1 flex-col'>
        <main className='flex-1 p-4 md:p-6 xl:p-8'>{children}</main>
      </div>
    </div>
  );
}
