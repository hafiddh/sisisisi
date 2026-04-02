"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Building2,
  Users,
  FileText,
  BarChart3,
  ChevronDown,
  ChevronRight,
  Home,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  href?: string;
  active?: boolean;
  children?: { label: string; href: string }[];
  onItemClick?: () => void;
}

function NavItem({ icon: Icon, label, href, active, children, onItemClick }: NavItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (children) {
    return (
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
            "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            active && "bg-sidebar-accent text-sidebar-accent-foreground"
          )}
        >
          <div className="flex items-center gap-3">
            <Icon className="h-5 w-5" />
            <span>{label}</span>
          </div>
          {isOpen ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>
        {isOpen && (
          <div className="ml-4 mt-1 space-y-1 border-l border-sidebar-border pl-4">
            {children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                onClick={onItemClick}
                className="block rounded-lg px-3 py-2 text-sm text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                {child.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={href || "#"}
      onClick={onItemClick}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        active && "bg-sidebar-primary text-sidebar-primary-foreground"
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </Link>
  );
}

export function AppSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      {/* Mobile Toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed left-4 top-4 z-50 lg:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={closeMobile}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-sidebar text-sidebar-foreground transition-transform lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Building2 className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-base font-bold text-primary">SIKELEMBAGAAN</h1>
            <p className="text-xs text-sidebar-foreground/60">Pemkab</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          <NavItem icon={Home} label="Dashboard" href="/" active onItemClick={closeMobile} />

          <div className="pb-2 pt-6">
            <p className="px-3 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/50">
              Data Kelembagaan
            </p>
          </div>

          <NavItem
            icon={Building2}
            label="Data OPD"
            onItemClick={closeMobile}
            children={[
              { label: "Daftar OPD", href: "/opd/daftar" },
              { label: "Struktur Organisasi", href: "/opd/struktur" },
              { label: "Data Pejabat", href: "/opd/pejabat" },
            ]}
          />

          <NavItem
            icon={Users}
            label="Analisis Jabatan"
            onItemClick={closeMobile}
            children={[
              { label: "Input Data Jabatan", href: "/anjab/input-jabatan" },
              { label: "Uraian Jabatan", href: "/anjab/uraian" },
              { label: "Spesifikasi Jabatan", href: "/anjab/spesifikasi" },
              { label: "Dokumen Anjab", href: "/anjab/dokumen" },
            ]}
          />

          <NavItem
            icon={BarChart3}
            label="Analisis Beban Kerja"
            onItemClick={closeMobile}
            children={[
              { label: "Input Aktivitas", href: "/abk/aktivitas" },
              { label: "Perhitungan ABK", href: "/abk/perhitungan" },
              { label: "Laporan ABK", href: "/abk/laporan" },
            ]}
          />

          <NavItem icon={FileText} label="Laporan" href="/laporan" onItemClick={closeMobile} />

          <div className="pb-2 pt-6">
            <p className="px-3 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/50">
              Sistem
            </p>
          </div>

          <NavItem icon={Settings} label="Pengaturan" href="#pengaturan" onItemClick={closeMobile} />
          <NavItem icon={HelpCircle} label="Bantuan" href="#bantuan" onItemClick={closeMobile} />
        </nav>

        {/* User */}
        <div className="border-t border-sidebar-border p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sidebar-accent text-sidebar-accent-foreground">
              <span className="text-sm font-semibold">AD</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Admin Daerah</p>
              <p className="text-xs text-sidebar-foreground/60">admin@pemkab.go.id</p>
            </div>
            <Button variant="ghost" size="icon" className="text-sidebar-foreground/60 hover:text-sidebar-foreground">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
