
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  Calendar as CalendarIcon,
  Check,
  Filter,
  Package,
  Plus,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

// Mock data for equipment
const equipmentItems = [
  {
    id: "1",
    name: "Écran tactile 55\" 4K",
    category: "écrans",
    status: "available",
    total: 12,
    available: 8,
    reserved: 4,
    imageUrl: "/placeholder.svg",
  },
  {
    id: "2",
    name: "Borne interactive standard",
    category: "bornes",
    status: "available",
    total: 8,
    available: 3,
    reserved: 5,
    imageUrl: "/placeholder.svg",
  },
  {
    id: "3",
    name: "Tablette Android 10\"",
    category: "tablettes",
    status: "available",
    total: 25,
    available: 17,
    reserved: 8,
    imageUrl: "/placeholder.svg",
  },
  {
    id: "4",
    name: "Écran LED extérieur 2x2m",
    category: "écrans",
    status: "limited",
    total: 4,
    available: 1,
    reserved: 3,
    imageUrl: "/placeholder.svg",
  },
  {
    id: "5",
    name: "Kiosque tactile",
    category: "bornes",
    status: "unavailable",
    total: 6,
    available: 0,
    reserved: 6,
    imageUrl: "/placeholder.svg",
  }
];

// Mock data for events
const events = [
  {
    id: "1",
    name: "Salon Digital Tech - Casablanca",
    startDate: new Date(2025, 4, 15),
    endDate: new Date(2025, 4, 17),
  },
  {
    id: "2",
    name: "Formation Banque Populaire",
    startDate: new Date(2025, 4, 18),
    endDate: new Date(2025, 4, 18),
  },
  {
    id: "3",
    name: "Installation Mall of Morocco",
    startDate: new Date(2025, 4, 29),
    endDate: new Date(2025, 5, 2),
  }
];

const EquipmentReservation = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  
  const getStatusBadge = (status: string) => {
    const statuses: {[key: string]: {label: string, style: string}} = {
      available: { label: "Disponible", style: "bg-green-100 text-green-800 border-green-200" },
      limited: { label: "Stock limité", style: "bg-amber-100 text-amber-800 border-amber-200" },
      unavailable: { label: "Indisponible", style: "bg-red-100 text-red-800 border-red-200" },
    };
    
    const statusInfo = statuses[status] || { label: status, style: "bg-gray-100 text-gray-800 border-gray-200" };
    
    return (
      <Badge variant="outline" className={statusInfo.style}>
        {statusInfo.label}
      </Badge>
    );
  };
  
  const filteredEquipment = equipmentItems.filter((item) => {
    const matchesSearch = searchTerm === "" || 
      item.name.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Catalogue des Équipements
        </CardTitle>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Réserver du Matériel
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Réserver du Matériel</DialogTitle>
              <DialogDescription>
                Sélectionnez un événement et la période de réservation.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Événement</label>
                <Select onValueChange={setSelectedEvent}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un événement" />
                  </SelectTrigger>
                  <SelectContent>
                    {events.map((event) => (
                      <SelectItem key={event.id} value={event.id}>
                        {event.name}
                      </SelectItem>
                    ))}
                    <SelectItem value="new">+ Nouvel événement</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date de début</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left"
                      >
                        {startDate ? (
                          format(startDate, "dd MMM yyyy", { locale: fr })
                        ) : (
                          <span>Sélectionner</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date de fin</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left"
                      >
                        {endDate ? (
                          format(endDate, "dd MMM yyyy", { locale: fr })
                        ) : (
                          <span>Sélectionner</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        initialFocus
                        fromDate={startDate}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Équipements</label>
                <div className="space-y-2">
                  {equipmentItems
                    .filter(item => item.status !== "unavailable")
                    .slice(0, 3)
                    .map(item => (
                      <div key={item.id} className="flex items-center justify-between border p-2 rounded-md">
                        <div className="flex items-center gap-2">
                          <img 
                            src={item.imageUrl} 
                            alt={item.name} 
                            className="h-8 w-8 rounded-md object-cover" 
                          />
                          <div>
                            <div className="text-sm font-medium">{item.name}</div>
                            <div className="text-xs text-muted-foreground">
                              Disponible: {item.available}/{item.total}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0">-</Button>
                          <span className="w-8 text-center">0</span>
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0">+</Button>
                        </div>
                      </div>
                    ))}
                    
                    <Button variant="outline" className="w-full">
                      <Plus className="mr-2 h-4 w-4" />
                      Ajouter d'autres équipements
                    </Button>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline">Annuler</Button>
              <Button>Confirmer la réservation</Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              className="pl-10"
              placeholder="Rechercher un équipement..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select 
              defaultValue="all"
              onValueChange={setCategoryFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                <SelectItem value="écrans">Écrans</SelectItem>
                <SelectItem value="bornes">Bornes</SelectItem>
                <SelectItem value="tablettes">Tablettes</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>Équipement</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Disponibles</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEquipment.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <img 
                      src={item.imageUrl} 
                      alt={item.name} 
                      className="h-10 w-10 rounded-md object-cover" 
                    />
                  </TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="capitalize">{item.category}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell className="text-right">{item.available}</TableCell>
                  <TableCell className="text-right">{item.total}</TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm"
                      disabled={item.status === "unavailable"}
                    >
                      Réserver
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default EquipmentReservation;
