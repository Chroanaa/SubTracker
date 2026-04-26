"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
const navItems = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Integrations", href: "#integrations" },
  { label: "Alerts", href: "#alerts" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState("");

  useEffect(() => {
    const syncHash = () => {
      setActiveHash(window.location.hash);
    };

    syncHash();
    window.addEventListener("hashchange", syncHash);

    return () => {
      window.removeEventListener("hashchange", syncHash);
    };
  }, [pathname]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (href: string) => {
    if (href.startsWith("#")) {
      return pathname === "/" && activeHash === href;
    }
    return pathname === href;
  };
  return (
    <header className='sticky top-0 z-40 fade-rise'>
      <div className='mx-auto w-[min(1180px,100%)] px-3 pt-3 sm:px-4'>
        <nav className='finance-nav relative rounded-[28px] border border-white/65 px-4 py-3 shadow-[0_20px_55px_rgba(63,92,181,0.12)] md:px-6'>
          <div className='pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,0.95),rgba(255,255,255,0))]' />
          <div className='flex items-center justify-between gap-4'>
            <Link
              href='/#home'
              className='flex items-center gap-3'
              onClick={closeMenu}
            >
              <span className='grid h-10 w-10 place-items-center rounded-2xl bg-[linear-gradient(145deg,var(--finance-primary),#69a7ff)] text-[11px] font-extrabold tracking-[0.08em] text-white shadow-[0_14px_30px_rgba(61,99,255,0.3)]'>
                ST
              </span>
              <span>
                <span className='block text-sm font-semibold tracking-wide text-[var(--finance-ink)] sm:text-base'>
                  SubTracker
                </span>
                <span className='block text-[11px] uppercase tracking-[0.18em] text-[var(--finance-muted)]/80'>
                  Smart renewals
                </span>
              </span>
            </Link>

            <button
              type='button'
              aria-label={
                isMenuOpen ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={isMenuOpen}
              aria-controls='mobile-nav-menu'
              onClick={() => setIsMenuOpen((open) => !open)}
              className='inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/80 bg-white/70 text-[var(--finance-ink)] shadow-[0_10px_24px_rgba(63,92,181,0.1)] transition-colors hover:bg-white lg:hidden'
            >
              <span className='sr-only'>Toggle navigation</span>
              <span className='relative h-4 w-5'>
                <span
                  className={`absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition-transform duration-200 ${
                    isMenuOpen ? "translate-y-[7px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-[7px] h-0.5 w-5 rounded-full bg-current transition-opacity duration-200 ${
                    isMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 top-[14px] h-0.5 w-5 rounded-full bg-current transition-transform duration-200 ${
                    isMenuOpen ? "-translate-y-[7px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>

            <ul className='hidden items-center gap-2 rounded-full border border-white/70 bg-white/45 px-2 py-2 text-sm font-medium text-[var(--finance-muted)] lg:flex'>
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => setActiveHash(item.href)}
                      className={`block rounded-2xl px-3 py-2 transition-colors hover:bg-white/80 hover:text-[var(--finance-ink)] ${
                        active ? "bg-white/80 text-[var(--finance-ink)]" : ""
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className='hidden items-center gap-2 lg:flex'>
              <Link
                href='/login'
                className='inline-flex h-11 items-center rounded-full border border-white/85 bg-white/75 px-5 text-sm font-semibold text-[var(--finance-ink)] shadow-[0_10px_24px_rgba(63,92,181,0.08)] transition-all hover:-translate-y-0.5 hover:bg-white'
              >
                Log in
              </Link>
              <a
                href='#pricing'
                className='inline-flex h-11 items-center rounded-full bg-[linear-gradient(135deg,var(--finance-ink),#26345f)] px-5 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(17,21,44,0.22)] transition-all hover:-translate-y-0.5'
              >
                Start Free
              </a>
            </div>
          </div>

          <div
            id='mobile-nav-menu'
            className={`absolute right-4 top-[calc(100%+12px)] w-[min(22rem,calc(100vw-2rem))] origin-top-right transition duration-200 lg:hidden md:right-6 ${
              isMenuOpen
                ? "pointer-events-auto translate-y-0 opacity-100"
                : "pointer-events-none -translate-y-2 opacity-0"
            }`}
          >
            <div className='space-y-3 rounded-[24px] border border-white/80 bg-[linear-gradient(180deg,rgba(232,240,255,0.98),rgba(245,248,255,0.96))] p-4 shadow-[0_20px_40px_rgba(53,78,154,0.16)] backdrop-blur'>
              <ul className='space-y-1 text-sm font-medium text-[var(--finance-muted)]'>
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => {
                        setActiveHash(item.href);
                        closeMenu();
                      }}
                      className='block rounded-2xl px-3 py-2.5 transition-colors hover:bg-white/80 hover:text-[var(--finance-ink)]'
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>

              <div className='flex flex-col gap-2 border-t border-white/70 pt-3'>
                <Link
                  href='/login'
                  onClick={closeMenu}
                  className='inline-flex h-11 items-center justify-center rounded-full border border-white/90 bg-white/80 px-4 text-sm font-semibold text-[var(--finance-ink)]'
                >
                  Log in
                </Link>
                <a
                  href='#pricing'
                  onClick={closeMenu}
                  className='inline-flex h-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--finance-ink),#26345f)] px-4 text-sm font-semibold text-white'
                >
                  Start Free
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
