import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Providers } from "./providers";
import { Sidebar } from "@/components/Sidebar";
import { Toaster } from "@/components/ui/sonner";

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <div className="flex justify-center">
              <nav className="w-full">
                <Sidebar />
              </nav>
              <main className="w-full max-w-[598px] min-h-screen px-4 outline outline-slate-500 outline-1">
                {children}
              </main>
              <footer className="w-full"></footer>
            </div>
          </Providers>
        </NextIntlClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
