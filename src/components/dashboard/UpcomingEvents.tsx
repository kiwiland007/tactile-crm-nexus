
import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock data
const events = [
  {
    id: "1",
    title: "Installation Écrans Tactiles - Société Atlas",
    date: new Date(2025, 4, 8),
    type: "installation",
  },
  {
    id: "2",
    title: "Maintenance Bornes - Centre Commercial Anfa",
    date: new Date(2025, 4, 12),
    type: "maintenance",
  },
  {
    id: "3",
    title: "Salon Digital Tech - Casablanca",
    date: new Date(2025, 4, 15),
    type: "event",
  },
  {
    id: "4",
    title: "Formation Équipe Client - Banque Populaire",
    date: new Date(2025, 4, 18),
    type: "training",
  },
  {
    id: "5",
    title: "Reprise équipement - Hôtel Royal Mansour",
    date: new Date(2025, 4, 22),
    type: "pickup",
  },
];

const eventTypeColors: Record<string, string> = {
  installation: "bg-tactile/10 text-tactile border-tactile/20",
  maintenance: "bg-amber-100 text-amber-800 border-amber-200",
  event: "bg-purple-100 text-purple-800 border-purple-200",
  training: "bg-green-100 text-green-800 border-green-200",
  pickup: "bg-blue-100 text-blue-800 border-blue-200",
};

const UpcomingEvents = () => {
  const today = new Date();
  const eventDates = events.map((event) => event.date);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Événements à venir</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-2">
          <Calendar
            mode="single"
            selected={today}
            className="rounded-md border w-full"
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
        </div>
        <div className="lg:col-span-3 space-y-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex flex-col gap-2 p-3 rounded-md border"
            >
              <div className="flex justify-between items-start">
                <h3 className="font-medium">{event.title}</h3>
                <Badge variant="outline" className={eventTypeColors[event.type]}>
                  {event.type === "installation" && "Installation"}
                  {event.type === "maintenance" && "Maintenance"}
                  {event.type === "event" && "Événement"}
                  {event.type === "training" && "Formation"}
                  {event.type === "pickup" && "Récupération"}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {event.date.toLocaleDateString("fr-FR", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingEvents;
