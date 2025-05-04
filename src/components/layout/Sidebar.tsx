
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  BarChart3, 
  Users, 
  Package, 
  Calendar, 
  Settings,
  MessageSquare,
  FileText,
  ShoppingCart,
  HelpCircle
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
}

const SidebarItem = ({ 
  icon: Icon, 
  label, 
  href, 
  isActive 
}: { 
  icon: React.ElementType; 
  label: string; 
  href: string;
  isActive: boolean;
}) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all hover:bg-tactile/10",
        isActive ? "bg-tactile text-white hover:bg-tactile/90" : "text-gray-700"
      )}
    >
      <Icon className={cn("h-5 w-5", isActive ? "text-white" : "text-gray-500")} />
      <span className="font-medium">{label}</span>
    </Link>
  );
};

const Sidebar = ({ isOpen }: SidebarProps) => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Updated logo URL for Racha Digital
  const logoUrl = "/lovable-uploads/762fc921-3479-4e65-a5de-300d43e947e1.png";

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-white border-r border-gray-200 transition-all duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}
    >
      <div className="flex h-16 items-center border-b border-gray-200 px-6 bg-black">
        <img src={logoUrl} alt="Racha Digital" className="h-8" />
      </div>
      
      <div className="flex-1 overflow-auto py-4 px-3">
        <div className="space-y-1">
          <SidebarItem 
            icon={BarChart3} 
            label="Tableau de bord" 
            href="/" 
            isActive={currentPath === "/"} 
          />
          <SidebarItem 
            icon={Users} 
            label="Clients & Prospects" 
            href="/contacts" 
            isActive={currentPath === "/contacts"} 
          />
          <SidebarItem 
            icon={Package} 
            label="Gestion de Stock" 
            href="/inventory" 
            isActive={currentPath === "/inventory"} 
          />
          <SidebarItem 
            icon={Calendar} 
            label="Événements" 
            href="/events" 
            isActive={currentPath === "/events"} 
          />
          <SidebarItem 
            icon={FileText} 
            label="Devis & Factures" 
            href="/invoices" 
            isActive={currentPath === "/invoices"} 
          />
          <SidebarItem 
            icon={ShoppingCart} 
            label="Commandes" 
            href="/orders" 
            isActive={currentPath === "/orders"} 
          />
          <SidebarItem 
            icon={MessageSquare} 
            label="Communication Interne" 
            href="/chat" 
            isActive={currentPath === "/chat"} 
          />
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="space-y-1">
            <SidebarItem 
              icon={Settings} 
              label="Administration" 
              href="/admin" 
              isActive={currentPath === "/admin"} 
            />
            <SidebarItem 
              icon={HelpCircle} 
              label="Aide & Support" 
              href="/support" 
              isActive={currentPath === "/support"} 
            />
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <div className="bg-tactile flex items-center justify-center rounded-full w-10 h-10">
            <span className="text-white font-medium">AD</span>
          </div>
          <div>
            <p className="text-sm font-medium">Admin Utilisateur</p>
            <p className="text-xs text-gray-500">admin@rachadigital.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
