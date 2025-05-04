
import React, { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { 
  DotsVertical,
  Filter, 
  Plus, 
  QrCode,
  Search, 
  AlertTriangle,
} from "lucide-react";
import { 
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// Mock data for inventory
const inventoryItems = [
  {
    id: "1",
    name: "Écran tactile 32\" HD",
    reference: "ECR-32HD-01",
    category: "Écran",
    status: "disponible",
    quantity: 28,
    critical: 10,
    salePrice: 12500,
    rentalPrice: 1500,
    location: "Entrepôt A",
  },
  {
    id: "2",
    name: "Écran tactile 55\" 4K",
    reference: "ECR-55-4K-02",
    category: "Écran",
    status: "disponible",
    quantity: 14,
    critical: 5,
    salePrice: 28000,
    rentalPrice: 2800,
    location: "Entrepôt A",
  },
  {
    id: "3",
    name: "Borne interactive standard",
    reference: "BRN-STD-01",
    category: "Borne",
    status: "disponible",
    quantity: 8,
    critical: 5,
    salePrice: 35000,
    rentalPrice: 4000,
    location: "Entrepôt B",
  },
  {
    id: "4",
    name: "Borne interactive extérieur",
    reference: "BRN-EXT-02",
    category: "Borne",
    status: "critique",
    quantity: 3,
    critical: 4,
    salePrice: 48000,
    rentalPrice: 5500,
    location: "Entrepôt B",
  },
  {
    id: "5",
    name: "Tablette Android 10\"",
    reference: "TAB-AND-01",
    category: "Tablette",
    status: "critique",
    quantity: 15,
    critical: 20,
    salePrice: 3500,
    rentalPrice: 500,
    location: "Entrepôt A",
  },
  {
    id: "6",
    name: "Mur LED intérieur 2x2m",
    reference: "LED-IN-01",
    category: "LED",
    status: "disponible",
    quantity: 6,
    critical: 3,
    salePrice: 75000,
    rentalPrice: 8000,
    location: "Entrepôt C",
  },
  {
    id: "7",
    name: "Écran transparent LED",
    reference: "ECR-TRANS-01",
    category: "Écran",
    status: "indisponible",
    quantity: 0,
    critical: 2,
    salePrice: 95000,
    rentalPrice: 12000,
    location: "Entrepôt C",
  },
  {
    id: "8",
    name: "Kiosque tactile",
    reference: "KSQ-01",
    category: "Borne",
    status: "maintenance",
    quantity: 4,
    critical: 3,
    salePrice: 28000,
    rentalPrice: 3200,
    location: "Maintenance",
  },
];

// Get status badge color
const getStatusBadge = (status: string, quantity: number, critical: number) => {
  if (status === "maintenance") {
    return <Badge variant="outline" className="bg-amber-100 text-amber-800">En maintenance</Badge>;
  }
  if (status === "indisponible" || quantity === 0) {
    return <Badge variant="outline" className="bg-red-100 text-red-800">Indisponible</Badge>;
  }
  if (quantity <= critical) {
    return <Badge variant="outline" className="bg-orange-100 text-orange-800">Stock critique</Badge>;
  }
  return <Badge variant="outline" className="bg-green-100 text-green-800">Disponible</Badge>;
};

// Format price in MAD
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('fr-MA', { 
    style: 'currency', 
    currency: 'MAD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const Inventory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTab, setCurrentTab] = useState("all");
  
  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.reference.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (currentTab === "all") return matchesSearch;
    if (currentTab === "available") return matchesSearch && item.quantity > 0 && item.status !== "maintenance";
    if (currentTab === "critical") return matchesSearch && item.quantity <= item.critical;
    if (currentTab === "maintenance") return matchesSearch && item.status === "maintenance";
    
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Gestion de Stock</h1>
          <p className="text-muted-foreground">
            Gérez votre inventaire d'écrans, bornes et matériel tactile
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <QrCode className="mr-2 h-4 w-4" />
            Scanner QR
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Ajouter un Produit
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total produits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78</div>
            <p className="mt-2 text-xs text-muted-foreground">
              8 catégories différentes
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              En stock
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">54</div>
            <p className="mt-2 text-xs text-muted-foreground">
              24 actuellement loués
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2 text-orange-500" />
              Stock critique
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="mt-2 text-xs text-muted-foreground">
              Produits à commander
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Rechercher par nom ou référence..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filtrer
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" onValueChange={setCurrentTab}>
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="all">Tous</TabsTrigger>
                <TabsTrigger value="available">Disponibles</TabsTrigger>
                <TabsTrigger value="critical">Stock critique</TabsTrigger>
                <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
              </TabsList>
              <div className="text-sm text-muted-foreground">
                {filteredItems.length} produits
              </div>
            </div>
            
            <TabsContent value="all" className="m-0">
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Produit</TableHead>
                      <TableHead className="hidden md:table-cell">Référence</TableHead>
                      <TableHead className="hidden lg:table-cell">Catégorie</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead className="hidden xl:table-cell">Prix Vente</TableHead>
                      <TableHead className="hidden sm:table-cell">Prix Location</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-sm text-muted-foreground md:hidden">
                              {item.reference}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {item.reference}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">{item.category}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell className="hidden xl:table-cell">{formatPrice(item.salePrice)}</TableCell>
                        <TableCell className="hidden sm:table-cell">{formatPrice(item.rentalPrice)}/jour</TableCell>
                        <TableCell>
                          {getStatusBadge(item.status, item.quantity, item.critical)}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size="icon" variant="ghost">
                                <DotsVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Voir détails</DropdownMenuItem>
                              <DropdownMenuItem>Modifier</DropdownMenuItem>
                              <DropdownMenuItem>Générer QR Code</DropdownMenuItem>
                              <DropdownMenuItem>Historique</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="available" className="m-0">
              {/* Same table structure but filtered */}
            </TabsContent>
            
            <TabsContent value="critical" className="m-0">
              {/* Same table structure but filtered */}
            </TabsContent>
            
            <TabsContent value="maintenance" className="m-0">
              {/* Same table structure but filtered */}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Inventory;
