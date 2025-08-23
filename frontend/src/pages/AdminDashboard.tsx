import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, FileText, Heart, Users } from "lucide-react";

const AdminDashboard = () => {
    // In a real application, you would fetch these stats from the backend
    const stats = {
        portfolioItems: 0,
        testimonials: 0,
        contactSubmissions: 0,
        quizSubmissions: 0,
    }

  return (
    <div className="min-h-screen bg-background pt-28 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-display text-4xl">Admin Dashboard</h1>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Portfolio Item
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
        
        {/* Add tables or lists here to display the actual data */}

      </div>
    </div>
  );
};

export default AdminDashboard;