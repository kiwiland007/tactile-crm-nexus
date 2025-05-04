
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

// Mock data
const stockItems = [
  {
    id: "1",
    name: "Écrans tactiles 32\"",
    total: 40,
    available: 28,
    maintenance: 2,
    rented: 10,
    critical: 10,
  },
  {
    id: "2",
    name: "Bornes interactives",
    total: 25,
    available: 8,
    maintenance: 4,
    rented: 13,
    critical: 5,
  },
  {
    id: "3",
    name: "Tablettes Android",
    total: 60,
    available: 15,
    maintenance: 0,
    rented: 45,
    critical: 20,
  },
  {
    id: "4",
    name: "Écrans LED extérieurs",
    total: 15,
    available: 3,
    maintenance: 2,
    rented: 10,
    critical: 3,
  },
];

const StockStatus = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">État du Stock</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {stockItems.map((item) => {
            const availablePercentage = Math.round((item.available / item.total) * 100);
            const rentedPercentage = Math.round((item.rented / item.total) * 100);
            const maintenancePercentage = Math.round((item.maintenance / item.total) * 100);
            
            const isLowStock = item.available <= item.critical;
            
            return (
              <div key={item.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{item.name}</h3>
                  {isLowStock && (
                    <span className="text-xs font-medium text-red-500">
                      Stock critique
                    </span>
                  )}
                </div>
                
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-tactile"
                    style={{ width: `${availablePercentage}%` }}
                  />
                </div>
                
                <div className="flex justify-between text-xs text-gray-500">
                  <div className="flex gap-4">
                    <span>{item.available} disponibles</span>
                    <span>{item.rented} loués</span>
                    <span>{item.maintenance} en maintenance</span>
                  </div>
                  <span>Total: {item.total}</span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default StockStatus;
