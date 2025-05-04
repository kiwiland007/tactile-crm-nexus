
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Filter, 
  Facebook, 
  Instagram, 
  Linkedin,
  MoreVertical, 
  MessageSquare,
  Plus,
  Search
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Mock lead data with social media information
const socialLeads = [
  { 
    id: 1, 
    name: "Société Alpha", 
    contact: "Mohammed Alaoui", 
    email: "m.alaoui@alpha.ma", 
    phone: "+212 6 61 23 45 67", 
    source: "facebook", 
    status: "new", 
    date: "03/05/2025",
    message: "Nous recherchons des bornes interactives pour notre salon professionnel en juin.",
  },
  { 
    id: 2, 
    name: "Hôtel Royal Mansour", 
    contact: "Nadia Mansouri", 
    email: "n.mansouri@royalmansour.ma", 
    phone: "+212 6 62 34 56 78", 
    source: "instagram", 
    status: "contacted", 
    date: "01/05/2025",
    message: "Pouvez-vous nous envoyer votre catalogue d'écrans tactiles pour nos halls d'accueil ?",
  },
  { 
    id: 3, 
    name: "Banque Populaire", 
    contact: "Karim Tazi", 
    email: "k.tazi@bp.ma", 
    phone: "+212 6 63 45 67 89", 
    source: "linkedin", 
    status: "qualified", 
    date: "29/04/2025",
    message: "Nous sommes intéressés par vos solutions d'affichage digital pour nos 50 agences.",
  },
  { 
    id: 4, 
    name: "Maroc Telecom", 
    contact: "Fatima Zahra Bennis", 
    email: "fz.bennis@iam.ma", 
    phone: "+212 6 64 56 78 90", 
    source: "facebook", 
    status: "negotiation", 
    date: "27/04/2025",
    message: "Nous souhaitons moderniser nos espaces clients avec des écrans interactifs.",
  },
  { 
    id: 5, 
    name: "OCP Group", 
    contact: "Youssef Lahlou", 
    email: "y.lahlou@ocp.ma", 
    phone: "+212 6 65 67 89 01", 
    source: "linkedin", 
    status: "closed", 
    date: "25/04/2025",
    message: "Nous validons votre offre pour l'équipement de notre centre d'innovation.",
  }
];

interface SocialMediaLeadsProps {
  onSelectLead?: (lead: any) => void;
}

const SocialMediaLeads: React.FC<SocialMediaLeadsProps> = ({ onSelectLead }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTab, setCurrentTab] = useState("all");
  const [selectedLead, setSelectedLead] = useState<any>(null);
  
  const getSourceIcon = (source: string) => {
    switch(source) {
      case "facebook": return <Facebook className="h-4 w-4 text-blue-600" />;
      case "instagram": return <Instagram className="h-4 w-4 text-pink-600" />;
      case "linkedin": return <Linkedin className="h-4 w-4 text-blue-800" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };
  
  const getStatusBadge = (status: string) => {
    const statuses: {[key: string]: {label: string, style: string}} = {
      new: { label: "Nouveau", style: "bg-blue-100 text-blue-800 border-blue-200" },
      contacted: { label: "Contacté", style: "bg-yellow-100 text-yellow-800 border-yellow-200" },
      qualified: { label: "Qualifié", style: "bg-green-100 text-green-800 border-green-200" },
      negotiation: { label: "Négociation", style: "bg-purple-100 text-purple-800 border-purple-200" },
      closed: { label: "Conclu", style: "bg-tactile/10 text-tactile border-tactile/20" },
      lost: { label: "Perdu", style: "bg-red-100 text-red-800 border-red-200" }
    };
    
    const statusInfo = statuses[status] || { label: status, style: "bg-gray-100 text-gray-800 border-gray-200" };
    
    return (
      <Badge variant="outline" className={statusInfo.style}>
        {statusInfo.label}
      </Badge>
    );
  };
  
  const filteredLeads = socialLeads.filter(lead => {
    const matchesSearch = searchTerm.toLowerCase() === "" || 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.contact.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = currentTab === "all" || lead.source === currentTab;
    
    return matchesSearch && matchesTab;
  });

  const handleLeadSelect = (lead: any) => {
    setSelectedLead(lead);
    if (onSelectLead) {
      onSelectLead(lead);
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Leads Réseaux Sociaux
          </CardTitle>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Importer
          </Button>
        </div>
        
        <div className="mt-4">
          <Tabs defaultValue="all" onValueChange={setCurrentTab}>
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="all">Tous</TabsTrigger>
              <TabsTrigger value="facebook" className="flex items-center gap-1">
                <Facebook className="h-3 w-3" /> Facebook
              </TabsTrigger>
              <TabsTrigger value="instagram" className="flex items-center gap-1">
                <Instagram className="h-3 w-3" /> Instagram
              </TabsTrigger>
              <TabsTrigger value="linkedin" className="flex items-center gap-1">
                <Linkedin className="h-3 w-3" /> LinkedIn
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="flex items-center gap-2 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un lead..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
          {filteredLeads.map((lead) => (
            <div 
              key={lead.id}
              className={`p-3 rounded-md border cursor-pointer hover:bg-muted/50 transition-colors ${
                selectedLead?.id === lead.id ? "border-tactile bg-muted/50" : ""
              }`}
              onClick={() => handleLeadSelect(lead)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    {getSourceIcon(lead.source)}
                    <h3 className="font-medium">{lead.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{lead.contact}</p>
                  <p className="text-sm text-muted-foreground line-clamp-1">{lead.message}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  {getStatusBadge(lead.status)}
                  <span className="text-xs text-muted-foreground">{lead.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialMediaLeads;
