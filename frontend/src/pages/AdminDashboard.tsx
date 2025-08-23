import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, FileText, Heart, Users } from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";
import TotalVisitsChart from "@/components/TotalVisitsChart";
import PortfolioForm from "./PortfolioForm"; // Import the form component

const AdminDashboard = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  // In a real application, you would fetch these stats from the backend
  const stats = {
      portfolioItems: 12,
      testimonials: 8,
      contactSubmissions: 25,
      quizSubmissions: 15,
  }

  // This function would be passed down to the form to refresh data after submission
  const fetchDashboardData = () => {
    // Re-fetch your dashboard stats here
    console.log("Refreshing dashboard data...");
  };

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
                  <div className="text-2xl font-bold">{stats.portfolioItems}</div>
                  <p className="text-xs text-muted-foreground">Manage your beautiful work</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Testimonials</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.testimonials}</div>
                   <p className="text-xs text-muted-foreground">What your clients are saying</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Contact Submissions</CardTitle>
                   <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.contactSubmissions}</div>
                   <p className="text-xs text-muted-foreground">New leads from your contact form</p>
                </CardContent>
              </Card>
               <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Style Quiz Submissions</CardTitle>
                   <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.quizSubmissions}</div>
                   <p className="text-xs text-muted-foreground">New leads from your style quiz</p>
                </CardContent>
              </Card>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <TotalVisitsChart />
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>My Income</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <div className="w-32 h-32 relative">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="hsl(var(--secondary))"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831"
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="3"
                      strokeDasharray="46, 100"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold">46%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
      <PortfolioForm
        isOpen={isFormOpen}
        setIsOpen={setIsFormOpen}
        item={null} // Pass null to indicate creating a new item
        refreshData={fetchDashboardData}
      />
    </div>
  );
};

export default AdminDashboard;