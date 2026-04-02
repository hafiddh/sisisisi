import { Building2, Users, FileText, BarChart3, TrendingUp } from "lucide-react";
import { AppSidebar } from "@/components/app-sidebar";
import { StatCard } from "@/components/stat-card";
import { OPDTable } from "@/components/opd-table";
import { WorkloadChart } from "@/components/workload-chart";
import { RecentActivity } from "@/components/recent-activity";
import { OrgStructure } from "@/components/org-structure";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />

      {/* Main Content */}
      <main className="lg:pl-72">
        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="ml-12 lg:ml-0">
              <h1 className="text-xl font-bold text-foreground">Dashboard</h1>
              <p className="text-sm text-muted-foreground">
                Selamat datang di Sistem Informasi Kelembagaan
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-2 rounded-lg bg-primary/10 px-3 py-1.5 sm:flex">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  Tahun 2026
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Stats Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total OPD"
              value={42}
              description="Organisasi Perangkat Daerah"
              icon={Building2}
              variant="primary"
            />
            <StatCard
              title="Total Jabatan"
              value={1284}
              description="Jabatan terdata"
              icon={Users}
              trend={{ value: 5.2, isPositive: true }}
            />
            <StatCard
              title="Dokumen Anjab"
              value="85%"
              description="Kelengkapan dokumen"
              icon={FileText}
              trend={{ value: 12.5, isPositive: true }}
            />
            <StatCard
              title="Analisis ABK"
              value="72%"
              description="Sudah dianalisis"
              icon={BarChart3}
              trend={{ value: 8.3, isPositive: true }}
            />
          </div>

          {/* Charts & Activity Section */}
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            <WorkloadChart />
            <RecentActivity />
          </div>

          {/* Org Structure */}
          <div className="mt-6">
            <OrgStructure />
          </div>

          {/* OPD Table */}
          <div className="mt-6">
            <OPDTable />
          </div>
        </div>
      </main>
    </div>
  );
}
