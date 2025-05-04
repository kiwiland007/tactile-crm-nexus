
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Settings, Users, Shield, Server } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Admin = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Administration</h1>
        <p className="text-gray-500">Gestion des paramètres système et des utilisateurs</p>
      </div>

      <Tabs defaultValue="users">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="users">Utilisateurs</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="system">Système</TabsTrigger>
          <TabsTrigger value="logs">Journaux</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Gestion des Utilisateurs
              </CardTitle>
              <CardDescription>
                Gérez les comptes des utilisateurs et leurs accès.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-3 px-4 text-left font-medium">Nom</th>
                      <th className="py-3 px-4 text-left font-medium">Email</th>
                      <th className="py-3 px-4 text-left font-medium">Rôle</th>
                      <th className="py-3 px-4 text-left font-medium">Statut</th>
                      <th className="py-3 px-4 text-left font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="py-3 px-4">Admin Utilisateur</td>
                      <td className="py-3 px-4">admin@rachadigital.com</td>
                      <td className="py-3 px-4">Administrateur</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Actif
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button className="text-tactile hover:underline">Modifier</button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">Thomas Martin</td>
                      <td className="py-3 px-4">thomas@rachadigital.com</td>
                      <td className="py-3 px-4">Gestionnaire</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Actif
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button className="text-tactile hover:underline">Modifier</button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">Sophie Dubois</td>
                      <td className="py-3 px-4">sophie@rachadigital.com</td>
                      <td className="py-3 px-4">Commercial</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          Inactif
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button className="text-tactile hover:underline">Modifier</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Gestion des Permissions
              </CardTitle>
              <CardDescription>
                Configurez les rôles et les permissions des utilisateurs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Contenu des permissions à implémenter.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Paramètres Système
              </CardTitle>
              <CardDescription>
                Configurez les paramètres globaux du système.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Contenu des paramètres système à implémenter.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                Journaux d'Activité
              </CardTitle>
              <CardDescription>
                Consultez les journaux d'activité du système.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Contenu des journaux à implémenter.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
