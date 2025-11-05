import React from "react"; // <-- ADD THIS IMPORT
import Link from "next/link";
import Image from "next/image";
import NavLinks from "./nav-links";

const Sidebar = () => {
  return (
    // Hidden on mobile, flex on desktop (md:)
    <aside className="hidden md:flex flex-col fixed inset-y-0 z-50 w-64 bg-background border-r p-6">
      <Link href="/">
        <Image
          src={"/logo-1.png"}
          alt="FinSight Logo"
          width={200}
          height={60}
          className="h-12 w-auto object-contain"
        />
      </Link>

      <nav className="flex flex-col gap-y-4 mt-10 flex-1">
        {/* Wrap NavLinks in Suspense */}
        <React.Suspense fallback={<p>Loading...</p>}>
          <NavLinks />
        </React.Suspense>
      </nav>
    </aside>
  );
};

export default Sidebar;