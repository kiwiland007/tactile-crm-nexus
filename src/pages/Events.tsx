import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Check,
  Clock,
  MoreVertical,
  Plus,
  MapPin,
  Users,
} from "lucide-react";

// Mock data for events
const events = [
  {
    id: "1",
    title: "Installation Écrans Tactiles - Société Atlas",
    type: "installation",
    date: new Date(2025, 4, 8),
    location: "Casablanca, Maarif",
    client: "Société Atlas",
    technicians: ["Ahmed Benjelloun", "Karim Idrissi"],
    status: "scheduled",
    equipments: [
      { name: "Écran tactile 55\" 4K", quantity: 3 },
      { name: "Supports muraux", quantity: 3 },
    ],
  },
  {
    id: "2",
    title: "Maintenance Bornes - Centre Commercial Anfa",
    type: "maintenance",
    date: new Date(2025, 4, 12),
    location: "Casablanca, Anfa",
    client: "Centre Commercial Anfa",
    technicians: ["Karim Idrissi"],
    status: "scheduled",
    equipments: [
      { name: "Kit maintenance bornes", quantity: 1 },
    ],
  },
  {
    id: "3",
    title: "Salon Digital Tech - Casablanca",
    type: "event",
    date: new Date(2025, 4, 15),
    location: "Casablanca, OFEC",
    client: "Digital Tech Expo",
    technicians: ["Ahmed Benjelloun", "Sara Lahlou", "Karim Idrissi"],
    status: "scheduled",
    equipments: [
      { name: "Écran tactile 55\" 4K", quantity: 2 },
      { name: "Borne interactive standard", quantity: 4 },
      { name: "Tablette Android 10\"", quantity: 10 },
      { name: "Mur LED intérieur 2x2m", quantity: 1 },
    ],
  },
  {
    id: "4",
    title: "Formation Équipe Client - Banque Populaire",
    type: "training",
    date: new Date(2025, 4, 18),
    location: "Casablanca, Siège BP",
    client: "Banque Populaire",
    technicians: ["Sara Lahlou"],
    status: "scheduled",
    equipments: [
      { name: "Tablette Android 10\"", quantity: 20 },
    ],
  },
  {
    id: "5",
    title: "Reprise équipement - Hôtel Royal Mansour",
    type: "pickup",
    date: new Date(2025, 4, 22),
    location: "Marrakech",
    client: "Hôtel Royal Mansour",
    technicians: ["Karim Idrissi"],
    status: "scheduled",
    equipments: [
      { name: "Écran tactile 55\" 4K", quantity: 2 },
      { name: "Kiosque tactile", quantity: 1 },
    ],
  },
  {
    id: "6",
    title: "Maintenance planifiée - ONCF",
    type: "maintenance",
    date: new Date(2025, 4, 25),
    location: "Rabat",
    client: "ONCF",
    technicians: ["Ahmed Benjelloun"],
    status: "scheduled",
    equipments: [
      { name: "Kit maintenance bornes", quantity: 1 },
    ],
  },
  {
    id: "7",
    title: "Installation Digital Signage - Mall of Morocco",
    type: "installation",
    date: new Date(2025, 4, 29),
    location: "Rabat",
    client: "Mall of Morocco",
    technicians: ["Ahmed Benjelloun", "Sara Lahlou"],
    status: "scheduled",
    equipments: [
      { name: "Écran tactile 32\" HD", quantity: 8 },
      { name: "Supports muraux", quantity: 8 },
    ],
  },
];

const getEventTypeBadge = (type: string) => {
  const types: Record<string, { label: string, style: string }> = {
    installation: {
      label: "Installation",
      style: "bg-tactile/10 text-tactile border-tactile/20",
    },
    maintenance: {
      label: "Maintenance",
      style: "bg-amber-100 text-amber-800 border-amber-200",
    },
    event: {
      label: "Événement",
      style: "bg-purple-100 text-purple-800 border-purple-200",
    },
    training: {
      label: "Formation",
      style: "bg-green-100 text-green-800 border-green-200",
    },
    pickup: {
      label: "Récupération",
      style: "bg-blue-100 text-blue-800 border-blue-200",
    },
  };

  const eventType = types[type] || { label: type, style: "bg-gray-100 text-gray-800 border-gray-200" };

  return (
    <Badge variant="outline" className={eventType.style}>
      {eventType.label}
    </Badge>
  );
};

const Events = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [visibleEvents, setVisibleEvents] = useState(events);
  
  // Get dates with events for calendar highlighting
  const eventDates = events.map((event) => event.date);
  
  // Format date - e.g., "8 mai 2025"
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };
  
  // Filter events for selected date
  const filterEventsByDate = (date: Date | undefined) => {
    if (!date) return events;
    
    return events.filter(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  };
  
  // Handle date selection
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setVisibleEvents(filterEventsByDate(date));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Événements</h1>
          <p className="text-muted-foreground">
            Planification et gestion des installations, maintenances et événements
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nouvel Événement
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-12">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Calendrier</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              className="border rounded-md"
              modifiers={{
                event: eventDates,
              }}
              modifiersStyles={{
                event: { 
                  fontWeight: "bold",
                  backgroundColor: "hsl(var(--primary) / 0.1)",
                  color: "hsl(var(--primary))",
                  borderRadius: "0.25rem" 
                }
              }}
            />
            
            <div className="mt-4">
              <h3 className="text-sm font-medium mb-2">Événements à venir</h3>
              <div className="space-y-2">
                {events.slice(0, 3).map((event) => (
                  <Button
                    key={event.id}
                    variant="outline"
                    className="w-full justify-start text-left h-auto py-2"
                    onClick={() => handleDateSelect(event.date)}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium truncate">{event.title}</span>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground gap-1 mt-1">
                        <Clock className="h-3 w-3" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>
              {selectedDate
                ? `Événements du ${formatDate(selectedDate)}`
                : "Tous les événements"}
            </CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Filtres
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setVisibleEvents(events)}>
                  Tous les types
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setVisibleEvents(events.filter(e => e.type === "installation"))}>
                  Installations
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setVisibleEvents(events.filter(e => e.type === "maintenance"))}>
                  Maintenances
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setVisibleEvents(events.filter(e => e.type === "event"))}>
                  Événements
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent>
            {visibleEvents.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <p className="text-muted-foreground mb-4">
                  Aucun événement prévu à cette date
                </p>
                <Button variant="outline" onClick={() => handleDateSelect(undefined)}>
                  Voir tous les événements
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {visibleEvents.map((event) => (
                  <Card key={event.id} className="overflow-hidden">
                    <div className="border-l-4 border-tactile p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{event.title}</h3>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Clock className="mr-1 h-4 w-4" />
                              {formatDate(event.date)}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <MapPin className="mr-1 h-4 w-4" />
                              {event.location}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Users className="mr-1 h-4 w-4" />
                              {event.technicians.length} technicien(s)
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getEventTypeBadge(event.type)}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size="icon" variant="ghost">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Voir détails</DropdownMenuItem>
                              <DropdownMenuItem>Modifier</DropdownMenuItem>
                              <DropdownMenuItem>Imprimer fiche</DropdownMenuItem>
                              <DropdownMenuItem>Annuler</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                      
                      <div className="mt-3 pt-3 border-t text-sm">
                        <h4 className="font-medium mb-1">Équipement requis</h4>
                        <ul className="space-y-1">
                          {event.equipments.map((eq, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <Check className="h-3 w-3 text-green-500" />
                              {eq.quantity} x {eq.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Events;
