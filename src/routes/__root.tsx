import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SITE, SHELLEY } from "@/content/shelley";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-sr-cream px-4 text-center">
      <div className="font-display text-[8rem] leading-none text-sr-red" style={{ WebkitTextStroke: "3px var(--color-sr-black)" }}>
        404
      </div>
      <h1 className="mt-2 text-3xl text-sr-black">Lost in the city</h1>
      <p className="mt-2 max-w-md text-base text-sr-black/80">
        Even Super Realtor can't find this page. Let's get you back to safety.
      </p>
      <div className="mt-6">
        <Link
          to="/"
          className="inline-flex items-center border-comic-thin bg-sr-yellow px-6 py-3 font-display text-xl uppercase shadow-comic-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-comic-hover"
        >
          Go Home →
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-sr-cream px-4 text-center">
      <h1 className="text-3xl text-sr-black">This page didn't load</h1>
      <p className="mt-2 max-w-md text-base text-sr-black/80">
        Something went wrong on our end. Try refreshing or head home.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="inline-flex items-center border-comic-thin bg-sr-yellow px-6 py-3 font-display text-xl uppercase shadow-comic-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-comic-hover"
        >
          Try again
        </button>
        <a
          href="/"
          className="inline-flex items-center border-comic-thin bg-white px-6 py-3 font-display text-xl uppercase shadow-comic-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-comic-hover"
        >
          Go home
        </a>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: `${SITE.name} — Las Vegas Real Estate Hero` },
      { name: "description", content: SITE.description },
      { name: "author", content: SHELLEY.name },
      { property: "og:site_name", content: SITE.name },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#FFF8E7" },
      { title: "Super Realtor: Your Real Estate Hero" },
      { property: "og:title", content: "Super Realtor: Your Real Estate Hero" },
      { name: "twitter:title", content: "Super Realtor: Your Real Estate Hero" },
      { name: "description", content: "SuperRealtor.com is a lead-generation website for a Las Vegas REALTOR®, offering a bold, comic-book-inspired design." },
      { property: "og:description", content: "SuperRealtor.com is a lead-generation website for a Las Vegas REALTOR®, offering a bold, comic-book-inspired design." },
      { name: "twitter:description", content: "SuperRealtor.com is a lead-generation website for a Las Vegas REALTOR®, offering a bold, comic-book-inspired design." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/4bd1a9f4-4f1f-46e8-b205-e689c7073ccd/id-preview-3da1a188--f54971b7-e99d-4cc2-8236-eb8ef868bfcf.lovable.app-1779820104161.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/4bd1a9f4-4f1f-46e8-b205-e689c7073ccd/id-preview-3da1a188--f54971b7-e99d-4cc2-8236-eb8ef868bfcf.lovable.app-1779820104161.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bangers&family=Permanent+Marker&family=Inter:wght@400;500;600;700;800&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: SITE.name,
          description: SITE.description,
          url: "/",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <a href="#main" className="skip-link">Skip to content</a>
      <div className="flex min-h-screen flex-col bg-sr-cream">
        <Header />
        <main id="main" className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
