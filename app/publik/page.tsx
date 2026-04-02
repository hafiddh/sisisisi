"use client";

import { Building2, Users, FileText, BarChart3, TrendingUp, Award, Target, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { opdDetailList, jabatanDetailList, dummyLaporan } from "@/lib/abk-data";

export default function PublicDashboardPage() {
  const totalOPD = opdDetailList.length;
  const totalJabatan = jabatanDetailList.length;
  const totalPegawai = opdDetailList.reduce((sum, opd) => sum + opd.totalPegawai, 0);
  const avgEfisiensi = dummyLaporan.reduce((sum, l) => sum + l.efisiensi, 0) / dummyLaporan.length;

  const stats = [
    {
      label: "Total OPD",
      value: totalOPD,
      icon: Building2,
      description: "Organisasi Perangkat Daerah",
      color: "bg-primary",
    },
    {
      label: "Total Jabatan",
      value: totalJabatan,
      icon: Users,
      description: "Jabatan Terdaftar",
      color: "bg-accent",
    },
    {
      label: "Total Pegawai",
      value: totalPegawai,
      icon: FileText,
      description: "Pegawai Aktif",
      color: "bg-primary",
    },
    {
      label: "Rata-rata Efisiensi",
      value: `${avgEfisiensi.toFixed(1)}%`,
      icon: TrendingUp,
      description: "Efisiensi Beban Kerja",
      color: "bg-accent",
    },
  ];

  const quickLinks = [
    {
      title: "Capaian SAKIP",
      description: "Lihat capaian Sistem Akuntabilitas Kinerja Instansi Pemerintah",
      href: "/publik/sakip",
      icon: Award,
    },
    {
      title: "Analisis Jabatan",
      description: "Jelajahi data jabatan, kualifikasi, dan beban kerja",
      href: "/publik/anjab",
      icon: Target,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary py-16 sm:py-24">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAzMHYySDE0di0yaDIyek0zNiAyNnYySDE0di0yaDIyek0zNiAyMnYySDE0di0yaDIyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl lg:text-5xl">
              Sistem Informasi Kelembagaan
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">
              Portal informasi publik mengenai kelembagaan, analisis jabatan, dan beban kerja
              Organisasi Perangkat Daerah Pemerintah Kabupaten
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 -mt-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.label} className="border-none shadow-lg">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${stat.color}`}>
                    <stat.icon className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Akses Cepat</h2>
            <p className="mt-2 text-muted-foreground">
              Jelajahi informasi kelembagaan pemerintah daerah
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {quickLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Card className="group h-full cursor-pointer transition-all hover:border-primary hover:shadow-lg">
                  <CardContent className="flex items-center gap-6 p-6">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-accent transition-colors group-hover:bg-primary">
                      <link.icon className="h-8 w-8 text-accent-foreground transition-colors group-hover:text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground">{link.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{link.description}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* OPD Overview */}
      <section className="bg-muted/30 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div>
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Daftar OPD</h2>
              <p className="mt-1 text-muted-foreground">
                Organisasi Perangkat Daerah yang terdaftar
              </p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {opdDetailList.slice(0, 8).map((opd) => (
              <Card key={opd.id} className="transition-all hover:shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{opd.nama}</CardTitle>
                  <CardDescription className="text-xs">Kode: {opd.kode}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Pegawai</span>
                    <span className="font-medium text-foreground">{opd.totalPegawai}</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Jabatan</span>
                    <span className="font-medium text-foreground">{opd.totalJabatan}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl bg-primary p-8 sm:p-12">
            <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:text-left">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-primary-foreground sm:text-3xl">
                  Butuh Akses Lebih?
                </h2>
                <p className="mt-2 text-primary-foreground/80">
                  Untuk akses lengkap ke sistem manajemen kelembagaan, silakan login sebagai administrator.
                </p>
              </div>
              <Link href="/publik/login">
                <Button
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  Login Administrator
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
