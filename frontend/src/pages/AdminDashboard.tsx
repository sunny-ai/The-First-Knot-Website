// frontend/src/pages/AdminDashboard.tsx
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, FileText, Heart, Users } from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";
import PortfolioForm from "./PortfolioForm";
import { useToast } from "@/hooks/use-toast";
import CalendarCard from "@/components/CalendarCard";
import RecentSubmissions from "@/components/RecentSubmissions";
import RecentQuizSubmissions from "@/components/RecentQuizSubmissions";


import { authenticatedFetch } from "@/lib/api"; // Import the new fetch function

const fetchDashboardData = async () => {
  const API_URL = import.meta.env.VITE_API_URL;
  if (!API_URL) {
    throw new Error("VITE_API_URL is not set.");
  }
  return authenticatedFetch(`${API_URL}/api/stats/`); // Use the new function
};

const AdminDashboard = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: stats, error, isLoading } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: fetchDashboardData,
    initialData: {
      portfolioItems: 0,
      testimonials: 0,
      contactSubmissions: 0,
      quizSubmissions: 0,
    }
  });

  if (error) {
    toast({
      title: "Error Fetching Stats",
      description: "Could not load dashboard data from the server.",
      variant: "destructive"
    });
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="p-6 space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-display text-3xl font-bold">Dashboard</h1>
            <Button onClick={() => setIsFormOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Portfolio Item
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Portfolio Items</CardTitle>
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{isLoading ? '...' : stats.portfolioItems}</div>
                  <p className="text-xs text-muted-foreground">Manage your beautiful work</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Testimonials</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{isLoading ? '...' : stats.testimonials}</div>
                   <p className="text-xs text-muted-foreground">What your clients are saying</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Contact Submissions</CardTitle>
                   <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{isLoading ? '...' : stats.contactSubmissions}</div>
                   <p className="text-xs text-muted-foreground">New leads from your contact form</p>
                </CardContent>
              </Card>
               <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Style Quiz Submissions</CardTitle>
                   <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{isLoading ? '...' : stats.quizSubmissions}</div>
                   <p className="text-xs text-muted-foreground">New leads from your style quiz</p>
                </CardContent>
              </Card>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <RecentSubmissions />
              <RecentQuizSubmissions />
            </div>
            <CalendarCard />
          </div>
        </main>
      </div>
      <PortfolioForm
        isOpen={isFormOpen}
        setIsOpen={setIsFormOpen}
        item={null}
        refreshData={() => queryClient.invalidateQueries({ queryKey: ['dashboardStats'] })}
      />
    </div>
  );
};

export default AdminDashboard;