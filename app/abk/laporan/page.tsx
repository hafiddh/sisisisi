import { AppSidebar } from "@/components/app-sidebar";
import { LaporanABKComponent } from "@/components/abk/laporan-abk";

export default function LaporanPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />

      <main className="flex-1 lg:ml-72">
        {/* Header */}
        <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-16 items-center gap-4 px-4 sm:px-6 lg:px-8">
            <div className="flex-1">
              <h1 className="text-lg font-semibold sm:text-xl">Laporan ABK</h1>
              <p className="text-sm text-muted-foreground">
                Kelola dan cetak laporan analisis beban kerja per OPD
              </p>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          <LaporanABKComponent />
        </div>
      </main>
    </div>
  );
}
