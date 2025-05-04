
import React from "react";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock data
const recentClients = [
  {
    id: "1",
    name: "Société Marocaine de Technologie",
    contact: "Hassan Alaoui",
    email: "h.alaoui@soctech.ma",
    project: "Installation d'écrans tactiles",
    status: "En négociation",
    date: "2025-04-28",
  },
  {
    id: "2",
    name: "Groupe Hôtelier Atlas",
    contact: "Nadia Benkaddour",
    email: "n.benkaddour@atlas-hotels.ma",
    project: "Bornes interactives",
    status: "Contrat signé",
    date: "2025-04-25",
  },
  {
    id: "3",
    name: "Université Mohammed VI",
    contact: "Karim Bensouda",
    email: "k.bensouda@um6p.ma",
    project: "Salles smart campus",
    status: "En attente",
    date: "2025-04-22",
  },
  {
    id: "4",
    name: "Centre Commercial Morocco Mall",
    contact: "Yasmine Tazi",
    email: "y.tazi@moroccomall.ma",
    project: "Murs d'affichage LED",
    status: "Devis envoyé",
    date: "2025-04-20",
  },
  {
    id: "5",
    name: "Agence Digitale WebMaroc",
    contact: "Omar Bennani",
    email: "o.bennani@webmaroc.ma",
    project: "Écrans publicitaires",
    status: "Nouveau contact",
    date: "2025-04-18",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Contrat signé":
      return "bg-green-100 text-green-800";
    case "En négociation":
      return "bg-blue-100 text-blue-800";
    case "Devis envoyé":
      return "bg-amber-100 text-amber-800";
    case "En attente":
      return "bg-gray-100 text-gray-800";
    case "Nouveau contact":
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const RecentClients = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Clients & Prospects récents</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead className="hidden md:table-cell">Contact</TableHead>
              <TableHead className="hidden lg:table-cell">Projet</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="hidden sm:table-cell">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentClients.map((client) => (
              <TableRow key={client.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{client.name}</div>
                    <div className="text-sm text-muted-foreground md:hidden">
                      {client.contact}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div>
                    <div className="font-medium">{client.contact}</div>
                    <div className="text-sm text-muted-foreground">
                      {client.email}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden lg:table-cell">{client.project}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(client.status)} variant="outline">
                    {client.status}
                  </Badge>
                </TableCell>
                <TableCell className="hidden sm:table-cell">{new Date(client.date).toLocaleDateString('fr-FR')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentClients;
