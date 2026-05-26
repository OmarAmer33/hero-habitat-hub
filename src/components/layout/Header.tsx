import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/comic/Logo";
import { ComicLink } from "@/components/comic/ComicButton";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/buyers", label: "Buyers" },
  { to: "/sellers", label: "Sellers" },
  { to: "/property-management", label: "Property Mgmt" },
  { to: "/faq", label: "FAQ" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b-[3px] border-sr-black bg-sr-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/" aria-label="SuperRealtor home" className="shrink-0">
          <Logo variant="horizontal" height={40} />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded px-3 py-2 font-display text-lg uppercase tracking-wide text-sr-black transition-colors hover:text-sr-red"
              activeProps={{ className: "text-sr-red underline decoration-sr-yellow decoration-4 underline-offset-4" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <ComicLink to="/contact" variant="primary" size="md">
            Contact Shelley
          </ComicLink>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center border-comic-thin bg-sr-yellow shadow-comic-sm lg:hidden"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
        >
          <Menu className="h-6 w-6" aria-hidden />
        </button>
      </div>

      {open && typeof document !== "undefined" && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="fixed inset-0 z-[100] flex flex-col bg-sr-cream"
        >
          <div className="flex items-center justify-between border-b-[3px] border-sr-black px-4 py-3">
            <Logo variant="horizontal" height={36} />
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center border-comic-thin bg-sr-yellow shadow-comic-sm"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-6 w-6" aria-hidden />
            </button>
          </div>
          <nav aria-label="Mobile" className="flex flex-1 flex-col items-start gap-1 overflow-y-auto px-6 py-8">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="block w-full py-3 font-display text-4xl uppercase text-sr-black hover:text-sr-red"
                activeProps={{ className: "text-sr-red" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-6">
              <ComicLink to="/contact" variant="primary" size="lg" onClick={() => setOpen(false)}>
                Contact Shelley →
              </ComicLink>
            </div>
          </nav>
        </div>,
        document.body
      )}
    </header>
  );
}
