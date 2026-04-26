import { auth0 } from "@/lib/auth0";
import { Manrope, Space_Grotesk } from "next/font/google";
import { redirect } from "next/navigation";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const features = [
  {
    title: "Renewal Radar",
    description:
      "See every upcoming renewal in one timeline so no subscription surprises your card.",
  },
  {
    title: "Spend Guardrails",
    description:
      "Set monthly subscription caps and receive alerts before limits are breached.",
  },
  {
    title: "Workspace Reports",
    description:
      "Share clean spend reports with your team, clients, or accountant in one click.",
  },
];

const renewals = [
  { name: "Figma Pro", value: "$15", time: "Apr 14" },
  { name: "Notion Plus", value: "$8", time: "Apr 17" },
  { name: "Vercel Pro", value: "$20", time: "Apr 22" },
  { name: "Adobe CC", value: "$54", time: "Apr 25" },
];

const monthlySeries = [58, 67, 63, 70, 64, 76, 72];

const metrics = [
  { label: "Active subscriptions", value: "27" },
  { label: "Saved from cancellations", value: "$1,420" },
  { label: "Renewals this week", value: "8" },
];

export default async function HomePage() {
  const session = await auth0.getSession();

  if (session?.user) {
    redirect("/auth/pages/Dashboard");
  }

  return (
    <div className={`${manrope.className} ${spaceGrotesk.variable} pb-14 sm:pb-16`}>
      <main className='mx-auto w-[min(1120px,92%)]'>
        <section
          id='home'
          className='grid items-center gap-10 pb-14 pt-8 sm:gap-12 sm:pb-16 sm:pt-10 lg:grid-cols-[1.05fr_0.95fr]'
        >
          <div className='fade-rise'>
            <p className='inline-flex rounded-full border border-[var(--finance-border)] bg-white px-3 py-1 text-xs font-semibold tracking-wide text-[var(--finance-primary)]'>
              Subscription Tracker SaaS
            </p>
            <h1 className='mt-5 max-w-xl font-[family-name:var(--font-space-grotesk)] text-3xl font-bold leading-tight text-[var(--finance-ink)] sm:text-4xl lg:text-5xl'>
              Stop Losing Money to Forgotten Subscriptions
            </h1>
            <p className='mt-5 max-w-lg text-base leading-7 text-[var(--finance-muted)]'>
              Built for freelancers, small teams, and individuals who run on
              paid digital tools. Track recurring payments, catch waste early,
              and keep expenses visible in one calm dashboard.
            </p>

            <div className='mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap'>
              <a
                href='/login'
                className='inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--finance-primary),#5f87ff)] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(61,99,255,0.35)]'
              >
                Log In With Social
              </a>
              <a
                href='#features'
                className='inline-flex items-center justify-center rounded-full border border-[var(--finance-primary)] px-6 py-3 text-sm font-semibold text-[var(--finance-primary)]'
              >
                Explore Features
              </a>
            </div>

            <div className='mt-10 rounded-2xl border border-white/70 bg-white/60 px-4 py-5 backdrop-blur'>
              <p className='text-xs font-semibold uppercase tracking-[0.12em] text-[var(--finance-muted)]'>
                Trusted by builders and operators
              </p>
              <div className='mt-4 grid gap-3 sm:grid-cols-3'>
                {metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className='rounded-xl border border-[#e5ecff] bg-white px-3 py-3'
                  >
                    <p className='text-[11px] uppercase tracking-[0.12em] text-slate-500'>
                      {metric.label}
                    </p>
                    <p className='mt-1 text-lg font-bold text-[var(--finance-ink)]'>
                      {metric.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className='relative fade-rise stagger-1 px-1 sm:px-4 lg:px-0'>
            <div className='pointer-events-none absolute -left-8 -top-10 h-36 w-36 rounded-full bg-[radial-gradient(circle,_rgba(39,195,181,0.35)_0%,_rgba(39,195,181,0)_72%)] sm:-left-16 sm:-top-12 sm:h-44 sm:w-44' />

            <div className='relative mx-auto max-w-[470px] rounded-[30px] border border-white/70 bg-white/80 p-4 shadow-[0_24px_70px_rgba(45,68,146,0.18)] backdrop-blur'>
              <div className='finance-grid rounded-[24px] border border-[#e8edff] bg-white p-4'>
                <div className='rounded-2xl bg-[linear-gradient(130deg,#3d63ff,#5d86ff,#7aa4ff)] p-5 text-white'>
                  <p className='text-xs uppercase tracking-[0.14em] text-white/80'>
                    Monthly Subscription Spend
                  </p>
                  <p className='mt-2 text-3xl font-bold'>$286.00</p>
                  <p className='mt-1 text-xs text-white/80'>
                    - 9.8% vs last month
                  </p>
                </div>

                <div className='mt-4 grid grid-cols-2 gap-2 text-center text-[11px] text-slate-600 sm:grid-cols-4'>
                  {["Add", "Pause", "Cancel", "Export"].map((action) => (
                    <div
                      key={action}
                      className='rounded-xl border border-[#e8edff] bg-[#f8faff] px-2 py-2'
                    >
                      <div className='mx-auto mb-1 h-2 w-2 rounded-full bg-[var(--finance-primary)]' />
                      {action}
                    </div>
                  ))}
                </div>

                <div className='mt-4 space-y-3'>
                  {renewals.map((item) => (
                    <div
                      key={item.name}
                      className='flex items-center justify-between rounded-xl border border-[#edf1ff] px-3 py-2'
                    >
                      <div>
                        <p className='text-sm font-semibold text-slate-900'>
                          {item.name}
                        </p>
                        <p className='text-xs text-slate-500'>{item.time}</p>
                      </div>
                      <p className='text-sm font-semibold text-slate-700'>
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div
              className='float-soft absolute -right-2 bottom-10 hidden w-40 rounded-2xl border border-white/70 bg-white p-4 shadow-[0_16px_42px_rgba(43,66,145,0.22)] md:block lg:-right-3 lg:bottom-14 lg:w-44'
              style={{ animationDelay: "1.2s" }}
            >
              <p className='text-xs font-semibold uppercase tracking-[0.12em] text-slate-500'>
                Renewal Forecast
              </p>
              <p className='mt-2 text-2xl font-bold text-[var(--finance-ink)]'>
                $143
              </p>
              <div className='mt-3 h-2 rounded-full bg-slate-100'>
                <div className='h-full w-[62%] rounded-full bg-[linear-gradient(90deg,var(--finance-primary),#27c3b5)]' />
              </div>
            </div>

            <div
              className='float-soft absolute -left-2 top-14 hidden w-36 rounded-2xl border border-[#d9ebff] bg-white p-4 shadow-[0_16px_40px_rgba(60,110,170,0.14)] sm:block lg:-left-5 lg:top-20 lg:w-40'
              style={{ animationDelay: "0.6s" }}
            >
              <p className='text-xs font-semibold uppercase tracking-[0.12em] text-slate-500'>
                Prevented Waste
              </p>
              <p className='mt-2 text-xl font-bold text-[var(--finance-ink)]'>
                $78.00
              </p>
              <p className='mt-1 text-xs text-emerald-600'>
                2 plans cancelled in time
              </p>
            </div>
          </div>
        </section>

        <section
          id='alerts'
          className='fade-rise stagger-1 rounded-3xl border border-white/75 bg-white/65 px-5 py-7 backdrop-blur sm:px-6 sm:py-8'
        >
          <p className='inline-flex rounded-full border border-[var(--finance-border)] bg-white px-3 py-1 text-xs font-semibold tracking-wide text-[var(--finance-primary)]'>
            Renewal and Budget Alerts
          </p>
          <h2 className='mt-4 max-w-2xl font-[family-name:var(--font-space-grotesk)] text-3xl font-bold leading-tight text-[var(--finance-ink)]'>
            Catch Unused Plans Before They Charge You Again
          </h2>
          <p className='mt-3 max-w-2xl text-sm leading-7 text-[var(--finance-muted)]'>
            Receive friendly reminders before renewals, weekly spend summaries,
            and anomaly alerts when a subscription price changes unexpectedly.
          </p>
        </section>

        <section id='features' className='py-8'>
          <div className='grid gap-5 md:grid-cols-3'>
            {features.map((feature, index) => (
              <article
                key={feature.title}
                className={`fade-rise rounded-3xl border border-[#e4eafe] bg-white p-6 shadow-[0_12px_40px_rgba(52,78,156,0.08)] ${
                  index === 1 ? "stagger-1" : index === 2 ? "stagger-2" : ""
                }`}
              >
                <div className='mb-5 grid h-11 w-11 place-items-center rounded-xl bg-[linear-gradient(135deg,var(--finance-primary),#5e87ff)]'>
                  <span className='h-2.5 w-2.5 rounded-full bg-white' />
                </div>
                <h3 className='font-[family-name:var(--font-space-grotesk)] text-xl font-semibold text-[var(--finance-ink)]'>
                  {feature.title}
                </h3>
                <p className='mt-3 text-sm leading-7 text-[var(--finance-muted)]'>
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          id='pricing'
          className='fade-rise stagger-2 mt-2 grid gap-6 rounded-3xl border border-[#dde7ff] bg-[linear-gradient(145deg,#ffffff,#edf3ff)] p-5 sm:p-6 md:grid-cols-[1.1fr_0.9fr]'
        >
          <div>
            <p className='inline-flex rounded-full border border-[var(--finance-border)] bg-white px-3 py-1 text-xs font-semibold tracking-wide text-[var(--finance-primary)]'>
              Transparent Pricing
            </p>
            <h3 className='mt-4 font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-[var(--finance-ink)]'>
              Start free, then scale when your subscription stack grows.
            </h3>
            <p className='mt-3 max-w-xl text-sm leading-7 text-[var(--finance-muted)]'>
              Personal users can track core subscriptions at no cost. Teams can
              unlock shared dashboards, approvals, and detailed export history.
            </p>
            <a
              href='/login'
              className='mt-6 inline-flex rounded-full bg-[var(--finance-ink)] px-5 py-2.5 text-sm font-semibold text-white'
            >
              Get Started
            </a>
          </div>

          <div className='rounded-2xl border border-white/70 bg-white p-5 shadow-[0_12px_35px_rgba(53,78,154,0.1)]'>
            <p className='text-xs font-semibold uppercase tracking-[0.12em] text-slate-500'>
              Last 7 Months Spend
            </p>
            <div className='mt-4 flex h-32 items-end gap-2 sm:h-40 sm:gap-3'>
              {monthlySeries.map((value, i) => (
                <div
                  key={value + i}
                  className='flex flex-1 flex-col items-center gap-2'
                >
                  <div
                    className='w-full rounded-t-md bg-[linear-gradient(180deg,#7ea3ff,#3d63ff)]'
                    style={{ height: `${value}%` }}
                  />
                </div>
              ))}
            </div>
            <p className='mt-4 text-sm text-[var(--finance-muted)]'>
              Usage trends help you keep recurring software spend predictable.
            </p>
          </div>
        </section>

        <section id='integrations' className='mt-8 grid gap-5 md:grid-cols-2'>
          <article className='fade-rise rounded-3xl border border-[#e7edff] bg-white p-6'>
            <p className='text-xs font-semibold uppercase tracking-[0.12em] text-slate-500'>
              Integrations
            </p>
            <h4 className='mt-3 font-[family-name:var(--font-space-grotesk)] text-xl font-semibold text-[var(--finance-ink)]'>
              Connect Stripe, Notion, Slack, and Google Calendar
            </h4>
            <p className='mt-3 text-sm leading-7 text-[var(--finance-muted)]'>
              Keep your subscription data synced and route alerts where your
              team already works.
            </p>
          </article>

          <article
            id='faq'
            className='fade-rise stagger-1 rounded-3xl border border-[#dce8ff] bg-[linear-gradient(145deg,#f8fbff,#eef4ff)] p-6'
          >
            <p className='text-xs font-semibold uppercase tracking-[0.12em] text-slate-500'>
              FAQ
            </p>
            <h4 className='mt-3 font-[family-name:var(--font-space-grotesk)] text-xl font-semibold text-[var(--finance-ink)]'>
              &quot;Can I track personal and team subscriptions in one
              place?&quot;
            </h4>
            <p className='mt-3 text-sm text-[var(--finance-muted)]'>
              Yes. Create separate workspaces and switch between personal and
              team views instantly.
            </p>
          </article>
        </section>
      </main>
    </div>
  );
}
