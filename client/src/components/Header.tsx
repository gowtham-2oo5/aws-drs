"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const router = useRouter();

  const handleLogout = () => {
    // Clear all items from sessionStorage
    sessionStorage.clear();
    // Navigate to the home page
    router.push("/");
  };

  return (
    <header className="px-4 lg:px-6 h-16 flex items-center border-b">
      <Link className="flex items-center justify-center" href="/">
        <Search className="h-6 w-6 mr-2" />
        <span className="font-bold">DocReviewGen</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Button variant="ghost" className="text-sm font-medium" asChild>
          <Link href="/dashboard">Dashboard</Link>
        </Button>
        <Button variant="ghost" className="text-sm font-medium" asChild>
          <Link href="/settings">Settings</Link>
        </Button>
        <Button
          variant="ghost"
          className="text-sm font-medium"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </nav>
    </header>
  );
}
