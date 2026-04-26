"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type IconName =
  | "dashboard"
  | "tools"
  | "services"
  | "reports"
  | "clock"
  | "user"
  | "help"
  | "settings"
  | "logout";

type SidebarUser = {
  name?: string | null;
  email?: string | null;
};

type SidebarProps = {
  user?: SidebarUser;
};

const navItems = [
  {
    href: "/auth/pages/Dashboard",
    label: "Overview",
    icon: "dashboard" as const,
  },
  { href: "/toolspage", label: "Analytics", icon: "tools" as const },
  {
    href: "/auth/pages/servicepage",
    label: "Subscriptions",
    icon: "services" as const,
  },
];

function SidebarIcon({
  name,
  className,
}: {
  name: IconName;
  className?: string;
}) {
  const classes = className ?? "h-4 w-4";

  if (name === "dashboard") {
    return (
      <svg
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.8'
        className={classes}
      >
        <path d='M4 12h6V4H4v8Zm10 8h6v-6h-6v6Zm0-10h6V4h-6v6Zm-10 10h6v-4H4v4Z' />
      </svg>
    );
  }

  if (name === "tools") {
    return (
      <svg
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.8'
        className={classes}
      >
        <path d='M4 20V10m8 10V4m8 16v-6' />
      </svg>
    );
  }

  if (name === "services") {
    return (
      <svg
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.8'
        className={classes}
      >
        <path d='M4 7h16M4 12h16M4 17h16' />
      </svg>
    );
  }

  if (name === "reports") {
    return (
      <svg
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.8'
        className={classes}
      >
        <path d='M12 17.5 6.5 20l1-5.5L3.5 10l5.6-.8L12 4l2.9 5.2 5.6.8-4 4.5 1 5.5L12 17.5Z' />
      </svg>
    );
  }

  if (name === "clock") {
    return (
      <svg
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.8'
        className={classes}
      >
        <circle cx='12' cy='12' r='8' />
        <path d='M12 8v5l3 2' />
      </svg>
    );
  }

  if (name === "user") {
    return (
      <svg
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.8'
        className={classes}
      >
        <circle cx='12' cy='8' r='3.5' />
        <path d='M5 19c1.6-3 4.1-4.5 7-4.5s5.4 1.5 7 4.5' />
      </svg>
    );
  }

  if (name === "help") {
    return (
      <svg
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.8'
        className={classes}
      >
        <circle cx='12' cy='12' r='8' />
        <path d='M9.7 9.4a2.4 2.4 0 0 1 4.1 1.9c0 1.4-1.8 1.9-1.8 3' />
        <path d='M12 17h.01' />
      </svg>
    );
  }

  if (name === "settings") {
    return (
      <svg
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.8'
        className={classes}
      >
        <path d='M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z' />
        <path d='M19.4 15a1 1 0 0 0 .2 1.1l.1.1a1.2 1.2 0 0 1 0 1.7l-1 1a1.2 1.2 0 0 1-1.7 0l-.1-.1a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.9V20a1.2 1.2 0 0 1-1.2 1.2h-1.4A1.2 1.2 0 0 1 10.4 20v-.2a1 1 0 0 0-.6-.9 1 1 0 0 0-1.1.2l-.1.1a1.2 1.2 0 0 1-1.7 0l-1-1a1.2 1.2 0 0 1 0-1.7l.1-.1a1 1 0 0 0 .2-1.1 1 1 0 0 0-.9-.6H4A1.2 1.2 0 0 1 2.8 13v-1.4A1.2 1.2 0 0 1 4 10.4h.2a1 1 0 0 0 .9-.6 1 1 0 0 0-.2-1.1l-.1-.1a1.2 1.2 0 0 1 0-1.7l1-1a1.2 1.2 0 0 1 1.7 0l.1.1a1 1 0 0 0 1.1.2 1 1 0 0 0 .6-.9V4A1.2 1.2 0 0 1 10.4 2.8h1.4A1.2 1.2 0 0 1 13 4v.2a1 1 0 0 0 .6.9 1 1 0 0 0 1.1-.2l.1-.1a1.2 1.2 0 0 1 1.7 0l1 1a1.2 1.2 0 0 1 0 1.7l-.1.1a1 1 0 0 0-.2 1.1 1 1 0 0 0 .9.6h.2A1.2 1.2 0 0 1 21.2 11v1.4a1.2 1.2 0 0 1-1.2 1.2h-.2a1 1 0 0 0-.4 1.4Z' />
      </svg>
    );
  }

  return (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.8'
      className={classes}
    >
      <path d='M9 6l6 6-6 6' />
    </svg>
  );
}

export default function Sidebar({ user }: SidebarProps) {
  const displayName = user?.name ?? "Alexandra";
  const email = user?.email ?? "alexandra@ui.com";
  const pathname = usePathname();

  const isActivePath = (href: string) => {
    if (!pathname) return false;
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <div className='border-b border-white/70 bg-white/75 px-4 py-3 backdrop-blur lg:hidden'>
        <nav className='mx-auto flex w-full max-w-7xl gap-2 overflow-x-auto'>
          {navItems.map((item) => {
            const isActive = isActivePath(item.href);

            return (
              <Link
                key={`mobile-nav-${item.href}`}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "border-[var(--finance-primary)] bg-[rgba(61,99,255,0.1)] text-[var(--finance-primary)]"
                    : "border-white/70 bg-white/90 text-[var(--finance-muted)] hover:border-[var(--finance-border)] hover:text-[var(--finance-ink)]"
                }`}
              >
                <SidebarIcon name={item.icon} className='h-4 w-4' />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <aside className='sticky top-0 hidden h-screen w-72 shrink-0 self-start p-4 lg:flex'>
        <div className='flex h-full w-full flex-col rounded-2xl border border-white/70 bg-white/80 p-4 backdrop-blur'>
          <Link href='/' className='inline-flex items-center gap-3'>
            <span className='grid h-10 w-10 place-items-center rounded-full bg-[linear-gradient(135deg,var(--finance-primary),#69a7ff)] text-xs font-extrabold tracking-wide text-white shadow-[0_12px_24px_rgba(61,99,255,0.35)]'>
              ST
            </span>
            <span className='text-base font-bold text-[var(--finance-ink)]'>
              Dashboard
            </span>
          </Link>

          <nav className='mt-8 space-y-2'>
            {navItems.map((item) => {
              const isActive = isActivePath(item.href);

              return (
                <Link
                  key={`desktop-${item.href}`}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold transition ${
                    isActive
                      ? "border-[var(--finance-primary)] bg-[rgba(61,99,255,0.08)] text-[var(--finance-ink)]"
                      : "border-transparent text-[var(--finance-muted)] hover:border-[var(--finance-border)] hover:bg-white hover:text-[var(--finance-ink)]"
                  }`}
                >
                  <SidebarIcon name={item.icon} className='h-4 w-4' />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className='mt-auto rounded-2xl border border-[var(--finance-border)] bg-white p-4'>
            <p className='text-xs font-semibold uppercase tracking-[0.12em] text-[var(--finance-muted)]'>
              Signed in as
            </p>
            <p className='mt-2 truncate text-sm font-semibold text-[var(--finance-ink)]'>
              {displayName}
            </p>
            <p className='truncate text-xs text-[var(--finance-muted)]'>
              {email}
            </p>
            <a
              href='/auth/logout'
              className='mt-4 inline-flex w-full items-center justify-center rounded-xl border border-[var(--finance-border)] bg-white px-3 py-2 text-sm font-semibold text-[var(--finance-ink)] transition hover:bg-slate-50'
            >
              Log out
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
