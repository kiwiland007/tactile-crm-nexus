
import React from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Check,
  CheckSquare, 
  Clock, 
  MapPin,
  Users,
  User,
  Camera
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Mock data for technicians
const technicians = [
  {
    id: "1",
    name: "Ahmed Benjelloun",
    role: "Technicien Senior",
    avatar: "/placeholder.svg",
    status: "onsite",
    location: "Casablanca, OFEC",
    currentTask: "Installation Écrans LED - Salon Digital Tech",
    progress: 75,
  },
  {
    id: "2",
    name: "Sara Lahlou",
    role: "Technicien",
    avatar: "/placeholder.svg",
    status: "enroute",
    location: "En route vers Rabat",
    currentTask: "Installation Écrans - Mall of Morocco",
    progress: 25,
  },
  {
    id: "3",
    name: "Karim Idrissi",
    role: "Technicien Senior",
    avatar: "/placeholder.svg",
    status: "available",
    location: "Bureau Central",
    currentTask: null,
    progress: 0,
  },
];

// Mock data for checklists and installations
const installations = [
  {
    id: "1",
    event: "Salon Digital Tech - Casablanca",
    date: "15/05/2025",
    location: "Casablanca, OFEC",
    equipment: [
      { name: "Écran tactile 55\" 4K", quantity: 2, checked: true },
      { name: "Borne interactive standard", quantity: 4, checked: true },
      { name: "Tablette Android 10\"", quantity: 10, checked: false },
      { name: "Mur LED intérieur 2x2m", quantity: 1, checked: false },
    ],
    technicians: ["Ahmed Benjelloun", "Sara Lahlou"],
    status: "in-progress",
    photos: [
      "/placeholder.svg",
      "/placeholder.svg",
    ],
    notes: "Installation en cours. Problème de connexion Wi-Fi résolu."
  },
  {
    id: "2",
    event: "Formation Banque Populaire",
    date: "18/05/2025",
    location: "Casablanca, Siège BP",
    equipment: [
      { name: "Tablette Android 10\"", quantity: 20, checked: false },
    ],
    technicians: ["Sara Lahlou"],
    status: "upcoming",
    photos: [],
    notes: ""
  },
];

const TechnicianTracking = () => {
  const getStatusBadge = (status: string) => {
    const statuses: {[key: string]: {label: string, style: string}} = {
      onsite: { label: "Sur site", style: "bg-green-100 text-green-800 border-green-200" },
      enroute: { label: "En déplacement", style: "bg-blue-100 text-blue-800 border-blue-200" },
      available: { label: "Disponible", style: "bg-tactile/10 text-tactile border-tactile/20" },
      "in-progress": { label: "En cours", style: "bg-amber-100 text-amber-800 border-amber-200" },
      upcoming: { label: "À venir", style: "bg-purple-100 text-purple-800 border-purple-200" },
      completed: { label: "Terminée", style: "bg-green-100 text-green-800 border-green-200" },
    };
    
    const statusInfo = statuses[status] || { label: status, style: "bg-gray-100 text-gray-800 border-gray-200" };
    
    return (
      <Badge variant="outline" className={statusInfo.style}>
        {statusInfo.label}
      </Badge>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Suivi Techniciens & Installations
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="technicians">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="technicians">Techniciens</TabsTrigger>
            <TabsTrigger value="installations">Installations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="technicians" className="mt-4">
            <div className="space-y-4">
              {technicians.map((technician) => (
                <div key={technician.id} className="flex items-start justify-between border rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={technician.avatar} />
                      <AvatarFallback>
                        {technician.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        {technician.name}
                        {getStatusBadge(technician.status)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {technician.role}
                      </div>
                      
                      <div className="mt-2 flex flex-col gap-1">
                        <div className="flex items-center gap-1 text-sm">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span>{technician.location}</span>
                        </div>
                        
                        {technician.currentTask && (
                          <div className="flex items-center gap-1 text-sm">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span>{technician.currentTask}</span>
                          </div>
                        )}
                        
                        {technician.progress > 0 && (
                          <div className="w-full mt-2">
                            <div className="text-xs text-muted-foreground mb-1">
                              Progression: {technician.progress}%
                            </div>
                            <div className="h-1.5 w-full bg-gray-100 rounded-full">
                              <div 
                                className="h-full bg-tactile rounded-full"
                                style={{ width: `${technician.progress}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm">
                    Voir détails
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="installations" className="mt-4">
            <div className="space-y-6">
              {installations.map((installation) => (
                <Card key={installation.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{installation.event}</CardTitle>
                        <div className="text-sm text-muted-foreground mt-1">
                          {installation.date}
                        </div>
                      </div>
                      {getStatusBadge(installation.status)}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="flex flex-col gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{installation.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{installation.technicians.join(", ")}</span>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Checklist d'installation</h4>
                        <div className="space-y-2">
                          {installation.equipment.map((item, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                {item.checked ? (
                                  <CheckSquare className="h-4 w-4 text-green-600" />
                                ) : (
                                  <div className="h-4 w-4 border rounded" />
                                )}
                                <span>
                                  {item.quantity} x {item.name}
                                </span>
                              </div>
                              
                              {!item.checked && (
                                <Button variant="ghost" size="sm" className="h-8">
                                  Marquer comme vérifié
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {installation.photos.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium mb-2">Photos d'installation</h4>
                          <div className="flex gap-2 overflow-x-auto pb-2">
                            {installation.photos.map((photo, index) => (
                              <img 
                                key={index}
                                src={photo}
                                alt={`Installation ${index + 1}`}
                                className="h-20 w-20 rounded-md object-cover"
                              />
                            ))}
                            
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" className="h-20 w-20" size="icon">
                                  <Camera className="h-6 w-6" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Ajouter une photo</DialogTitle>
                                  <DialogDescription>
                                    Prenez une photo de l'installation ou téléchargez-en une depuis votre appareil.
                                  </DialogDescription>
                                </DialogHeader>
                                
                                <div className="grid gap-4 py-4">
                                  <div className="border-2 border-dashed rounded-lg p-8 text-center">
                                    <Camera className="h-10 w-10 mx-auto text-muted-foreground" />
                                    <p className="mt-2">
                                      Déposez une image ici ou cliquez pour télécharger
                                    </p>
                                  </div>
                                </div>
                                
                                <DialogFooter>
                                  <Button type="submit">Ajouter la photo</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                      )}
                      
                      {installation.notes && (
                        <div>
                          <h4 className="text-sm font-medium mb-1">Notes</h4>
                          <p className="text-sm text-muted-foreground">{installation.notes}</p>
                        </div>
                      )}
                      
                      <div className="flex justify-end">
                        <Button variant="outline">
                          Voir détails complets
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TechnicianTracking;
