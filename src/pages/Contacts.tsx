
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
  CardHeader, 
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  MoreVertical,
  Filter,
  Plus,
  Search,
  SlidersHorizontal,
  UserPlus,
  Mail,
  Phone,
} from "lucide-react";

// Mock data
const contacts = [
  {
    id: "1",
    name: "Société Marocaine de Technologie",
    type: "client",
    contact: "Hassan Alaoui",
    email: "h.alaoui@soctech.ma",
    phone: "+212 522 123 456",
    city: "Casablanca",
    source: "Référence",
    status: "actif",
  },
  {
    id: "2",
    name: "Groupe Hôtelier Atlas",
    type: "client",
    contact: "Nadia Benkaddour",
    email: "n.benkaddour@atlas-hotels.ma",
    phone: "+212 528 987 654",
    city: "Marrakech",
    source: "Site web",
    status: "actif",
  },
  {
    id: "3",
    name: "Université Mohammed VI",
    type: "client",
    contact: "Karim Bensouda",
    email: "k.bensouda@um6p.ma",
    phone: "+212 525 789 123",
    city: "Ben Guerir",
    source: "Événement",
    status: "actif",
  },
  {
    id: "4",
    name: "Centre Commercial Morocco Mall",
    type: "prospect",
    contact: "Yasmine Tazi",
    email: "y.tazi@moroccomall.ma",
    phone: "+212 522 456 789",
    city: "Casablanca",
    source: "LinkedIn",
    status: "en_discussion",
  },
  {
    id: "5",
    name: "Agence Digitale WebMaroc",
    type: "prospect",
    contact: "Omar Bennani",
    email: "o.bennani@webmaroc.ma",
    phone: "+212 537 123 789",
    city: "Rabat",
    source: "Facebook",
    status: "nouveau",
  },
  {
    id: "6",
    name: "Clinique Internationale",
    type: "prospect",
    contact: "Fatima Alami",
    email: "f.alami@clinique-inter.ma",
    phone: "+212 522 333 444",
    city: "Casablanca",
    source: "Publicité",
    status: "en_discussion",
  },
  {
    id: "7",
    name: "Banque Populaire",
    type: "client",
    contact: "Mohammed Berrada",
    email: "m.berrada@bpm.ma",
    phone: "+212 522 222 333",
    city: "Casablanca",
    source: "Partenaire",
    status: "actif",
  },
  {
    id: "8",
    name: "Royal Air Maroc",
    type: "client",
    contact: "Salma Chraibi",
    email: "s.chraibi@ram.ma",
    phone: "+212 522 111 222",
    city: "Casablanca",
    source: "Référence",
    status: "inactif",
  },
];

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case "actif":
      return "bg-green-100 text-green-800";
    case "inactif":
      return "bg-gray-100 text-gray-800";
    case "en_discussion":
      return "bg-blue-100 text-blue-800";
    case "nouveau":
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "actif":
      return "Actif";
    case "inactif":
      return "Inactif";
    case "en_discussion":
      return "En discussion";
    case "nouveau":
      return "Nouveau";
    default:
      return status;
  }
};

const Contacts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTab, setCurrentTab] = useState("all");
  
  // Filter contacts based on search query and tab
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = 
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      contact.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (currentTab === "all") return matchesSearch;
    if (currentTab === "clients") return matchesSearch && contact.type === "client";
    if (currentTab === "prospects") return matchesSearch && contact.type === "prospect";
    
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Clients & Prospects</h1>
          <p className="text-muted-foreground">
            Gérez vos contacts, suivez les interactions et les opportunités
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filtres
          </Button>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Nouveau Contact
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Rechercher par nom, contact ou email..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" onValueChange={setCurrentTab}>
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="all">Tous</TabsTrigger>
                <TabsTrigger value="clients">Clients</TabsTrigger>
                <TabsTrigger value="prospects">Prospects</TabsTrigger>
              </TabsList>
              <div className="text-sm text-muted-foreground">
                {filteredContacts.length} contacts
              </div>
            </div>
            
            <TabsContent value="all" className="m-0">
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead className="hidden md:table-cell">Contact</TableHead>
                      <TableHead className="hidden lg:table-cell">Email</TableHead>
                      <TableHead className="hidden xl:table-cell">Téléphone</TableHead>
                      <TableHead className="hidden sm:table-cell">Ville</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredContacts.map((contact) => (
                      <TableRow key={contact.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{contact.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {contact.type === "client" ? "Client" : "Prospect"}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{contact.contact}</TableCell>
                        <TableCell className="hidden lg:table-cell">{contact.email}</TableCell>
                        <TableCell className="hidden xl:table-cell">{contact.phone}</TableCell>
                        <TableCell className="hidden sm:table-cell">{contact.city}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={getStatusBadgeClass(contact.status)}
                          >
                            {getStatusLabel(contact.status)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2 justify-end">
                            <Button size="icon" variant="ghost">
                              <Mail className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="ghost">
                              <Phone className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button size="icon" variant="ghost">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Voir les détails</DropdownMenuItem>
                                <DropdownMenuItem>Éditer</DropdownMenuItem>
                                <DropdownMenuItem>Créer un devis</DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">Supprimer</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="clients" className="m-0">
              {/* Content for clients tab - identical structure but filtered */}
              <div className="rounded-md border overflow-hidden">
                <Table>
                  {/* Same table structure as "all" tab */}
                  {/* ... */}
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="prospects" className="m-0">
              {/* Content for prospects tab - identical structure but filtered */}
              <div className="rounded-md border overflow-hidden">
                <Table>
                  {/* Same table structure as "all" tab */}
                  {/* ... */}
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Contacts;
