import { PublicNavbar } from "@/components/public-navbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />
      <main>{children}</main>
      {/* Footer */}
      <footer className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="text-center md:text-left">
              <p className="text-sm font-medium text-foreground">SIKELEMBAGAAN</p>
              <p className="text-xs text-muted-foreground">
                Sistem Informasi Kelembagaan Pemerintah Kabupaten
              </p>
            </div>
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Pemerintah Kabupaten. Hak Cipta Dilindungi.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
