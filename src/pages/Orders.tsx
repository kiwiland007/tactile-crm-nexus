
import React from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  ShoppingCart, 
  Search,
  Filter, 
  Package,
  Clock,
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Orders = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Commandes</h1>
        <p className="text-gray-500">Gestion des commandes clients</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Liste des Commandes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                className="pl-10"
                placeholder="Rechercher une commande..."
              />
            </div>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="processing">En cours</SelectItem>
                  <SelectItem value="shipped">Expédiée</SelectItem>
                  <SelectItem value="delivered">Livrée</SelectItem>
                  <SelectItem value="cancelled">Annulée</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left font-medium">Commande</th>
                  <th className="py-3 px-4 text-left font-medium">Client</th>
                  <th className="py-3 px-4 text-left font-medium">Date</th>
                  <th className="py-3 px-4 text-left font-medium">Statut</th>
                  <th className="py-3 px-4 text-left font-medium">Montant</th>
                  <th className="py-3 px-4 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="py-3 px-4 font-medium">#ORD-2025-001</td>
                  <td className="py-3 px-4">Entreprise Alpha</td>
                  <td className="py-3 px-4">03/05/2025</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-amber-500" />
                      <span className="text-amber-500">En attente</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">3 500,00 €</td>
                  <td className="py-3 px-4">
                    <Button variant="ghost" size="sm">Détails</Button>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">#ORD-2025-002</td>
                  <td className="py-3 px-4">Société Beta</td>
                  <td className="py-3 px-4">01/05/2025</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-blue-500" />
                      <span className="text-blue-500">En cours</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">2 780,00 €</td>
                  <td className="py-3 px-4">
                    <Button variant="ghost" size="sm">Détails</Button>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">#ORD-2025-003</td>
                  <td className="py-3 px-4">Gamma Corp</td>
                  <td className="py-3 px-4">28/04/2025</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-green-500">Livrée</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">5 960,00 €</td>
                  <td className="py-3 px-4">
                    <Button variant="ghost" size="sm">Détails</Button>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">#ORD-2025-004</td>
                  <td className="py-3 px-4">Delta Technologies</td>
                  <td className="py-3 px-4">25/04/2025</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      <span className="text-red-500">Annulée</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">1 250,00 €</td>
                  <td className="py-3 px-4">
                    <Button variant="ghost" size="sm">Détails</Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Orders;
