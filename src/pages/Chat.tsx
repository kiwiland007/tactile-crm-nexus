
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  MessageSquare,
  Calendar,
  Filter,
  Plus,
  Users,
  Search,
  Send,
  Paperclip,
  MoreVertical
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock conversations data
const conversations = [
  {
    id: 1,
    name: "Équipe Technique",
    type: "group",
    participants: ["Mohammed", "Nadia", "Karim", "Yasmine"],
    lastMessage: "Les écrans tactiles pour l'événement CasaTech sont prêts.",
    unread: 3,
    time: "10:23",
    avatar: null,
  },
  {
    id: 2,
    name: "Événement Marrakech Expo",
    type: "event",
    participants: ["Équipe Événementielle", "Techniciens", "Commercial"],
    lastMessage: "Installation complétée pour le stand principal.",
    unread: 0,
    time: "Hier",
    avatar: null,
  },
  {
    id: 3,
    name: "Nadia Mansouri",
    type: "direct",
    participants: ["Nadia", "Vous"],
    lastMessage: "J'ai terminé la configuration des écrans au Royal Mansour.",
    unread: 0,
    time: "Hier",
    avatar: null,
  },
  {
    id: 4,
    name: "Support Technique",
    type: "group",
    participants: ["Équipe Support", "Techniciens"],
    lastMessage: "Nouveau ticket: problème d'affichage sur la borne #24.",
    unread: 5,
    time: "Mar 03",
    avatar: null,
  },
  {
    id: 5,
    name: "Déploiement - Centre Commercial",
    type: "event",
    participants: ["Équipe Déploiement", "Logistique"],
    lastMessage: "Le planning de déploiement a été mis à jour pour la semaine prochaine.",
    unread: 0,
    time: "Mar 02",
    avatar: null,
  },
];

// Mock messages for a selected conversation
const mockMessages = [
  {
    id: 1,
    sender: "Mohammed",
    text: "Bonjour à tous, je voulais vous informer que les écrans tactiles pour l'événement CasaTech sont prêts et testés.",
    time: "10:23",
    isMe: false,
  },
  {
    id: 2,
    sender: "Nadia",
    text: "Super ! J'ai également préparé les bornes interactives. Elles sont dans le dépôt B.",
    time: "10:25",
    isMe: false,
  },
  {
    id: 3,
    sender: "Vous",
    text: "Parfait. Je passerai vérifier le matériel cet après-midi. Avez-vous également préparé les câbles HDMI et les adaptateurs ?",
    time: "10:30",
    isMe: true,
  },
  {
    id: 4,
    sender: "Karim",
    text: "Oui, tout est prêt. J'ai mis à jour l'inventaire dans le système aussi.",
    time: "10:32",
    isMe: false,
  },
  {
    id: 5,
    sender: "Yasmine",
    text: "À quelle heure devons-nous être sur place demain pour l'installation ?",
    time: "10:35",
    isMe: false,
  },
  {
    id: 6,
    sender: "Vous",
    text: "Le rendez-vous est fixé à 8h00 devant le centre de conférences. N'oubliez pas vos badges d'accès !",
    time: "10:37",
    isMe: true,
  },
];

const Chat = () => {
  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTab, setCurrentTab] = useState("all");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(mockMessages);
  
  const filteredConversations = conversations.filter(conversation => {
    const matchesSearch = searchTerm === "" || 
      conversation.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = currentTab === "all" || 
      (currentTab === "groups" && conversation.type === "group") ||
      (currentTab === "events" && conversation.type === "event") ||
      (currentTab === "direct" && conversation.type === "direct");
    
    return matchesSearch && matchesTab;
  });
  
  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: "Vous",
        text: message,
        time: new Date().toLocaleTimeString('fr-FR', {
          hour: '2-digit',
          minute: '2-digit'
        }),
        isMe: true,
      };
      
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };
  
  const getConversationIcon = (type: string) => {
    switch(type) {
      case "group": return <Users className="h-4 w-4 text-blue-600" />;
      case "event": return <Calendar className="h-4 w-4 text-green-600" />;
      case "direct": return <MessageSquare className="h-4 w-4 text-purple-600" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };
  
  const getInitials = (name: string) => {
    return name.split(" ").map((n) => n[0]).join("").toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Communication Interne</h1>
        <p className="text-gray-500">Échangez avec vos collègues et suivez les événements en temps réel</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-12">
        <div className="md:col-span-4">
          <Card className="h-full">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Conversations
                </CardTitle>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Nouvelle
                </Button>
              </div>
              
              <div className="mt-4">
                <Tabs defaultValue="all" onValueChange={setCurrentTab}>
                  <TabsList className="grid grid-cols-4">
                    <TabsTrigger value="all">Tous</TabsTrigger>
                    <TabsTrigger value="groups">Groupes</TabsTrigger>
                    <TabsTrigger value="events">Événements</TabsTrigger>
                    <TabsTrigger value="direct">Direct</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              <div className="flex items-center gap-2 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher..."
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
                {filteredConversations.map((conversation) => (
                  <div 
                    key={conversation.id}
                    className={`p-3 rounded-md border cursor-pointer hover:bg-muted/50 transition-colors ${
                      selectedConversation?.id === conversation.id ? "border-tactile bg-muted/50" : ""
                    }`}
                    onClick={() => setSelectedConversation(conversation)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex gap-3 items-center">
                        <Avatar>
                          {conversation.avatar ? (
                            <AvatarImage src={conversation.avatar} />
                          ) : (
                            <AvatarFallback className="bg-muted">
                              {getConversationIcon(conversation.type)}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <div>
                          <div className="font-medium">{conversation.name}</div>
                          <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                            {conversation.lastMessage}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="text-xs text-muted-foreground">{conversation.time}</span>
                        {conversation.unread > 0 && (
                          <Badge className="bg-tactile hover:bg-tactile">{conversation.unread}</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-8">
          {selectedConversation ? (
            <Card className="h-full flex flex-col">
              <CardHeader className="pb-3 border-b">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      {selectedConversation.avatar ? (
                        <AvatarImage src={selectedConversation.avatar} />
                      ) : (
                        <AvatarFallback className="bg-muted">
                          {getConversationIcon(selectedConversation.type)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{selectedConversation.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {selectedConversation.participants.join(", ")}
                      </p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="ghost">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Informations</DropdownMenuItem>
                      <DropdownMenuItem>Ajouter membres</DropdownMenuItem>
                      <DropdownMenuItem>Rechercher</DropdownMenuItem>
                      <DropdownMenuItem>Archiver</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Quitter</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              
              <CardContent className="flex-grow overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
                  >
                    {!msg.isMe && (
                      <Avatar className="h-8 w-8 mr-2 mt-1">
                        <AvatarFallback>
                          {getInitials(msg.sender)}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div 
                      className={`max-w-[75%] rounded-lg p-3 ${
                        msg.isMe 
                          ? 'bg-tactile text-white'
                          : 'bg-muted'
                      }`}
                    >
                      {!msg.isMe && (
                        <p className="text-xs font-medium mb-1">{msg.sender}</p>
                      )}
                      <p>{msg.text}</p>
                      <p className={`text-xs mt-1 text-right ${
                        msg.isMe
                          ? 'text-white/80'
                          : 'text-muted-foreground'
                      }`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
              
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Textarea 
                    placeholder="Écrivez votre message..." 
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
                  <div className="flex flex-col gap-2">
                    <Button size="icon" variant="outline">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button size="icon" onClick={sendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="h-full flex items-center justify-center">
              <CardContent className="text-center p-10">
                <MessageSquare className="h-16 w-16 mx-auto text-muted-foreground/50" />
                <h3 className="text-xl font-medium mt-4">Aucune conversation sélectionnée</h3>
                <p className="text-muted-foreground mt-2">
                  Sélectionnez une conversation ou créez-en une nouvelle pour commencer à échanger.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
