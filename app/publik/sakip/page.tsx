"use client";

import { useState } from "react";
import {
  Award,
  Search,
  FileText,
  ExternalLink,
  TrendingUp,
  Medal,
  BarChart3,
  Download,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { nilaiSAKIPList, dokumenSAKIPList, NilaiSAKIP } from "@/lib/abk-data";

function getPredikatColor(predikat: string) {
  switch (predikat) {
    case "AA":
      return "bg-emerald-500 text-white";
    case "A":
      return "bg-green-500 text-white";
    case "BB":
      return "bg-blue-500 text-white";
    case "B":
      return "bg-cyan-500 text-white";
    case "CC":
      return "bg-yellow-500 text-white";
    case "C":
      return "bg-orange-500 text-white";
    case "D":
      return "bg-red-500 text-white";
    default:
      return "bg-muted text-muted-foreground";
  }
}

function getJenisDokumenLabel(jenis: string) {
  const labels: Record<string, string> = {
    renstra: "Renstra",
    renja: "Renja",
    lakip: "LAKIP",
    iku: "IKU",
    tapkin: "Tapkin",
    lainnya: "Lainnya",
  };
  return labels[jenis] || jenis;
}

export default function PublicSAKIPPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedOPD, setSelectedOPD] = useState<NilaiSAKIP | null>(null);

  // Stats
  const totalOPD = nilaiSAKIPList.length;
  const avgNilai = nilaiSAKIPList.reduce((sum, n) => sum + n.nilaiTotal, 0) / totalOPD;
  const predikatA = nilaiSAKIPList.filter((n) => n.predikat === "A" || n.predikat === "AA").length;
  const predikatBB = nilaiSAKIPList.filter((n) => n.predikat === "BB" || n.predikat === "B").length;

  // Get unique years
  const years = Array.from(new Set(nilaiSAKIPList.map((n) => n.tahun))).sort((a, b) => b - a);

  // Filter data
  const filteredNilai = nilaiSAKIPList.filter((nilai) => {
    const matchSearch = nilai.namaOpd.toLowerCase().includes(searchTerm.toLowerCase());
    const matchYear = selectedYear === "all" || nilai.tahun.toString() === selectedYear;
    return matchSearch && matchYear;
  });

  const filteredDokumen = dokumenSAKIPList.filter((dok) => {
    const matchSearch = dok.namaOpd.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dok.namaDokumen.toLowerCase().includes(searchTerm.toLowerCase());
    const matchYear = selectedYear === "all" || dok.tahun.toString() === selectedYear;
    return matchSearch && matchYear;
  });

  return (
    <div className="min-h-screen py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
              <Award className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Capaian SAKIP</h1>
              <p className="text-muted-foreground">
                Sistem Akuntabilitas Kinerja Instansi Pemerintah
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary">
                <BarChart3 className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{totalOPD}</p>
                <p className="text-sm text-muted-foreground">OPD Dinilai</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent">
                <TrendingUp className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{avgNilai.toFixed(1)}</p>
                <p className="text-sm text-muted-foreground">Rata-rata Nilai</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-500">
                <Medal className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{predikatA}</p>
                <p className="text-sm text-muted-foreground">Predikat A/AA</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{predikatBB}</p>
                <p className="text-sm text-muted-foreground">Predikat BB/B</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Cari OPD atau dokumen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Tahun" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Tahun</SelectItem>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="nilai" className="space-y-6">
          <TabsList>
            <TabsTrigger value="nilai">Nilai SAKIP</TabsTrigger>
            <TabsTrigger value="dokumen">Dokumen</TabsTrigger>
          </TabsList>

          <TabsContent value="nilai">
            <Card>
              <CardHeader>
                <CardTitle>Hasil Penilaian SAKIP</CardTitle>
                <CardDescription>
                  Nilai akuntabilitas kinerja per OPD
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>OPD</TableHead>
                        <TableHead className="text-center">Tahun</TableHead>
                        <TableHead className="text-center">Perencanaan</TableHead>
                        <TableHead className="text-center">Pengukuran</TableHead>
                        <TableHead className="text-center">Pelaporan</TableHead>
                        <TableHead className="text-center">Evaluasi</TableHead>
                        <TableHead className="text-center">Capaian</TableHead>
                        <TableHead className="text-center">Total</TableHead>
                        <TableHead className="text-center">Predikat</TableHead>
                        <TableHead className="text-center">Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredNilai.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={10} className="py-8 text-center text-muted-foreground">
                            Tidak ada data ditemukan
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredNilai.map((nilai) => (
                          <TableRow key={nilai.id}>
                            <TableCell className="font-medium">{nilai.namaOpd}</TableCell>
                            <TableCell className="text-center">{nilai.tahun}</TableCell>
                            <TableCell className="text-center">{nilai.nilaiPerencanaan}</TableCell>
                            <TableCell className="text-center">{nilai.nilaiPengukuran}</TableCell>
                            <TableCell className="text-center">{nilai.nilaiPelaporan}</TableCell>
                            <TableCell className="text-center">{nilai.nilaiEvaluasi}</TableCell>
                            <TableCell className="text-center">{nilai.nilaiCapaian}</TableCell>
                            <TableCell className="text-center font-bold">{nilai.nilaiTotal}</TableCell>
                            <TableCell className="text-center">
                              <Badge className={getPredikatColor(nilai.predikat)}>
                                {nilai.predikat}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-center">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedOPD(nilai)}
                              >
                                Detail
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dokumen">
            <Card>
              <CardHeader>
                <CardTitle>Dokumen SAKIP</CardTitle>
                <CardDescription>
                  Dokumen perencanaan dan pelaporan kinerja
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>OPD</TableHead>
                        <TableHead>Jenis</TableHead>
                        <TableHead>Nama Dokumen</TableHead>
                        <TableHead className="text-center">Tahun</TableHead>
                        <TableHead className="text-center">Tanggal Upload</TableHead>
                        <TableHead className="text-center">Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredDokumen.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="py-8 text-center text-muted-foreground">
                            Tidak ada dokumen ditemukan
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredDokumen.map((dok) => (
                          <TableRow key={dok.id}>
                            <TableCell className="font-medium">{dok.namaOpd}</TableCell>
                            <TableCell>
                              <Badge variant="outline">
                                {getJenisDokumenLabel(dok.jenisDokumen)}
                              </Badge>
                            </TableCell>
                            <TableCell>{dok.namaDokumen}</TableCell>
                            <TableCell className="text-center">{dok.tahun}</TableCell>
                            <TableCell className="text-center">
                              {new Date(dok.uploadedAt).toLocaleDateString("id-ID")}
                            </TableCell>
                            <TableCell className="text-center">
                              {dok.linkDokumen && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  asChild
                                >
                                  <a
                                    href={dok.linkDokumen}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <ExternalLink className="mr-1 h-4 w-4" />
                                    Lihat
                                  </a>
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Detail Dialog */}
        <Dialog open={!!selectedOPD} onOpenChange={() => setSelectedOPD(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Detail Nilai SAKIP</DialogTitle>
              <DialogDescription>
                {selectedOPD?.namaOpd} - Tahun {selectedOPD?.tahun}
              </DialogDescription>
            </DialogHeader>
            {selectedOPD && (
              <div className="space-y-6">
                <div className="flex items-center justify-between rounded-lg bg-muted p-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Nilai</p>
                    <p className="text-3xl font-bold text-foreground">{selectedOPD.nilaiTotal}</p>
                  </div>
                  <Badge className={`text-lg px-4 py-2 ${getPredikatColor(selectedOPD.predikat)}`}>
                    Predikat {selectedOPD.predikat}
                  </Badge>
                </div>

                <div className="grid gap-4 sm:grid-cols-5">
                  {[
                    { label: "Perencanaan", value: selectedOPD.nilaiPerencanaan, max: 30 },
                    { label: "Pengukuran", value: selectedOPD.nilaiPengukuran, max: 25 },
                    { label: "Pelaporan", value: selectedOPD.nilaiPelaporan, max: 15 },
                    { label: "Evaluasi", value: selectedOPD.nilaiEvaluasi, max: 10 },
                    { label: "Capaian", value: selectedOPD.nilaiCapaian, max: 20 },
                  ].map((item) => (
                    <div key={item.label} className="rounded-lg border p-3 text-center">
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <p className="text-xl font-bold text-foreground">{item.value}</p>
                      <p className="text-xs text-muted-foreground">/ {item.max}</p>
                      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full bg-primary transition-all"
                          style={{ width: `${(item.value / item.max) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {selectedOPD.catatan && (
                  <div className="rounded-lg border border-accent bg-accent/10 p-4">
                    <p className="mb-1 text-sm font-medium text-foreground">Catatan Review</p>
                    <p className="text-sm text-muted-foreground">{selectedOPD.catatan}</p>
                  </div>
                )}

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Direview oleh: {selectedOPD.reviewedBy}</span>
                  <span>
                    {new Date(selectedOPD.reviewedAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Info */}
        <Card className="mt-8 border-accent bg-accent/5">
          <CardContent className="flex items-start gap-4 p-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent">
              <Award className="h-5 w-5 text-accent-foreground" />
            </div>
            <div>
              <h3 className="font-medium text-foreground">Tentang SAKIP</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                SAKIP (Sistem Akuntabilitas Kinerja Instansi Pemerintah) adalah rangkaian sistematik
                dari berbagai aktivitas, alat, dan prosedur yang dirancang untuk tujuan penetapan
                dan pengukuran, pengumpulan data, pengklasifikasian, pengikhtisaran, dan pelaporan
                kinerja pada instansi pemerintah.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
