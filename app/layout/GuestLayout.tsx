import Navbar from "../components/Navbar";
type GuestLayoutProps = {
  children: React.ReactNode;
  isLoggedIn: boolean;
};

export default function GuestLayout({
  children,
  isLoggedIn,
}: GuestLayoutProps) {
  return (
    <div className='finance-shell min-h-screen'>
      {!isLoggedIn && <Navbar />}
      {children}
    </div>
  );
}
