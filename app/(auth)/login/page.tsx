import { auth0 } from "@/lib/auth0";
import Link from "next/link";
import { redirect } from "next/navigation";

async function LoginPage() {
  const session = await auth0.getSession();
  const appBaseUrl = process.env.APP_BASE_URL ?? "http://localhost:3000";
  const callbackUrl = `${appBaseUrl}/auth/callback`;
  const googleLoginQuery = new URLSearchParams({
    connection: "google-oauth2",
    returnTo: "/auth/pages/Dashboard",
    redirect_uri: callbackUrl,
  }).toString();
  const facebookLoginQuery = new URLSearchParams({
    connection: "facebook",
    returnTo: "/auth/pages/Dashboard",
    redirect_uri: callbackUrl,
  }).toString();

  if (session?.user) {
    redirect("/auth/pages/Dashboard");
  }

  return (
    <main className='flex min-h-[calc(100vh-5.5rem)] items-center justify-center px-4 py-8 sm:px-6 sm:py-10'>
      <section className='w-full max-w-md rounded-3xl border border-white/70 bg-white/85 p-6 shadow-[0_24px_60px_rgba(42,65,139,0.15)] backdrop-blur sm:p-8'>
        <Link
          href='/'
          className='inline-flex items-center gap-2 rounded-full border border-[var(--finance-border)] bg-white px-3 py-1 text-xs font-semibold tracking-wide text-[var(--finance-primary)]'
        >
          Back to Home
        </Link>

        <h1 className='mt-5 font-[family-name:var(--font-space-grotesk)] text-2xl font-bold leading-tight text-[var(--finance-ink)] sm:text-3xl'>
          Sign in to Subscription Tracker
        </h1>
        <p className='mt-2 text-sm leading-7 text-[var(--finance-muted)]'>
          Use one of the social providers below to access your workspace.
        </p>

        <div className='mt-7 space-y-3'>
          <a
            href={`/auth/login?${googleLoginQuery}`}
            className='flex w-full items-center justify-center gap-3 rounded-2xl border border-[#dce6ff] bg-white px-4 py-3 text-center text-sm font-semibold text-slate-900 transition hover:bg-slate-50 sm:px-5'
          >
            <span className='grid h-6 w-6 place-items-center rounded-full border border-slate-200 text-xs font-bold text-slate-700'>
              G
            </span>
            Continue with Google
          </a>

          <a
            href={`/auth/login?${facebookLoginQuery}`}
            className='flex w-full items-center justify-center gap-3 rounded-2xl border border-[#dce6ff] bg-white px-4 py-3 text-center text-sm font-semibold text-slate-900 transition hover:bg-slate-50 sm:px-5'
          >
            <span className='grid h-6 w-6 place-items-center rounded-full border border-slate-200 text-xs font-bold text-slate-700'>
              f
            </span>
            Continue with Facebook
          </a>
        </div>
      </section>
    </main>
  );
}

export default LoginPage;
