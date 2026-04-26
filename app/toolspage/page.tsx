import { auth0 } from "@/lib/auth0";
import Link from "next/link";
import { redirect } from "next/navigation";

const budgetCards = [
  { label: "Monthly spend", value: "$286", note: "Down 9.8% vs last month" },
  { label: "At-risk renewals", value: "4", note: "Plans nearing usage review" },
  { label: "Potential savings", value: "$78", note: "From low-value subscriptions" },
];

const categories = [
  { label: "Design", amount: "$82", width: "72%" },
  { label: "Productivity", amount: "$64", width: "58%" },
  { label: "Hosting", amount: "$48", width: "42%" },
  { label: "AI Tools", amount: "$30", width: "28%" },
];

export default async function ToolsPage() {
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
              Analytics
            </p>
            <h1 className='mt-2 text-2xl font-bold text-[var(--finance-ink)] sm:text-3xl'>
              See where subscription spend is really going
            </h1>
            <p className='mt-3 max-w-2xl text-sm leading-7 text-[var(--finance-muted)]'>
              This page is tuned for mobile-first scanning, with stacked cards
              and charts that stay readable from phone to desktop.
            </p>
          </div>

          <Link
            href='/auth/pages/servicepage'
            className='inline-flex items-center justify-center rounded-full border border-[var(--finance-border)] bg-white px-5 py-2.5 text-sm font-semibold text-[var(--finance-ink)]'
          >
            View subscriptions
          </Link>
        </div>
      </header>

      <section className='mt-6 grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]'>
        {budgetCards.map((card) => (
          <article
            key={card.label}
            className='rounded-2xl border border-[#e4eafe] bg-white p-5 shadow-[0_12px_32px_rgba(53,78,154,0.08)]'
          >
            <p className='text-xs font-semibold uppercase tracking-[0.12em] text-slate-500'>
              {card.label}
            </p>
            <p className='mt-2 text-2xl font-bold text-[var(--finance-ink)]'>
              {card.value}
            </p>
            <p className='mt-1 text-sm text-[var(--finance-muted)]'>
              {card.note}
            </p>
          </article>
        ))}
      </section>

      <section className='mt-6 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]'>
        <article className='rounded-3xl border border-white/75 bg-white/85 p-4 shadow-[0_16px_42px_rgba(53,78,154,0.1)] sm:p-6'>
          <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
            <h2 className='text-lg font-semibold text-[var(--finance-ink)] sm:text-xl'>
              Category pressure
            </h2>
            <span className='text-xs font-semibold uppercase tracking-[0.1em] text-[var(--finance-primary)]'>
              Monthly equivalent
            </span>
          </div>

          <div className='mt-5 space-y-4'>
            {categories.map((category) => (
              <div key={category.label}>
                <div className='flex items-center justify-between gap-3'>
                  <p className='text-sm font-semibold text-[var(--finance-ink)]'>
                    {category.label}
                  </p>
                  <p className='text-sm text-[var(--finance-muted)]'>
                    {category.amount}
                  </p>
                </div>
                <div className='mt-2 h-3 rounded-full bg-[#e8efff]'>
                  <div
                    className='h-full rounded-full bg-[linear-gradient(90deg,var(--finance-primary),#27c3b5)]'
                    style={{ width: category.width }}
                  />
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className='rounded-3xl border border-white/75 bg-white/85 p-4 shadow-[0_16px_42px_rgba(53,78,154,0.1)] sm:p-6'>
          <h2 className='text-lg font-semibold text-[var(--finance-ink)] sm:text-xl'>
            Action checklist
          </h2>
          <div className='mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-1'>
            {[
              "Cancel duplicate design licenses before the next billing cycle.",
              "Move annual storage plans into a separate review bucket.",
              "Send a weekly renewal digest to your workspace channel.",
              "Flag tools with low usage for next month’s planning review.",
            ].map((item) => (
              <div
                key={item}
                className='rounded-2xl border border-[#e8edff] bg-[#f8faff] px-4 py-4 text-sm leading-6 text-[var(--finance-muted)]'
              >
                {item}
              </div>
            ))}
          </div>
        </article>
      </section>
    </section>
  );
}
