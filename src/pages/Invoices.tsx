
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MoreVertical,
  Filter, 
  Plus, 
  Search,
  FileText,
  Download,
  Send
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Invoices = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Devis & Factures</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle Facture
        </Button>
      </div>

      <Tabs defaultValue="invoices" className="w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <TabsList>
            <TabsTrigger value="invoices">Factures</TabsTrigger>
            <TabsTrigger value="quotes">Devis</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input 
                className="pl-8 w-full sm:w-[250px]" 
                placeholder="Rechercher..." 
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="invoices">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Factures</CardTitle>
              <CardDescription>
                Gérez toutes vos factures clients
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">No.</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Client</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Date</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Montant</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Statut</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <tr key={i} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <td className="p-4 align-middle">FAC-{2023000 + i}</td>
                          <td className="p-4 align-middle">Client {i}</td>
                          <td className="p-4 align-middle">{`${i}/05/2023`}</td>
                          <td className="p-4 align-middle">{`${i * 1000} MAD`}</td>
                          <td className="p-4 align-middle">
                            <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                              i % 3 === 0 ? "bg-yellow-50 text-yellow-800" : 
                              i % 3 === 1 ? "bg-green-50 text-green-800" : 
                              "bg-red-50 text-red-800"
                            }`}>
                              {i % 3 === 0 ? "En attente" : i % 3 === 1 ? "Payée" : "En retard"}
                            </span>
                          </td>
                          <td className="p-4 align-middle">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <FileText className="mr-2 h-4 w-4" />
                                  <span>Voir</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Download className="mr-2 h-4 w-4" />
                                  <span>Télécharger</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Send className="mr-2 h-4 w-4" />
                                  <span>Envoyer</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quotes">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Devis</CardTitle>
              <CardDescription>
                Gérez tous vos devis clients
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">No.</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Client</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Date</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Montant</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Statut</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                      {[1, 2, 3, 4].map((i) => (
                        <tr key={i} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <td className="p-4 align-middle">DEV-{2023000 + i}</td>
                          <td className="p-4 align-middle">Client {i}</td>
                          <td className="p-4 align-middle">{`${i}/04/2023`}</td>
                          <td className="p-4 align-middle">{`${i * 1500} MAD`}</td>
                          <td className="p-4 align-middle">
                            <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                              i % 2 === 0 ? "bg-blue-50 text-blue-800" : "bg-purple-50 text-purple-800"
                            }`}>
                              {i % 2 === 0 ? "En cours" : "Accepté"}
                            </span>
                          </td>
                          <td className="p-4 align-middle">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <FileText className="mr-2 h-4 w-4" />
                                  <span>Voir</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Download className="mr-2 h-4 w-4" />
                                  <span>Télécharger</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Send className="mr-2 h-4 w-4" />
                                  <span>Envoyer</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Invoices;
