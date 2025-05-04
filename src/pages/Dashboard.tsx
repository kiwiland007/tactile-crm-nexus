
import React from "react";
import { 
  Users, 
  Package, 
  Calendar, 
  ShoppingCart 
} from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";
import RecentClients from "@/components/dashboard/RecentClients";
import UpcomingEvents from "@/components/dashboard/UpcomingEvents";
import StockStatus from "@/components/dashboard/StockStatus";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Tableau de bord</h1>
        <p className="text-muted-foreground">
          Bienvenue sur votre CRM Maroc Tactile
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Clients Actifs"
          value="128"
          description="12 nouveaux ce mois-ci"
          icon={<Users />}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Appareils en Stock"
          value="214"
          description="6 en maintenance"
          icon={<Package />}
          trend={{ value: 4, isPositive: false }}
        />
        <StatsCard
          title="Événements à Venir"
          value="18"
          description="3 cette semaine"
          icon={<Calendar />}
        />
        <StatsCard
          title="Commandes en Cours"
          value="32"
          description="5 en attente de livraison"
          icon={<ShoppingCart />}
          trend={{ value: 12, isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecentClients />
        <StockStatus />
      </div>

      <div>
        <UpcomingEvents />
      </div>
    </div>
  );
};

export default Dashboard;
