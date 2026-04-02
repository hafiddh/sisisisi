"use client";

import { useState } from "react";
import { ClipboardList, FileSpreadsheet, Upload, Download } from "lucide-react";
import { AppSidebar } from "@/components/app-sidebar";
import { AktivitasForm, AktivitasFormData } from "@/components/abk/aktivitas-form";
import { AktivitasTable } from "@/components/abk/aktivitas-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Aktivitas, dummyAktivitas, daftarJabatan } from "@/lib/abk-data";

export default function InputAktivitasPage() {
  const [aktivitasList, setAktivitasList] = useState<Aktivitas[]>(dummyAktivitas);

  const handleAddAktivitas = (data: AktivitasFormData) => {
    const jabatan = daftarJabatan.find((j) => j.id === data.jabatanId);
    const newAktivitas: Aktivitas = {
      id: `${Date.now()}`,
      jabatanId: data.jabatanId,
      namaJabatan: jabatan?.nama || "",
      uraianTugas: data.uraianTugas,
      satuan: data.satuan,
      normaWaktu: data.normaWaktu,
      targetKuantitas: data.targetKuantitas,
      frekuensi: data.frekuensi,
      kategori: data.kategori,
    };
    setAktivitasList([...aktivitasList, newAktivitas]);
  };

  const handleDeleteAktivitas = (id: string) => {
    setAktivitasList(aktivitasList.filter((a) => a.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />

      <main className="flex-1 lg:ml-72">
        {/* Header */}
        <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-16 items-center gap-4 px-4 sm:px-6 lg:px-8">
            <div className="flex-1">
              <h1 className="text-lg font-semibold sm:text-xl">Input Aktivitas Kerja</h1>
              <p className="text-sm text-muted-foreground">
                Kelola data aktivitas kerja untuk perhitungan beban kerja
              </p>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-sm font-medium">
                    <ClipboardList className="h-4 w-4 text-primary" />
                    Total Aktivitas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{aktivitasList.length}</p>
                  <p className="text-xs text-muted-foreground">aktivitas terdaftar</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-sm font-medium">
                    <FileSpreadsheet className="h-4 w-4 text-accent-foreground" />
                    Jabatan Tercakup
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">
                    {new Set(aktivitasList.map((a) => a.jabatanId)).size}
                  </p>
                  <p className="text-xs text-muted-foreground">jabatan berbeda</p>
                </CardContent>
              </Card>

              <Card className="sm:col-span-2 lg:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Aksi Cepat</CardTitle>
                  <CardDescription>Import/Export data aktivitas</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Upload className="h-4 w-4" />
                    Import Excel
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="h-4 w-4" />
                    Export Excel
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="h-4 w-4" />
                    Download Template
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <Card>
              <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>Daftar Aktivitas Kerja</CardTitle>
                  <CardDescription>
                    Data aktivitas akan digunakan untuk menghitung beban kerja per jabatan
                  </CardDescription>
                </div>
                <AktivitasForm onSubmit={handleAddAktivitas} />
              </CardHeader>
              <CardContent>
                <AktivitasTable
                  data={aktivitasList}
                  onDelete={handleDeleteAktivitas}
                />
              </CardContent>
            </Card>

            {/* Info Card */}
            <Card className="border-accent/50 bg-accent/5">
              <CardHeader>
                <CardTitle className="text-sm font-medium">Panduan Input Aktivitas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>
                  <strong>1. Pilih OPD dan Jabatan</strong> - Tentukan unit kerja dan jabatan yang akan diinput aktivitasnya
                </p>
                <p>
                  <strong>2. Isi Uraian Tugas</strong> - Jelaskan aktivitas kerja secara spesifik dan terukur
                </p>
                <p>
                  <strong>3. Tentukan Norma Waktu</strong> - Waktu rata-rata yang dibutuhkan untuk menyelesaikan 1 satuan aktivitas (dalam menit)
                </p>
                <p>
                  <strong>4. Isi Target dan Frekuensi</strong> - Jumlah output yang harus dicapai dalam periode tertentu
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
