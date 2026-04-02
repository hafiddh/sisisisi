"use client";

import { useState } from "react";
import {
  Search,
  Briefcase,
  Users,
  Clock,
  TrendingUp,
  Filter,
  ChevronDown,
  Info,
  FileText,
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
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { jabatanDetailList, dummyHasilPerhitungan, daftarOPD } from "@/lib/abk-data";

function JenisBadge({ jenis }: { jenis: "struktural" | "fungsional" | "pelaksana" }) {
  const variants = {
    struktural: "bg-primary text-primary-foreground",
    fungsional: "bg-accent text-accent-foreground",
    pelaksana: "bg-muted text-muted-foreground",
  };
  return (
    <Badge className={variants[jenis]}>
      {jenis.charAt(0).toUpperCase() + jenis.slice(1)}
    </Badge>
  );
}

function BebanBadge({ beban }: { beban: number }) {
  if (beban > 1.2) {
    return <Badge className="bg-red-100 text-red-700 border-red-200">Tinggi ({beban.toFixed(2)})</Badge>;
  }
  if (beban > 1.0) {
    return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">Sedang ({beban.toFixed(2)})</Badge>;
  }
  return <Badge className="bg-green-100 text-green-700 border-green-200">Normal ({beban.toFixed(2)})</Badge>;
}

interface ExpandedRows {
  [key: string]: boolean;
}

export default function PublicAnjabPage() {
  const [search, setSearch] = useState("");
  const [opdFilter, setOpdFilter] = useState("all");
  const [jenisFilter, setJenisFilter] = useState("all");
  const [expandedRows, setExpandedRows] = useState<ExpandedRows>({});

  const filteredJabatan = jabatanDetailList.filter((jabatan) => {
    const matchSearch =
      jabatan.namaJabatan.toLowerCase().includes(search.toLowerCase()) ||
      jabatan.kodeJabatan.includes(search);
    const matchOpd = opdFilter === "all" || jabatan.opdId === opdFilter;
    const matchJenis = jenisFilter === "all" || jabatan.jenisJabatan === jenisFilter;
    return matchSearch && matchOpd && matchJenis;
  });

  const toggleRow = (id: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const stats = {
    total: jabatanDetailList.length,
    struktural: jabatanDetailList.filter((j) => j.jenisJabatan === "struktural").length,
    fungsional: jabatanDetailList.filter((j) => j.jenisJabatan === "fungsional").length,
    pelaksana: jabatanDetailList.filter((j) => j.jenisJabatan === "pelaksana").length,
  };

  return (
    <div className="min-h-screen py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
              <Briefcase className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Analisis Jabatan</h1>
              <p className="text-muted-foreground">
                Data jabatan, kualifikasi, dan beban kerja di OPD
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary">
                <Briefcase className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                <p className="text-sm text-muted-foreground">Total Jabatan</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary">
                <Users className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.struktural}</p>
                <p className="text-sm text-muted-foreground">Struktural</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent">
                <FileText className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.fungsional}</p>
                <p className="text-sm text-muted-foreground">Fungsional</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-muted">
                <TrendingUp className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.pelaksana}</p>
                <p className="text-sm text-muted-foreground">Pelaksana</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <div className="flex-1">
                <label className="mb-2 block text-sm font-medium text-foreground">Cari Jabatan</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Cari nama atau kode jabatan..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="w-full sm:w-48">
                <label className="mb-2 block text-sm font-medium text-foreground">Filter OPD</label>
                <Select value={opdFilter} onValueChange={setOpdFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih OPD" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua OPD</SelectItem>
                    {daftarOPD.map((opd) => (
                      <SelectItem key={opd.id} value={opd.id}>
                        {opd.nama}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full sm:w-40">
                <label className="mb-2 block text-sm font-medium text-foreground">Filter Jenis</label>
                <Select value={jenisFilter} onValueChange={setJenisFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Jenis" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Jenis</SelectItem>
                    <SelectItem value="struktural">Struktural</SelectItem>
                    <SelectItem value="fungsional">Fungsional</SelectItem>
                    <SelectItem value="pelaksana">Pelaksana</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Jabatan List */}
        <div className="space-y-4">
          {filteredJabatan.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <Briefcase className="mb-4 h-12 w-12 text-muted-foreground/50" />
                <p className="text-muted-foreground">Tidak ada data jabatan yang sesuai dengan filter</p>
              </CardContent>
            </Card>
          ) : (
            filteredJabatan.map((jabatan) => {
              const perhitungan = dummyHasilPerhitungan.find(
                (p) => p.jabatanId === jabatan.id
              );
              const isExpanded = expandedRows[jabatan.id];

              return (
                <Card
                  key={jabatan.id}
                  className="overflow-hidden transition-all hover:shadow-md"
                >
                  <div
                    onClick={() => toggleRow(jabatan.id)}
                    className="cursor-pointer"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                              <Briefcase className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-foreground">
                                {jabatan.namaJabatan}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {jabatan.namaOpd} • Kode: {jabatan.kodeJabatan}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <JenisBadge jenis={jabatan.jenisJabatan} />
                          <ChevronDown
                            className={`h-5 w-5 text-muted-foreground transition-transform ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          />
                        </div>
                      </div>

                      {/* Quick info on card */}
                      <div className="mt-4 flex flex-wrap gap-4">
                        <div className="text-sm">
                          <p className="text-muted-foreground">Unit Kerja</p>
                          <p className="font-medium text-foreground">{jabatan.unitKerja}</p>
                        </div>
                        {perhitungan && (
                          <>
                            <div className="text-sm">
                              <p className="text-muted-foreground">Beban Kerja</p>
                              <BebanBadge beban={perhitungan.bebanKerja} />
                            </div>
                            <div className="text-sm">
                              <p className="text-muted-foreground">Kebutuhan Pegawai</p>
                              <p className="font-medium text-foreground">
                                {perhitungan.kebutuhanPegawai} orang
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </div>

                  {isExpanded && (
                    <>
                      <div className="border-t border-border" />
                      <CardContent className="p-6 bg-muted/30">
                        <div className="space-y-6">
                          {/* Deskripsi Jabatan */}
                          <div>
                            <h4 className="mb-2 font-semibold text-foreground">Deskripsi Jabatan</h4>
                            <p className="text-sm text-muted-foreground">{jabatan.ikhtisar}</p>
                          </div>

                          {/* Kualifikasi */}
                          <div>
                            <h4 className="mb-2 font-semibold text-foreground">Kualifikasi</h4>
                            <div className="space-y-2 text-sm">
                              <div>
                                <p className="text-muted-foreground">Pendidikan</p>
                                <p className="text-foreground">{jabatan.kualifikasiPendidikan}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Pengalaman</p>
                                <p className="text-foreground">{jabatan.pengalaman}</p>
                              </div>
                            </div>
                          </div>

                          {/* Beban Kerja Detail */}
                          {perhitungan && (
                            <div>
                              <h4 className="mb-4 font-semibold text-foreground">Detail Beban Kerja</h4>
                              <div className="grid gap-4 sm:grid-cols-2">
                                <Card className="border">
                                  <CardContent className="p-4">
                                    <p className="text-sm text-muted-foreground">Total Waktu Kerja</p>
                                    <p className="text-2xl font-bold text-foreground">
                                      {perhitungan.totalWaktuKerja}
                                    </p>
                                    <p className="text-xs text-muted-foreground">Menit / Tahun</p>
                                  </CardContent>
                                </Card>
                                <Card className="border">
                                  <CardContent className="p-4">
                                    <p className="text-sm text-muted-foreground">Waktu Kerja Efektif</p>
                                    <p className="text-2xl font-bold text-foreground">
                                      {perhitungan.waktuKerjaEfektif}
                                    </p>
                                    <p className="text-xs text-muted-foreground">Jam / Tahun</p>
                                  </CardContent>
                                </Card>
                                <Card className="border">
                                  <CardContent className="p-4">
                                    <p className="text-sm text-muted-foreground">Indeks Beban Kerja</p>
                                    <p className="text-2xl font-bold text-foreground">
                                      {perhitungan.bebanKerja.toFixed(2)}
                                    </p>
                                    <p className="text-xs text-muted-foreground">Rasio</p>
                                  </CardContent>
                                </Card>
                                <Card className="border">
                                  <CardContent className="p-4">
                                    <p className="text-sm text-muted-foreground">Pegawai yang Ada</p>
                                    <p className="text-2xl font-bold text-foreground">
                                      {perhitungan.pegawaiExisting}
                                    </p>
                                    <p className="text-xs text-muted-foreground">Orang</p>
                                  </CardContent>
                                </Card>
                              </div>
                              <div className="mt-4 rounded-lg border border-accent bg-accent/5 p-4">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className="text-sm font-medium text-foreground">Status Kebutuhan</p>
                                    <p className="text-sm text-muted-foreground">
                                      Dibutuhkan: {perhitungan.kebutuhanPegawai} orang
                                    </p>
                                  </div>
                                  <Badge
                                    className={`${
                                      perhitungan.keterangan === "Kelebihan"
                                        ? "bg-green-100 text-green-700"
                                        : perhitungan.keterangan === "Kekurangan"
                                        ? "bg-red-100 text-red-700"
                                        : "bg-blue-100 text-blue-700"
                                    }`}
                                  >
                                    {perhitungan.keterangan}{" "}
                                    {perhitungan.selisih > 0 ? "+" : ""}
                                    {perhitungan.selisih}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </>
                  )}
                </Card>
              );
            })
          )}
        </div>

        {/* Info Section */}
        <Card className="mt-8 border-accent bg-accent/5">
          <CardContent className="flex items-start gap-4 p-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent">
              <Info className="h-5 w-5 text-accent-foreground" />
            </div>
            <div>
              <h3 className="font-medium text-foreground">Tentang Analisis Jabatan</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Data ini menampilkan informasi lengkap mengenai posisi jabatan, kualifikasi yang
                diperlukan, dan analisis beban kerja untuk membantu pemahaman terkait struktur
                organisasi dan kebutuhan sumber daya manusia di setiap OPD.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
