// user-dashboard/layout.tsx

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ReactNode } from "react";

export default function UserDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
