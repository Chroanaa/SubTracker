const navItems = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Integrations", href: "#integrations" },
  { label: "Alerts", href: "#alerts" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  return (
    <header className='sticky top-4 z-40 mx-auto w-[min(1120px,92%)] fade-rise'>
      <nav className='finance-nav flex items-center justify-between gap-4 rounded-2xl border border-white/70 px-4 py-3 md:px-6'>
        <a href='#home' className='flex items-center gap-3'>
          <span className='grid h-9 w-9 place-items-center rounded-full bg-[linear-gradient(135deg,var(--finance-primary),#69a7ff)] text-xs font-extrabold tracking-wide text-white shadow-[0_12px_24px_rgba(61,99,255,0.35)]'>
            ST
          </span>
          <span className='text-sm font-semibold tracking-wide text-[var(--finance-ink)] sm:text-base'>
            SubTracker
          </span>
        </a>

        <ul className='hidden items-center gap-6 text-sm font-medium text-[var(--finance-muted)] lg:flex'>
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className='transition-colors hover:text-[var(--finance-ink)]'
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className='flex items-center gap-2'>
          <a
            href='/login'
            className='hidden h-10 items-center rounded-full border border-[var(--finance-border)] bg-white px-4 text-sm font-semibold text-[var(--finance-ink)] transition-transform hover:-translate-y-0.5 sm:inline-flex'
          >
            Log in
          </a>
          <a
            href='#pricing'
            className='inline-flex h-10 items-center rounded-full bg-[var(--finance-ink)] px-4 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5'
          >
            Start Free
          </a>
        </div>
      </nav>
    </header>
  );
}
