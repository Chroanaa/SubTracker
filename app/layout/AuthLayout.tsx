import Link from "next/link";
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
        <header className='flex items-center justify-between border-b border-white/70 bg-white/80 px-4 py-3 backdrop-blur lg:hidden'>
          <Link
            href='/'
            className='text-sm font-bold text-[var(--finance-ink)]'
          >
            SubTracker
          </Link>
          <a
            href='/auth/logout'
            className='inline-flex items-center rounded-full border border-[var(--finance-border)] bg-white px-3 py-1.5 text-xs font-semibold text-[var(--finance-ink)]'
          >
            Log out
          </a>
        </header>

        <main className='flex-1 p-4 md:p-6 xl:p-8'>{children}</main>
      </div>
    </div>
  );
}
