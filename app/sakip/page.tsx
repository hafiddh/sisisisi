"use client";

import { useState } from "react";
import {
  Award,
  Upload,
  FileText,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  Download,
  Link as LinkIcon,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { AppSidebar } from "@/components/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { daftarOPD, dokumenSAKIPList, nilaiSAKIPList } from "@/lib/abk-data";

interface UploadedDocument {
  id: string;
  opdId: string;
  namaOpd: string;
  namaDokumen: string;
  jenisDokumen: "renstra" | "renja" | "lakip" | "iku" | "tapkin" | "lainnya";
  linkDokumen?: string;
  filePath?: string;
  tahun: number;
  uploadedAt: string;
  uploadedBy: string;
}

interface ReviewScore {
  id: string;
  dokumentId: string;
  nilaiReview: number;
  catatan: string;
  reviewedBy: string;
  reviewedAt: string;
}

export default function AdminSAKIPPage() {
  const [search, setSearch] = useState("");
  const [opdFilter, setOpdFilter] = useState("all");
  const [jenisFilter, setJenisFilter] = useState("all");
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<UploadedDocument | null>(null);
  
  // Form states
  const [uploadForm, setUploadForm] = useState({
    opdId: "",
    namaDokumen: "",
    jenisDokumen: "renstra" as const,
    linkDokumen: "",
    filePath: "",
    tahun: new Date().getFullYear(),
  });

  const [reviewForm, setReviewForm] = useState({
    nilaiReview: 0,
    catatan: "",
  });

  // Mock data for uploaded documents
  const [uploadedDocuments, setUploadedDocuments] = useState<UploadedDocument[]>([
    {
      id: "DOK001",
      opdId: "OPD001",
      namaOpd: "Bappeda",
      namaDokumen: "Renstra Bappeda 2024-2028",
      jenisDokumen: "renstra",
      linkDokumen: "https://example.com/renstra-bappeda",
      tahun: 2024,
      uploadedAt: "2024-01-15",
      uploadedBy: "Admin Bappeda",
    },
    {
      id: "DOK002",
      opdId: "OPD002",
      namaOpd: "Diskominfo",
      namaDokumen: "LAKIP Diskominfo 2023",
      jenisDokumen: "lakip",
      filePath: "/uploads/lakip-diskominfo-2023.pdf",
      tahun: 2023,
      uploadedAt: "2024-02-01",
      uploadedBy: "Admin Diskominfo",
    },
  ]);

  const [reviewScores, setReviewScores] = useState<ReviewScore[]>([
    {
      id: "REV001",
      dokumentId: "DOK001",
      nilaiReview: 85,
      catatan: "Dokumen renstra sudah lengkap dan sesuai dengan format",
      reviewedBy: "Tim Review SAKIP",
      reviewedAt: "2024-01-20",
    },
  ]);

  const filteredDocuments = uploadedDocuments.filter((doc) => {
    const matchSearch =
      doc.namaDokumen.toLowerCase().includes(search.toLowerCase()) ||
      doc.namaOpd.toLowerCase().includes(search.toLowerCase());
    const matchOpd = opdFilter === "all" || doc.opdId === opdFilter;
    const matchJenis = jenisFilter === "all" || doc.jenisDokumen === jenisFilter;
    return matchSearch && matchOpd && matchJenis;
  });

  const handleUploadSubmit = () => {
    if (!uploadForm.opdId || !uploadForm.namaDokumen) {
      alert("Mohon isi semua field yang diperlukan");
      return;
    }

    const newDoc: UploadedDocument = {
      id: `DOK${Date.now()}`,
      opdId: uploadForm.opdId,
      namaOpd: daftarOPD.find((o) => o.id === uploadForm.opdId)?.nama || "",
      namaDokumen: uploadForm.namaDokumen,
      jenisDokumen: uploadForm.jenisDokumen,
      linkDokumen: uploadForm.linkDokumen,
      filePath: uploadForm.filePath,
      tahun: uploadForm.tahun,
      uploadedAt: new Date().toISOString().split("T")[0],
      uploadedBy: "Admin",
    };

    setUploadedDocuments([...uploadedDocuments, newDoc]);
    setUploadForm({
      opdId: "",
      namaDokumen: "",
      jenisDokumen: "renstra",
      linkDokumen: "",
      filePath: "",
      tahun: new Date().getFullYear(),
    });
    setUploadDialogOpen(false);
  };

  const handleReviewSubmit = () => {
    if (!selectedDocument || reviewForm.nilaiReview < 0 || reviewForm.nilaiReview > 100) {
      alert("Nilai harus antara 0-100");
      return;
    }

    const newReview: ReviewScore = {
      id: `REV${Date.now()}`,
      dokumentId: selectedDocument.id,
      nilaiReview: reviewForm.nilaiReview,
      catatan: reviewForm.catatan,
      reviewedBy: "Admin",
      reviewedAt: new Date().toISOString().split("T")[0],
    };

    setReviewScores([...reviewScores, newReview]);
    setReviewForm({ nilaiReview: 0, catatan: "" });
    setReviewDialogOpen(false);
    setSelectedDocument(null);
  };

  const handleDeleteDocument = (id: string) => {
    setUploadedDocuments(uploadedDocuments.filter((doc) => doc.id !== id));
  };

  const getReviewForDocument = (docId: string) => {
    return reviewScores.find((rev) => rev.dokumentId === docId);
  };

  const stats = {
    totalDokumen: uploadedDocuments.length,
    sudahDireview: reviewScores.length,
    belumDireview: uploadedDocuments.length - reviewScores.length,
  };

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <main className="lg:pl-72">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Capaian SAKIP</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Kelola dokumen dan nilai review SAKIP (Sistem Akuntabilitas Kinerja Instansi Pemerintah)
              </p>
            </div>
            <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Upload className="h-4 w-4" />
                  Upload Dokumen SAKIP
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Upload Dokumen SAKIP</DialogTitle>
                  <DialogDescription>
                    Upload dokumen SAKIP atau link eksternal ke file SAKIP
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="opd">Organisasi Perangkat Daerah (OPD) *</Label>
                    <Select value={uploadForm.opdId} onValueChange={(value) => setUploadForm({ ...uploadForm, opdId: value })}>
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
                    <Label htmlFor="nama-dokumen">Nama Dokumen *</Label>
                    <Input
                      id="nama-dokumen"
                      placeholder="Contoh: Renstra 2024-2028"
                      value={uploadForm.namaDokumen}
                      onChange={(e) =>
                        setUploadForm({ ...uploadForm, namaDokumen: e.target.value })
                      }
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="jenis">Jenis Dokumen *</Label>
                      <Select
                        value={uploadForm.jenisDokumen}
                        onValueChange={(value) =>
                          setUploadForm({
                            ...uploadForm,
                            jenisDokumen: value as UploadedDocument["jenisDokumen"],
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="renstra">Renstra</SelectItem>
                          <SelectItem value="renja">Renja</SelectItem>
                          <SelectItem value="lakip">LAKIP</SelectItem>
                          <SelectItem value="iku">IKU</SelectItem>
                          <SelectItem value="tapkin">Tapkin</SelectItem>
                          <SelectItem value="lainnya">Lainnya</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tahun">Tahun *</Label>
                      <Input
                        id="tahun"
                        type="number"
                        value={uploadForm.tahun}
                        onChange={(e) =>
                          setUploadForm({ ...uploadForm, tahun: parseInt(e.target.value) })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="link">Link Eksternal (Opsional)</Label>
                    <Input
                      id="link"
                      placeholder="https://..."
                      value={uploadForm.linkDokumen}
                      onChange={(e) =>
                        setUploadForm({ ...uploadForm, linkDokumen: e.target.value })
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      Jika dokumen sudah tersimpan di website lain
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="file">Upload File (Opsional)</Label>
                    <Input
                      id="file"
                      type="file"
                      accept=".pdf,.doc,.docx,.xlsx"
                      onChange={(e) => {
                        // In a real app, this would handle file upload
                        if (e.target.files?.[0]) {
                          setUploadForm({
                            ...uploadForm,
                            filePath: `/uploads/${e.target.files[0].name}`,
                          });
                        }
                      }}
                    />
                    <p className="text-xs text-muted-foreground">
                      Format: PDF, DOC, DOCX, XLSX. Max 10MB
                    </p>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>
                    Batal
                  </Button>
                  <Button onClick={handleUploadSubmit}>Upload</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats */}
          <div className="mb-6 grid gap-4 sm:grid-cols-3">
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary">
                  <FileText className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.totalDokumen}</p>
                  <p className="text-sm text-muted-foreground">Total Dokumen</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-500">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.sudahDireview}</p>
                  <p className="text-sm text-muted-foreground">Sudah Direview</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-yellow-500">
                  <AlertCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.belumDireview}</p>
                  <p className="text-sm text-muted-foreground">Belum Direview</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filter */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Cari dokumen..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={opdFilter} onValueChange={setOpdFilter}>
                  <SelectTrigger className="w-full sm:w-48">
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
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Filter Jenis" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Jenis</SelectItem>
                    <SelectItem value="renstra">Renstra</SelectItem>
                    <SelectItem value="renja">Renja</SelectItem>
                    <SelectItem value="lakip">LAKIP</SelectItem>
                    <SelectItem value="iku">IKU</SelectItem>
                    <SelectItem value="tapkin">Tapkin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Documents Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Daftar Dokumen SAKIP</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nama Dokumen</TableHead>
                      <TableHead>OPD</TableHead>
                      <TableHead>Jenis</TableHead>
                      <TableHead className="text-center">Tahun</TableHead>
                      <TableHead>Nilai Review</TableHead>
                      <TableHead>Upload Oleh</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDocuments.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="py-8 text-center text-muted-foreground">
                          Tidak ada dokumen ditemukan
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredDocuments.map((doc) => {
                        const review = getReviewForDocument(doc.id);
                        return (
                          <TableRow key={doc.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium text-foreground">{doc.namaDokumen}</p>
                                <p className="text-xs text-muted-foreground">
                                  {new Date(doc.uploadedAt).toLocaleDateString("id-ID")}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell className="text-muted-foreground">{doc.namaOpd}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{doc.jenisDokumen.toUpperCase()}</Badge>
                            </TableCell>
                            <TableCell className="text-center">{doc.tahun}</TableCell>
                            <TableCell>
                              {review ? (
                                <Badge className="bg-green-100 text-green-700">
                                  {review.nilaiReview}
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="text-yellow-600">
                                  Belum Review
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {doc.uploadedBy}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-1">
                                {doc.linkDokumen && (
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    asChild
                                    title="Buka link dokumen"
                                  >
                                    <a
                                      href={doc.linkDokumen}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <LinkIcon className="h-4 w-4" />
                                    </a>
                                  </Button>
                                )}
                                <Dialog open={reviewDialogOpen && selectedDocument?.id === doc.id} onOpenChange={(open) => {
                                  if (open) {
                                    setSelectedDocument(doc);
                                  }
                                  setReviewDialogOpen(open);
                                }}>
                                  <DialogTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => {
                                        setSelectedDocument(doc);
                                        setReviewDialogOpen(true);
                                      }}
                                      title="Review dokumen"
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                  </DialogTrigger>
                                </Dialog>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-destructive"
                                  onClick={() => handleDeleteDocument(doc.id)}
                                  title="Hapus dokumen"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Review Dialog */}
      <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Review Dokumen SAKIP</DialogTitle>
            <DialogDescription>
              {selectedDocument?.namaOpd} - {selectedDocument?.namaDokumen}
            </DialogDescription>
          </DialogHeader>
          {selectedDocument && (
            <div className="space-y-4 py-4">
              <div className="rounded-lg bg-muted p-4">
                <p className="text-sm text-muted-foreground">Dokumen</p>
                <p className="font-medium text-foreground">{selectedDocument.namaDokumen}</p>
                <div className="mt-2 grid gap-2 text-sm">
                  <p>
                    <span className="text-muted-foreground">OPD:</span>{" "}
                    <span className="font-medium">{selectedDocument.namaOpd}</span>
                  </p>
                  <p>
                    <span className="text-muted-foreground">Jenis:</span>{" "}
                    <span className="font-medium">{selectedDocument.jenisDokumen.toUpperCase()}</span>
                  </p>
                  <p>
                    <span className="text-muted-foreground">Tahun:</span>{" "}
                    <span className="font-medium">{selectedDocument.tahun}</span>
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nilai">Nilai Review (0-100) *</Label>
                <Input
                  id="nilai"
                  type="number"
                  min="0"
                  max="100"
                  value={reviewForm.nilaiReview}
                  onChange={(e) =>
                    setReviewForm({ ...reviewForm, nilaiReview: parseInt(e.target.value) || 0 })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="catatan">Catatan Review</Label>
                <Textarea
                  id="catatan"
                  placeholder="Masukkan catatan atau feedback..."
                  value={reviewForm.catatan}
                  onChange={(e) => setReviewForm({ ...reviewForm, catatan: e.target.value })}
                  rows={4}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setReviewDialogOpen(false);
                setSelectedDocument(null);
                setReviewForm({ nilaiReview: 0, catatan: "" });
              }}
            >
              Batal
            </Button>
            <Button onClick={handleReviewSubmit}>Simpan Review</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
