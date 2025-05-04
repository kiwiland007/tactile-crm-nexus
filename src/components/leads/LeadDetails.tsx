
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardFooter,
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Facebook, 
  Instagram, 
  Linkedin,
  MoreVertical, 
  Phone,
  Mail,
  Send,
  User
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Type for the lead object
interface Lead {
  id: number;
  name: string;
  contact: string;
  email: string;
  phone: string;
  source: string;
  status: string;
  date: string;
  message: string;
}

// Type for the LeadDetails component props
interface LeadDetailsProps {
  lead: Lead;
}

// Mock messages for the conversation
const mockMessages = [
  {
    id: 1,
    sender: "client",
    text: "Bonjour, nous recherchons des bornes interactives pour notre salon professionnel en juin.",
    date: "03/05/2025 10:23"
  },
  {
    id: 2,
    sender: "us",
    text: "Bonjour ! Merci de votre intérêt. Nous proposons plusieurs modèles de bornes interactives adaptées aux salons professionnels. Pourriez-vous me préciser combien de bornes vous souhaitez et pour quelle durée ?",
    date: "03/05/2025 11:05"
  },
  {
    id: 3,
    sender: "client",
    text: "Nous aurions besoin de 5 bornes pour une durée de 3 jours, du 10 au 12 juin. Pouvez-vous nous envoyer votre catalogue et vos tarifs ?",
    date: "03/05/2025 14:30"
  }
];

const LeadDetails: React.FC<LeadDetailsProps> = ({ lead }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(mockMessages);
  
  const getSourceIcon = (source: string) => {
    switch(source) {
      case "facebook": return <Facebook className="h-4 w-4 text-blue-600" />;
      case "instagram": return <Instagram className="h-4 w-4 text-pink-600" />;
      case "linkedin": return <Linkedin className="h-4 w-4 text-blue-800" />;
      default: return null;
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
  
  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: "us",
        text: message,
        date: new Date().toLocaleDateString("fr-FR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        }).replace(",", "")
      };
      
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };
  
  const getInitials = (name: string) => {
    return name.split(" ").map((n) => n[0]).join("").toUpperCase();
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3 border-b">
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>
                {getInitials(lead.contact)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg">{lead.name}</CardTitle>
                {getSourceIcon(lead.source)}
              </div>
              <div className="text-sm text-muted-foreground">{lead.contact}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {getStatusBadge(lead.status)}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Marquer comme qualifié</DropdownMenuItem>
                <DropdownMenuItem>Assigner à un commercial</DropdownMenuItem>
                <DropdownMenuItem>Créer un devis</DropdownMenuItem>
                <DropdownMenuItem>Ajouter aux contacts</DropdownMenuItem>
                <DropdownMenuItem>Archiver</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>{lead.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{lead.phone}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.sender === 'us' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] rounded-lg p-3 ${
                msg.sender === 'us' 
                  ? 'bg-tactile text-white'
                  : 'bg-muted'
              }`}
            >
              <p>{msg.text}</p>
              <p className={`text-xs mt-1 ${
                msg.sender === 'us'
                  ? 'text-white/80'
                  : 'text-muted-foreground'
              }`}>
                {msg.date}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
      
      <CardFooter className="border-t p-4">
        <div className="flex gap-2 w-full">
          <Textarea 
            placeholder="Tapez votre message..." 
            className="min-h-[60px] resize-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
          <Button onClick={sendMessage} className="h-auto">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LeadDetails;
