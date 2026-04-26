import { auth0 } from "@/lib/auth0";
import Link from "next/link";
import { redirect } from "next/navigation";

const subscriptions = [
  {
    name: "Figma Pro",
    category: "Design Tools",
    status: "Active",
    billing: "Monthly",
    amount: "$15",
    nextCharge: "Apr 28",
  },
  {
    name: "Notion Plus",
    category: "Productivity",
    status: "Active",
    billing: "Monthly",
    amount: "$8",
    nextCharge: "May 1",
  },
  {
    name: "Adobe Creative Cloud",
    category: "Design Tools",
    status: "Review",
    billing: "Monthly",
    amount: "$54",
    nextCharge: "May 2",
  },
  {
    name: "Dropbox Plus",
    category: "Storage",
    status: "Paused",
    billing: "Yearly",
    amount: "$120",
    nextCharge: "May 9",
  },
];

const statusStyles: Record<string, string> = {
  Active: "border border-emerald-200 bg-emerald-50 text-emerald-700",
  Review: "border border-amber-200 bg-amber-50 text-amber-700",
  Paused: "border border-slate-200 bg-slate-100 text-slate-600",
};

export default async function ServicePage() {
  const session = await auth0.getSession();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <section className='mx-auto w-full max-w-7xl fade-rise'>
      <header className='rounded-3xl border border-white/75 bg-white/80 p-4 shadow-[0_18px_50px_rgba(53,78,154,0.12)] backdrop-blur sm:p-6'>
        <div className='flex flex-col gap-3 md:flex-row md:items-end md:justify-between'>
          <div>
            <p className='text-xs font-semibold uppercase tracking-[0.12em] text-[var(--finance-primary)]'>
              Subscriptions
            </p>
            <h1 className='mt-2 text-2xl font-bold text-[var(--finance-ink)] sm:text-3xl'>
              Keep every recurring tool organized
            </h1>
            <p className='mt-3 max-w-2xl text-sm leading-7 text-[var(--finance-muted)]'>
              Review statuses, next charges, and billing cycles from one place
              without losing context on smaller screens.
            </p>
          </div>

          <Link
            href='/toolspage'
            className='inline-flex items-center justify-center rounded-full bg-[var(--finance-ink)] px-5 py-2.5 text-sm font-semibold text-white'
          >
            Open analytics
          </Link>
        </div>
      </header>

      <section className='mt-6 grid gap-4 md:grid-cols-3'>
        {[
          {
            label: "Tracked plans",
            value: "24",
            note: "Across personal and team workspaces",
          },
          {
            label: "Needs review",
            value: "3",
            note: "Price changed or usage looks low",
          },
          {
            label: "Upcoming this week",
            value: "6",
            note: "Renewals requiring close attention",
          },
        ].map((metric) => (
          <article
            key={metric.label}
            className='rounded-2xl border border-[#e4eafe] bg-white p-5 shadow-[0_12px_32px_rgba(53,78,154,0.08)]'
          >
            <p className='text-xs font-semibold uppercase tracking-[0.12em] text-slate-500'>
              {metric.label}
            </p>
            <p className='mt-2 text-2xl font-bold text-[var(--finance-ink)]'>
              {metric.value}
            </p>
            <p className='mt-1 text-sm text-[var(--finance-muted)]'>
              {metric.note}
            </p>
          </article>
        ))}
      </section>

      <section className='mt-6 rounded-3xl border border-white/75 bg-white/85 p-4 shadow-[0_16px_42px_rgba(53,78,154,0.1)] sm:p-6'>
        <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
          <h2 className='text-lg font-semibold text-[var(--finance-ink)] sm:text-xl'>
            Active subscription list
          </h2>
          <span className='text-xs font-semibold uppercase tracking-[0.1em] text-[var(--finance-primary)]'>
            Responsive detail cards
          </span>
        </div>

        <div className='mt-4 space-y-3'>
          {subscriptions.map((subscription) => (
            <article
              key={subscription.name}
              className='rounded-2xl border border-[#e8edff] bg-white p-4 shadow-[0_10px_24px_rgba(53,78,154,0.06)]'
            >
              <div className='flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between'>
                <div className='min-w-0'>
                  <div className='flex flex-wrap items-center gap-2'>
                    <h3 className='text-base font-semibold text-[var(--finance-ink)]'>
                      {subscription.name}
                    </h3>
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[subscription.status]}`}
                    >
                      {subscription.status}
                    </span>
                  </div>
                  <p className='mt-1 text-sm text-[var(--finance-muted)]'>
                    {subscription.category}
                  </p>
                </div>

                <div className='grid gap-3 sm:grid-cols-3 lg:min-w-[420px] lg:gap-4'>
                  <div className='rounded-2xl bg-[#f8faff] px-3 py-3'>
                    <p className='text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500'>
                      Billing
                    </p>
                    <p className='mt-1 text-sm font-semibold text-[var(--finance-ink)]'>
                      {subscription.billing}
                    </p>
                  </div>
                  <div className='rounded-2xl bg-[#f8faff] px-3 py-3'>
                    <p className='text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500'>
                      Amount
                    </p>
                    <p className='mt-1 text-sm font-semibold text-[var(--finance-ink)]'>
                      {subscription.amount}
                    </p>
                  </div>
                  <div className='rounded-2xl bg-[#f8faff] px-3 py-3'>
                    <p className='text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500'>
                      Next charge
                    </p>
                    <p className='mt-1 text-sm font-semibold text-[var(--finance-ink)]'>
                      {subscription.nextCharge}
                    </p>
                  </div>
                </div>
              </div>

              <div className='mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap'>
                <button
                  type='button'
                  className='inline-flex min-h-10 items-center justify-center rounded-full border border-[#dce6ff] bg-[#f6f9ff] px-4 text-sm font-semibold text-[var(--finance-primary)]'
                >
                  Edit details
                </button>
                <button
                  type='button'
                  className='inline-flex min-h-10 items-center justify-center rounded-full border border-[#ffd6c3] bg-[#fff3ed] px-4 text-sm font-semibold text-[#b45328]'
                >
                  Pause renewal
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
