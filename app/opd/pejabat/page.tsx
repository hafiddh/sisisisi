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
  Download,
  UserCircle,
  Building2,
  GraduationCap,
  Calendar,
} from "lucide-react";
import { AppSidebar } from "@/components/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { pejabatList, daftarOPD, type Pejabat } from "@/lib/abk-data";

function EselonBadge({ eselon }: { eselon: string }) {
  const colors: Record<string, string> = {
    "II.a": "bg-primary text-primary-foreground",
    "II.b": "bg-primary/80 text-primary-foreground",
    "III.a": "bg-accent text-accent-foreground",
    "III.b": "bg-accent/80 text-accent-foreground",
    "IV.a": "bg-muted text-muted-foreground",
    "IV.b": "bg-muted text-muted-foreground",
  };
  return (
    <Badge className={colors[eselon] || "bg-muted text-muted-foreground"}>
      Eselon {eselon}
    </Badge>
  );
}

export default function DataPejabatPage() {
  const [search, setSearch] = useState("");
  const [opdFilter, setOpdFilter] = useState("all");
  const [selectedPejabat, setSelectedPejabat] = useState<Pejabat | null>(null);

  const filteredData = pejabatList.filter((pejabat) => {
    const matchSearch =
      pejabat.nama.toLowerCase().includes(search.toLowerCase()) ||
      pejabat.nip.includes(search) ||
      pejabat.jabatan.toLowerCase().includes(search.toLowerCase());
    const matchOpd = opdFilter === "all" || pejabat.opdId === opdFilter;
    return matchSearch && matchOpd;
  });

  const stats = {
    total: pejabatList.length,
    eselon2: pejabatList.filter((p) => p.eselon.startsWith("II")).length,
    eselon3: pejabatList.filter((p) => p.eselon.startsWith("III")).length,
    eselon4: pejabatList.filter((p) => p.eselon.startsWith("IV")).length,
  };

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <main className="lg:pl-72">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Data Pejabat</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Kelola data pejabat struktural perangkat daerah
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Tambah Pejabat
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Pejabat</p>
                    <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <UserCircle className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Eselon II</p>
                    <p className="text-2xl font-bold text-foreground">{stats.eselon2}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-accent/30 p-3">
                    <UserCircle className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Eselon III</p>
                    <p className="text-2xl font-bold text-foreground">{stats.eselon3}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-muted p-3">
                    <UserCircle className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Eselon IV</p>
                    <p className="text-2xl font-bold text-foreground">{stats.eselon4}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Table */}
          <Card>
            <CardHeader className="border-b">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <CardTitle className="text-lg">Daftar Pejabat</CardTitle>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Cari nama/NIP..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="pl-9 sm:w-64"
                    />
                  </div>
                  <Select value={opdFilter} onValueChange={setOpdFilter}>
                    <SelectTrigger className="w-full sm:w-48">
                      <Filter className="mr-2 h-4 w-4" />
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
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>NIP</TableHead>
                      <TableHead>Nama</TableHead>
                      <TableHead>Jabatan</TableHead>
                      <TableHead>OPD</TableHead>
                      <TableHead>Eselon</TableHead>
                      <TableHead>Golongan</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.map((pejabat) => (
                      <TableRow key={pejabat.id}>
                        <TableCell className="font-mono text-sm">{pejabat.nip}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                              <span className="text-sm font-semibold">
                                {pejabat.nama.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{pejabat.nama}</p>
                              <p className="text-xs text-muted-foreground">{pejabat.pangkat}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{pejabat.jabatan}</TableCell>
                        <TableCell className="text-muted-foreground">{pejabat.namaOpd}</TableCell>
                        <TableCell>
                          <EselonBadge eselon={pejabat.eselon} />
                        </TableCell>
                        <TableCell className="font-medium">{pejabat.golongan}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => setSelectedPejabat(pejabat)}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>Detail Pejabat</DialogTitle>
                                </DialogHeader>
                                {selectedPejabat && (
                                  <div className="grid gap-6 py-4">
                                    <div className="flex items-center gap-4">
                                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                                        <span className="text-2xl font-bold">
                                          {selectedPejabat.nama.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                                        </span>
                                      </div>
                                      <div>
                                        <h3 className="text-xl font-bold text-foreground">{selectedPejabat.nama}</h3>
                                        <p className="text-muted-foreground">{selectedPejabat.jabatan}</p>
                                        <EselonBadge eselon={selectedPejabat.eselon} />
                                      </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div className="flex items-start gap-3">
                                        <UserCircle className="mt-0.5 h-5 w-5 text-muted-foreground" />
                                        <div>
                                          <Label className="text-muted-foreground">NIP</Label>
                                          <p className="font-medium">{selectedPejabat.nip}</p>
                                        </div>
                                      </div>
                                      <div className="flex items-start gap-3">
                                        <Building2 className="mt-0.5 h-5 w-5 text-muted-foreground" />
                                        <div>
                                          <Label className="text-muted-foreground">OPD</Label>
                                          <p className="font-medium">{selectedPejabat.namaOpd}</p>
                                        </div>
                                      </div>
                                      <div className="flex items-start gap-3">
                                        <Users className="mt-0.5 h-5 w-5 text-muted-foreground" />
                                        <div>
                                          <Label className="text-muted-foreground">Pangkat/Golongan</Label>
                                          <p className="font-medium">{selectedPejabat.pangkat} ({selectedPejabat.golongan})</p>
                                        </div>
                                      </div>
                                      <div className="flex items-start gap-3">
                                        <Calendar className="mt-0.5 h-5 w-5 text-muted-foreground" />
                                        <div>
                                          <Label className="text-muted-foreground">TMT Jabatan</Label>
                                          <p className="font-medium">{new Date(selectedPejabat.tmtJabatan).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</p>
                                        </div>
                                      </div>
                                      <div className="col-span-2 flex items-start gap-3">
                                        <GraduationCap className="mt-0.5 h-5 w-5 text-muted-foreground" />
                                        <div>
                                          <Label className="text-muted-foreground">Pendidikan</Label>
                                          <p className="font-medium">{selectedPejabat.pendidikan}</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
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
