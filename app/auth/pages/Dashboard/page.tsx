import { auth0 } from "@/lib/auth0";
import Link from "next/link";
import { redirect } from "next/navigation";

type Subscription = {
  id: number;
  name: string;
  cost: number;
  billingCycle: "Monthly" | "Yearly";
  category: string;
  nextBillingInDays: number;
  status: "Active" | "Cancelled";
};

const subscriptions: Subscription[] = [
  {
    id: 1,
    name: "Figma Pro",
    cost: 15,
    billingCycle: "Monthly",
    category: "Design Tools",
    nextBillingInDays: 2,
    status: "Active",
  },
  {
    id: 2,
    name: "Notion Plus",
    cost: 8,
    billingCycle: "Monthly",
    category: "Productivity",
    nextBillingInDays: 5,
    status: "Active",
  },
  {
    id: 3,
    name: "Vercel Pro",
    cost: 20,
    billingCycle: "Monthly",
    category: "Hosting & Dev",
    nextBillingInDays: 8,
    status: "Active",
  },
  {
    id: 4,
    name: "Adobe Creative Cloud",
    cost: 54,
    billingCycle: "Monthly",
    category: "Design Tools",
    nextBillingInDays: 4,
    status: "Active",
  },
  {
    id: 5,
    name: "Netflix Premium",
    cost: 23,
    billingCycle: "Monthly",
    category: "Entertainment",
    nextBillingInDays: 6,
    status: "Active",
  },
  {
    id: 6,
    name: "ChatGPT Team",
    cost: 30,
    billingCycle: "Monthly",
    category: "AI Tools",
    nextBillingInDays: 10,
    status: "Active",
  },
  {
    id: 7,
    name: "Dropbox Plus",
    cost: 120,
    billingCycle: "Yearly",
    category: "Storage",
    nextBillingInDays: 25,
    status: "Cancelled",
  },
  {
    id: 8,
    name: "Canva Pro",
    cost: 13,
    billingCycle: "Monthly",
    category: "Design Tools",
    nextBillingInDays: 3,
    status: "Active",
  },
];

const monthlyTrend = [
  { month: "Nov", spend: 262 },
  { month: "Dec", spend: 274 },
  { month: "Jan", spend: 289 },
  { month: "Feb", spend: 301 },
  { month: "Mar", spend: 294 },
  { month: "Apr", spend: 286 },
];

const chartColors = [
  "#3d63ff",
  "#27c3b5",
  "#ff8a4c",
  "#7b6dff",
  "#f2c94c",
  "#5ca0ff",
];

const toMonthlyEquivalent = (subscription: Subscription) => {
  return subscription.billingCycle === "Monthly"
    ? subscription.cost
    : subscription.cost / 12;
};

const toYearlyEquivalent = (subscription: Subscription) => {
  return subscription.billingCycle === "Yearly"
    ? subscription.cost
    : subscription.cost * 12;
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
};

const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export default async function DashboardPage() {
  const session = await auth0.getSession();

  if (!session?.user) {
    redirect("/login");
  }

  const displayName = session.user.name ?? session.user.email ?? "there";
  const now = new Date();

  const subscriptionsWithDates = subscriptions.map((subscription) => {
    const nextBillingDate = new Date(now);
    nextBillingDate.setDate(now.getDate() + subscription.nextBillingInDays);

    return {
      ...subscription,
      nextBillingDate,
      monthlyEquivalent: toMonthlyEquivalent(subscription),
      yearlyEquivalent: toYearlyEquivalent(subscription),
    };
  });

  const activeSubscriptions = subscriptionsWithDates.filter(
    (subscription) => subscription.status === "Active",
  );

  const monthlySpend = activeSubscriptions.reduce(
    (total, subscription) => total + subscription.monthlyEquivalent,
    0,
  );

  const yearlySpend = activeSubscriptions.reduce(
    (total, subscription) => total + subscription.yearlyEquivalent,
    0,
  );

  const upcomingRenewals = activeSubscriptions
    .filter((subscription) => subscription.nextBillingInDays <= 7)
    .sort((a, b) => a.nextBillingDate.getTime() - b.nextBillingDate.getTime());

  const categoryTotals = activeSubscriptions.reduce<Record<string, number>>(
    (totals, subscription) => {
      totals[subscription.category] =
        (totals[subscription.category] ?? 0) + subscription.monthlyEquivalent;
      return totals;
    },
    {},
  );

  const categoryDataRaw = Object.entries(categoryTotals).map(
    ([category, amount], index) => ({
      category,
      amount,
      color: chartColors[index % chartColors.length],
    }),
  );

  const totalCategoryAmount = categoryDataRaw.reduce(
    (total, item) => total + item.amount,
    0,
  );

  let currentPercent = 0;
  const categoryData = categoryDataRaw.map((item) => {
    const percent =
      totalCategoryAmount > 0 ? (item.amount / totalCategoryAmount) * 100 : 0;
    const start = currentPercent;
    const end = start + percent;
    currentPercent = end;

    return {
      ...item,
      percent,
      start,
      end,
    };
  });

  const pieGradient = `conic-gradient(${categoryData
    .map((item) => `${item.color} ${item.start}% ${item.end}%`)
    .join(", ")})`;

  const maxTrendSpend = Math.max(...monthlyTrend.map((entry) => entry.spend));
  const trendPoints = monthlyTrend
    .map((entry, index) => {
      const x = (index / (monthlyTrend.length - 1)) * 100;
      const y = 100 - (entry.spend / maxTrendSpend) * 100;
      return `${x},${y}`;
    })
    .join(" ");

  const summaryCards = [
    {
      label: "Monthly Spend",
      value: formatCurrency(monthlySpend),
      caption: "Current active subscription run rate",
    },
    {
      label: "Yearly Spend",
      value: formatCurrency(yearlySpend),
      caption: "Projected annual cost across active plans",
    },
    {
      label: "Active Subscriptions",
      value: String(activeSubscriptions.length),
      caption: "Plans currently billed to your account",
    },
    {
      label: "Upcoming Renewals",
      value: String(upcomingRenewals.length),
      caption: "Renewing in the next 7 days",
    },
  ];
  const metricLabelClassName =
    "text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500";

  return (
    <section className='mx-auto w-full max-w-7xl fade-rise'>
      <header className='rounded-3xl border border-white/75 bg-white/80 p-4 shadow-[0_18px_50px_rgba(53,78,154,0.12)] backdrop-blur sm:p-6'>
        <p className='text-xs font-semibold uppercase tracking-[0.12em] text-[var(--finance-primary)]'>
          Dashboard
        </p>
        <h1 className='mt-2 text-2xl font-bold text-[var(--finance-ink)] sm:text-3xl'>
          Welcome back, {displayName}
        </h1>
        <p className='mt-3 max-w-2xl text-sm leading-7 text-[var(--finance-muted)]'>
          Track renewals, spot unnecessary costs, and manage your entire
          subscription stack from one recruiter-ready view.
        </p>
      </header>

      <section className='mt-6 grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]'>
        {summaryCards.map((card) => (
          <article
            key={card.label}
            className='rounded-2xl border border-[#e4eafe] bg-white p-4 shadow-[0_12px_32px_rgba(53,78,154,0.08)] sm:p-5'
          >
            <p className='text-xs font-semibold uppercase tracking-[0.12em] text-slate-500'>
              {card.label}
            </p>
            <p className='mt-2 text-2xl font-bold text-[var(--finance-ink)]'>
              {card.value}
            </p>
            <p className='mt-1 text-xs text-[var(--finance-muted)]'>
              {card.caption}
            </p>
          </article>
        ))}
      </section>

      <section className='mt-6 rounded-3xl border border-white/75 bg-white/85 p-4 shadow-[0_16px_42px_rgba(53,78,154,0.1)] sm:p-6'>
        <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
          <h2 className='text-lg font-semibold text-[var(--finance-ink)] sm:text-xl'>
            Upcoming Renewals
          </h2>
          <Link
            href='/toolspage'
            className='text-xs font-semibold uppercase tracking-[0.1em] text-[var(--finance-primary)]'
          >
            See all renewals
          </Link>
        </div>

        <div className='mt-4 space-y-3'>
          <div className='hidden rounded-2xl border border-[#ebefff] bg-[#f8faff] px-4 py-3 md:grid md:grid-cols-[minmax(0,1.5fr)_minmax(110px,0.55fr)_minmax(140px,0.75fr)_auto] md:items-center md:gap-4'>
            <p className={metricLabelClassName}>Service</p>
            <p className={metricLabelClassName}>Price</p>
            <p className={metricLabelClassName}>Renewal Date</p>
            <p className={`${metricLabelClassName} text-right`}>Actions</p>
          </div>

          {upcomingRenewals.map((item) => (
            <article
              key={item.id}
              className='grid gap-4 rounded-2xl border border-[#e8edff] bg-white p-4 shadow-[0_10px_24px_rgba(53,78,154,0.06)] md:grid-cols-[minmax(0,1.5fr)_minmax(110px,0.55fr)_minmax(140px,0.75fr)_auto] md:items-center'
            >
              <div className='min-w-0'>
                <p className='text-sm font-semibold text-[var(--finance-ink)]'>
                  {item.name}
                </p>
                <p className='mt-1 text-xs text-[var(--finance-muted)]'>
                  Next charge in {item.nextBillingInDays} days
                </p>
              </div>

              <div>
                <p className={`${metricLabelClassName} md:hidden`}>Price</p>
                <p className='mt-1 text-sm font-semibold text-[var(--finance-ink)] md:mt-0'>
                  {formatCurrency(item.cost)}
                </p>
              </div>

              <div>
                <p className={`${metricLabelClassName} md:hidden`}>
                  Renewal Date
                </p>
                <p className='mt-1 text-sm text-[var(--finance-muted)] md:mt-0'>
                  {formatDate(item.nextBillingDate)}
                </p>
              </div>

              <div className='flex flex-wrap gap-2 md:justify-end'>
                <button
                  type='button'
                  className='whitespace-nowrap rounded-full border border-[#ffd6c3] bg-[#fff3ed] px-3 py-1 text-xs font-semibold text-[#b45328]'
                >
                  Cancel
                </button>
                <Link
                  href='/auth/pages/servicepage'
                  className='whitespace-nowrap rounded-full border border-[#dce6ff] bg-[#f6f9ff] px-3 py-1 text-xs font-semibold text-[var(--finance-primary)]'
                >
                  View
                </Link>
              </div>
            </article>
          ))}

          {upcomingRenewals.length === 0 && (
            <div className='rounded-2xl border border-[#e8edff] bg-[#f8faff] p-4 shadow-[0_10px_24px_rgba(53,78,154,0.06)]'>
              <p className='text-sm text-[var(--finance-muted)]'>
                No renewals in the next 7 days.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className='mt-6 grid gap-6 lg:grid-cols-[1fr_1.2fr]'>
        <article className='rounded-3xl border border-white/75 bg-white/85 p-4 shadow-[0_16px_42px_rgba(53,78,154,0.1)] sm:p-6'>
          <h2 className='text-lg font-semibold text-[var(--finance-ink)] sm:text-xl'>
            Spending Analytics
          </h2>
          <p className='mt-1 text-sm text-[var(--finance-muted)]'>
            Spend by category (monthly equivalent)
          </p>

          <div className='mt-5 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6'>
            <div className='relative mx-auto h-36 w-36 shrink-0 rounded-full bg-slate-100 p-3 sm:mx-0 sm:h-44 sm:w-44'>
              <div
                className='h-full w-full rounded-full'
                style={{ background: pieGradient }}
              />
              <div className='absolute inset-0 m-auto h-14 w-14 rounded-full bg-white shadow-[0_8px_20px_rgba(53,78,154,0.12)] sm:h-16 sm:w-16' />
            </div>

            <div className='flex-1 space-y-3'>
              {categoryData.map((entry) => (
                <div
                  key={entry.category}
                  className='flex items-center justify-between gap-3'
                >
                  <div className='flex items-center gap-2'>
                    <span
                      className='h-3 w-3 rounded-full'
                      style={{ backgroundColor: entry.color }}
                    />
                    <span className='text-xs text-[var(--finance-ink)] sm:text-sm'>
                      {entry.category}
                    </span>
                  </div>
                  <div className='text-right'>
                    <p className='text-xs font-semibold text-[var(--finance-ink)] sm:text-sm'>
                      {formatCurrency(entry.amount)}
                    </p>
                    <p className='text-xs text-[var(--finance-muted)]'>
                      {entry.percent.toFixed(0)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </article>

        <article className='rounded-3xl border border-white/75 bg-white/85 p-4 shadow-[0_16px_42px_rgba(53,78,154,0.1)] sm:p-6'>
          <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
            <h2 className='text-lg font-semibold text-[var(--finance-ink)] sm:text-xl'>
              Monthly Spending Trend
            </h2>
            <span className='text-xs font-semibold uppercase tracking-[0.1em] text-[var(--finance-primary)]'>
              Last 6 months
            </span>
          </div>

          <div className='mt-5 rounded-2xl border border-[#ebefff] bg-[#f8faff] p-4'>
            <div className='h-44 w-full sm:h-52'>
              <svg
                viewBox='0 0 100 100'
                preserveAspectRatio='none'
                className='h-full w-full'
              >
                <polyline
                  fill='none'
                  stroke='rgba(61,99,255,0.2)'
                  strokeWidth='1'
                  points='0,100 100,100'
                />
                <polyline
                  fill='none'
                  stroke='var(--finance-primary)'
                  strokeWidth='2.8'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  points={trendPoints}
                />
              </svg>
            </div>

            <div className='mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6'>
              {monthlyTrend.map((entry) => {
                const barHeight = (entry.spend / maxTrendSpend) * 100;

                return (
                  <div key={entry.month} className='text-center'>
                    <div className='mx-auto flex h-20 items-end'>
                      <div
                        className='w-full rounded-t-md bg-[linear-gradient(180deg,#7ca0ff,#3d63ff)]'
                        style={{ height: `${Math.max(14, barHeight)}%` }}
                      />
                    </div>
                    <p className='mt-2 text-xs font-semibold text-[var(--finance-muted)]'>
                      {entry.month}
                    </p>
                    <p className='text-[11px] text-slate-500'>
                      {formatCurrency(entry.spend)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </article>
      </section>

      <section className='mt-6 rounded-3xl border border-white/75 bg-white/85 p-4 shadow-[0_16px_42px_rgba(53,78,154,0.1)] sm:p-6'>
        <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
          <h2 className='text-lg font-semibold text-[var(--finance-ink)] sm:text-xl'>
            Subscription List
          </h2>
          <Link
            href='/toolspage'
            className='text-xs font-semibold uppercase tracking-[0.1em] text-[var(--finance-primary)]'
          >
            Add subscription
          </Link>
        </div>

        <div className='mt-4 space-y-3'>
          <div className='hidden rounded-2xl border border-[#ebefff] bg-[#f8faff] px-4 py-3 xl:grid xl:grid-cols-[minmax(0,1.5fr)_minmax(110px,0.6fr)_minmax(120px,0.7fr)_minmax(140px,0.85fr)_minmax(150px,0.9fr)_minmax(110px,0.65fr)_auto] xl:items-center xl:gap-4'>
            <p className={metricLabelClassName}>Name</p>
            <p className={metricLabelClassName}>Cost</p>
            <p className={metricLabelClassName}>Billing Cycle</p>
            <p className={metricLabelClassName}>Category</p>
            <p className={metricLabelClassName}>Next Billing</p>
            <p className={metricLabelClassName}>Status</p>
            <p className={`${metricLabelClassName} text-right`}>Actions</p>
          </div>

          {subscriptionsWithDates.map((item) => (
            <article
              key={item.id}
              className='grid gap-4 rounded-2xl border border-[#e8edff] bg-white p-4 shadow-[0_10px_24px_rgba(53,78,154,0.06)] xl:grid-cols-[minmax(0,1.5fr)_minmax(110px,0.6fr)_minmax(120px,0.7fr)_minmax(140px,0.85fr)_minmax(150px,0.9fr)_minmax(110px,0.65fr)_auto] xl:items-center'
            >
              <div className='min-w-0'>
                <p className='truncate text-sm font-semibold text-[var(--finance-ink)]'>
                  {item.name}
                </p>
                <p className='mt-1 text-xs text-[var(--finance-muted)] xl:hidden'>
                  {item.category}
                </p>
              </div>

              <div>
                <p className={`${metricLabelClassName} xl:hidden`}>Cost</p>
                <p className='mt-1 text-sm text-[var(--finance-ink)] xl:mt-0'>
                  {formatCurrency(item.cost)}
                </p>
              </div>

              <div>
                <p className={`${metricLabelClassName} xl:hidden`}>
                  Billing Cycle
                </p>
                <p className='mt-1 text-sm text-[var(--finance-muted)] xl:mt-0'>
                  {item.billingCycle}
                </p>
              </div>

              <div className='hidden xl:block'>
                <p className='text-sm text-[var(--finance-muted)]'>
                  {item.category}
                </p>
              </div>

              <div>
                <p className={`${metricLabelClassName} xl:hidden`}>
                  Next Billing
                </p>
                <p className='mt-1 text-sm text-[var(--finance-muted)] xl:mt-0'>
                  {formatDate(item.nextBillingDate)}
                </p>
              </div>

              <div>
                <p className={`${metricLabelClassName} xl:hidden`}>Status</p>
                <span
                  className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold xl:mt-0 ${
                    item.status === "Active"
                      ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
                      : "border border-slate-200 bg-slate-100 text-slate-600"
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <div className='flex flex-wrap gap-2 xl:justify-end'>
                <button
                  type='button'
                  className='whitespace-nowrap rounded-full border border-[#dce6ff] bg-[#f6f9ff] px-3 py-1 text-xs font-semibold text-[var(--finance-primary)]'
                >
                  Edit
                </button>
                <button
                  type='button'
                  className='whitespace-nowrap rounded-full border border-[#ffd6c3] bg-[#fff3ed] px-3 py-1 text-xs font-semibold text-[#b45328]'
                >
                  Delete
                </button>
                <button
                  type='button'
                  disabled={item.status === "Cancelled"}
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    item.status === "Cancelled"
                      ? "cursor-not-allowed border border-slate-200 bg-slate-100 text-slate-400"
                      : "border border-amber-200 bg-amber-50 text-amber-700"
                  }`}
                >
                  Mark as cancelled
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
