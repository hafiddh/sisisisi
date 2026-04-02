"use client";

import { useState } from "react";
import {
  Building2,
  Users,
  ChevronDown,
  ChevronRight,
  Search,
  Download,
  Printer,
} from "lucide-react";
import { AppSidebar } from "@/components/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { daftarOPD, strukturOrganisasiList, type StrukturOrganisasi } from "@/lib/abk-data";
import { cn } from "@/lib/utils";

interface OrgNodeProps {
  node: StrukturOrganisasi;
  children?: StrukturOrganisasi[];
  allNodes: StrukturOrganisasi[];
  isExpanded: boolean;
  onToggle: (id: string) => void;
}

function OrgNode({ node, allNodes, isExpanded, onToggle }: OrgNodeProps) {
  const childNodes = allNodes.filter((n) => n.parentId === node.id);
  const hasChildren = childNodes.length > 0;

  return (
    <div className="relative">
      <div
        className={cn(
          "flex items-center gap-3 rounded-lg border bg-card p-4 transition-all hover:shadow-md",
          node.level === 1 && "border-primary bg-primary/5",
          node.level === 2 && "border-accent bg-accent/10",
          node.level === 3 && "border-border"
        )}
      >
        {hasChildren && (
          <button
            onClick={() => onToggle(node.id)}
            className="rounded p-1 hover:bg-muted"
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
        )}
        {!hasChildren && <div className="w-6" />}
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
          <Users className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-foreground">{node.jabatan}</p>
          {node.nama ? (
            <div>
              <p className="text-sm text-muted-foreground">{node.nama}</p>
              <p className="text-xs text-muted-foreground">NIP: {node.nip}</p>
            </div>
          ) : (
            <p className="text-sm italic text-muted-foreground">Belum terisi</p>
          )}
        </div>
      </div>
      {hasChildren && isExpanded && (
        <div className="ml-8 mt-2 space-y-2 border-l-2 border-dashed border-muted pl-4">
          {childNodes.map((child) => (
            <OrgNode
              key={child.id}
              node={child}
              allNodes={allNodes}
              isExpanded={isExpanded}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function StrukturOrganisasiPage() {
  const [selectedOpd, setSelectedOpd] = useState("OPD001");
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(["SO001", "SO002"]));

  const filteredStruktur = strukturOrganisasiList.filter(
    (s) => s.opdId === selectedOpd
  );
  const rootNodes = filteredStruktur.filter((s) => !s.parentId);

  const selectedOpdData = daftarOPD.find((o) => o.id === selectedOpd);

  const toggleNode = (id: string) => {
    setExpandedNodes((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const expandAll = () => {
    setExpandedNodes(new Set(filteredStruktur.map((s) => s.id)));
  };

  const collapseAll = () => {
    setExpandedNodes(new Set());
  };

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <main className="lg:pl-72">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Struktur Organisasi</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Visualisasi struktur organisasi perangkat daerah
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <Printer className="h-4 w-4" />
                Cetak
              </Button>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          {/* Filter */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <label className="text-sm font-medium text-foreground">Pilih OPD:</label>
                  <Select value={selectedOpd} onValueChange={setSelectedOpd}>
                    <SelectTrigger className="w-full sm:w-80">
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
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={expandAll}>
                    Expand All
                  </Button>
                  <Button variant="outline" size="sm" onClick={collapseAll}>
                    Collapse All
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* OPD Info */}
          {selectedOpdData && (
            <Card className="mb-6 border-l-4 border-l-primary">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <Building2 className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">{selectedOpdData.nama}</h2>
                    <p className="text-sm text-muted-foreground">
                      Total {filteredStruktur.length} posisi jabatan
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Org Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Bagan Struktur
              </CardTitle>
            </CardHeader>
            <CardContent>
              {rootNodes.length > 0 ? (
                <div className="space-y-4">
                  {rootNodes.map((node) => (
                    <OrgNode
                      key={node.id}
                      node={node}
                      allNodes={filteredStruktur}
                      isExpanded={expandedNodes.has(node.id)}
                      onToggle={toggleNode}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Building2 className="mb-4 h-12 w-12 text-muted-foreground/50" />
                  <p className="text-muted-foreground">
                    Belum ada data struktur organisasi untuk OPD ini
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Legend */}
          <Card className="mt-6">
            <CardContent className="pt-6">
              <p className="mb-3 text-sm font-medium text-foreground">Keterangan:</p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded border-2 border-primary bg-primary/5"></div>
                  <span className="text-sm text-muted-foreground">Pimpinan (Eselon II)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded border-2 border-accent bg-accent/10"></div>
                  <span className="text-sm text-muted-foreground">Eselon III</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded border-2 border-border bg-card"></div>
                  <span className="text-sm text-muted-foreground">Eselon IV / Staff</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
