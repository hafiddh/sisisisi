"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Pencil, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const opdData = [
  {
    id: 1,
    nama: "Dinas Pendidikan",
    jenis: "Dinas",
    pejabat: "Dr. Ahmad Suryadi, M.Pd",
    jumlahPegawai: 245,
    statusAnjab: "Selesai",
    statusAbk: "Selesai",
  },
  {
    id: 2,
    nama: "Dinas Kesehatan",
    jenis: "Dinas",
    pejabat: "dr. Siti Rahayu, Sp.PD",
    jumlahPegawai: 312,
    statusAnjab: "Selesai",
    statusAbk: "Proses",
  },
  {
    id: 3,
    nama: "Badan Kepegawaian Daerah",
    jenis: "Badan",
    pejabat: "Ir. Budi Santoso, MM",
    jumlahPegawai: 78,
    statusAnjab: "Proses",
    statusAbk: "Belum",
  },
  {
    id: 4,
    nama: "Dinas Pekerjaan Umum",
    jenis: "Dinas",
    pejabat: "Ir. Hendra Wijaya, MT",
    jumlahPegawai: 189,
    statusAnjab: "Selesai",
    statusAbk: "Selesai",
  },
  {
    id: 5,
    nama: "Sekretariat Daerah",
    jenis: "Sekretariat",
    pejabat: "Drs. Agus Prasetyo, M.Si",
    jumlahPegawai: 156,
    statusAnjab: "Selesai",
    statusAbk: "Proses",
  },
];

function StatusBadge({ status }: { status: string }) {
  const variants: Record<string, "default" | "secondary" | "outline"> = {
    Selesai: "default",
    Proses: "secondary",
    Belum: "outline",
  };

  return (
    <Badge
      variant={variants[status] || "outline"}
      className={
        status === "Selesai"
          ? "bg-green-100 text-green-800 hover:bg-green-100"
          : status === "Proses"
          ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
          : "bg-gray-100 text-gray-800 hover:bg-gray-100"
      }
    >
      {status}
    </Badge>
  );
}

export function OPDTable() {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Daftar OPD</CardTitle>
            <CardDescription>
              Data Organisasi Perangkat Daerah dan status kelengkapan dokumen
            </CardDescription>
          </div>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            + Tambah OPD
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama OPD</TableHead>
                <TableHead>Jenis</TableHead>
                <TableHead className="hidden md:table-cell">Kepala</TableHead>
                <TableHead className="hidden sm:table-cell">Pegawai</TableHead>
                <TableHead>Anjab</TableHead>
                <TableHead>ABK</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {opdData.map((opd) => (
                <TableRow key={opd.id}>
                  <TableCell className="font-medium">{opd.nama}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{opd.jenis}</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {opd.pejabat}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {opd.jumlahPegawai}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={opd.statusAnjab} />
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={opd.statusAbk} />
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          Lihat Detail
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
