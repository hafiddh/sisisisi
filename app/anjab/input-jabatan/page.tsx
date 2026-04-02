"use client";

import { useState } from "react";
import {
  Users,
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  Filter,
  FileText,
  Briefcase,
  Building2,
} from "lucide-react";
import { AppSidebar } from "@/components/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { jabatanDetailList, daftarOPD, type JabatanDetail } from "@/lib/abk-data";

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

function StatusBadge({ status }: { status: "draft" | "final" | "disetujui" }) {
  const variants = {
    draft: "bg-muted text-muted-foreground border-muted",
    final: "bg-accent/30 text-accent-foreground border-accent/40",
    disetujui: "bg-emerald-100 text-emerald-700 border-emerald-200",
  };
  return (
    <Badge variant="outline" className={variants[status]}>
      {status === "draft" ? "Draft" : status === "final" ? "Final" : "Disetujui"}
    </Badge>
  );
}

export default function InputJabatanPage() {
  const [search, setSearch] = useState("");
  const [opdFilter, setOpdFilter] = useState("all");
  const [jenisFilter, setJenisFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredData = jabatanDetailList.filter((jabatan) => {
    const matchSearch =
      jabatan.namaJabatan.toLowerCase().includes(search.toLowerCase()) ||
      jabatan.kodeJabatan.includes(search);
    const matchOpd = opdFilter === "all" || jabatan.opdId === opdFilter;
    const matchJenis = jenisFilter === "all" || jabatan.jenisJabatan === jenisFilter;
    return matchSearch && matchOpd && matchJenis;
  });

  const stats = {
    total: jabatanDetailList.length,
    struktural: jabatanDetailList.filter((j) => j.jenisJabatan === "struktural").length,
    fungsional: jabatanDetailList.filter((j) => j.jenisJabatan === "fungsional").length,
    pelaksana: jabatanDetailList.filter((j) => j.jenisJabatan === "pelaksana").length,
  };

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <main className="lg:pl-72">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Input Data Jabatan</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Kelola data jabatan untuk analisis jabatan
              </p>
            </div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Tambah Jabatan
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Tambah Data Jabatan</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="kode">Kode Jabatan</Label>
                      <Input id="kode" placeholder="Contoh: 1.05.01.001" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nama">Nama Jabatan</Label>
                      <Input id="nama" placeholder="Nama jabatan" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="jenis">Jenis Jabatan</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih jenis" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="struktural">Struktural</SelectItem>
                          <SelectItem value="fungsional">Fungsional</SelectItem>
                          <SelectItem value="pelaksana">Pelaksana</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="eselon">Eselon (jika struktural)</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih eselon" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="II.a">II.a</SelectItem>
                          <SelectItem value="II.b">II.b</SelectItem>
                          <SelectItem value="III.a">III.a</SelectItem>
                          <SelectItem value="III.b">III.b</SelectItem>
                          <SelectItem value="IV.a">IV.a</SelectItem>
                          <SelectItem value="IV.b">IV.b</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="opd">OPD</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih OPD" />
                        </SelectTrigger>
                        <SelectContent>
                          {daftarOPD.map((opd) => (
                            <SelectItem key={opd.id} value={opd.id}>
                              {opd.nama}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="unit">Unit Kerja</Label>
                      <Input id="unit" placeholder="Unit kerja" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ikhtisar">Ikhtisar Jabatan</Label>
                    <Textarea id="ikhtisar" placeholder="Deskripsi singkat tugas jabatan" rows={3} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pendidikan">Kualifikasi Pendidikan</Label>
                    <Input id="pendidikan" placeholder="Contoh: S1 Administrasi/Manajemen" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pengalaman">Pengalaman</Label>
                    <Input id="pengalaman" placeholder="Contoh: Minimal 2 tahun di bidang terkait" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setDialogOpen(false)}>Batal</Button>
                  <Button onClick={() => setDialogOpen(false)}>Simpan</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats */}
          <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Jabatan</p>
                    <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Struktural</p>
                    <p className="text-2xl font-bold text-foreground">{stats.struktural}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-accent/30 p-3">
                    <FileText className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Fungsional</p>
                    <p className="text-2xl font-bold text-foreground">{stats.fungsional}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-muted p-3">
                    <Building2 className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Pelaksana</p>
                    <p className="text-2xl font-bold text-foreground">{stats.pelaksana}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Table */}
          <Card>
            <CardHeader className="border-b">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <CardTitle className="text-lg">Data Jabatan</CardTitle>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Cari jabatan..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="pl-9 sm:w-56"
                    />
                  </div>
                  <Select value={opdFilter} onValueChange={setOpdFilter}>
                    <SelectTrigger className="w-full sm:w-40">
                      <SelectValue placeholder="Filter OPD" />
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
                  <Select value={jenisFilter} onValueChange={setJenisFilter}>
                    <SelectTrigger className="w-full sm:w-36">
                      <SelectValue placeholder="Filter Jenis" />
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
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Kode</TableHead>
                      <TableHead>Nama Jabatan</TableHead>
                      <TableHead>Jenis</TableHead>
                      <TableHead>OPD</TableHead>
                      <TableHead>Unit Kerja</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.map((jabatan) => (
                      <TableRow key={jabatan.id}>
                        <TableCell className="font-mono text-sm">{jabatan.kodeJabatan}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-foreground">{jabatan.namaJabatan}</p>
                            {jabatan.eselon && (
                              <p className="text-xs text-muted-foreground">Eselon {jabatan.eselon}</p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <JenisBadge jenis={jabatan.jenisJabatan} />
                        </TableCell>
                        <TableCell className="text-muted-foreground">{jabatan.namaOpd}</TableCell>
                        <TableCell className="text-muted-foreground">{jabatan.unitKerja}</TableCell>
                        <TableCell>
                          <StatusBadge status={jabatan.statusAnjab} />
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
