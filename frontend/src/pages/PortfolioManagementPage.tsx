// frontend/src/pages/PortfolioManagementPage.tsx
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle, MoreHorizontal, Trash2, Edit } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";
import PortfolioForm from "./PortfolioForm";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const categories = [
  "All",
  "Wedding Favours",
  "Wedding Invites",
  "Mehndi Favours & Invites",
  "House Decoration",
  "Event Management",
  "Others"
];

const fetchPortfolioItems = async () => {
  const API_URL = import.meta.env.VITE_API_URL;
  if (!API_URL) {
    throw new Error("VITE_API_URL is not set. Please check your frontend/.env file.");
  }
  const response = await fetch(`${API_URL}/api/portfolio/`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const deletePortfolioItem = async (id: number) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const response = await fetch(`${API_URL}/api/portfolio/${id}/`, { method: 'DELETE' });
  if (!response.ok) {
    throw new Error('Failed to delete item.');
  }
};

const PortfolioManagementPage = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("All");

  const { data: portfolioItems = [], error, isLoading } = useQuery({
    queryKey: ['portfolioItems'],
    queryFn: fetchPortfolioItems,
  });

  const deleteMutation = useMutation({
    mutationFn: deletePortfolioItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolioItems'] });
      toast({ title: "Success", description: "Portfolio item deleted." });
    },
    onError: (error) => {
      console.error("Error deleting item:", error);
      toast({ title: "Error", description: "Could not delete portfolio item.", variant: "destructive" });
    }
  });


  const filteredItems = categoryFilter === "All"
    ? portfolioItems
    : portfolioItems.filter((item: any) => item.category === categoryFilter);

  const handleEdit = (item: any) => {
    setSelectedItem(item);
    setIsFormOpen(true);
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching portfolio items.</div>;

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h2 className="text-2xl font-semibold">Portfolio Management</h2>
              <p className="text-muted-foreground">Manage your beautiful work.</p>
            </div>
            <div className="flex items-center gap-2">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => <SelectItem key={category} value={category}>{category}</SelectItem>)}
                </SelectContent>
              </Select>
              <Button onClick={() => { setSelectedItem(null); setIsFormOpen(true); }}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Item
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item: any) => (
              <Card key={item.id} className="overflow-hidden group">
                <div className="relative">
                  <img src={item.image}
                    alt={item.title} className="h-48 w-full object-cover bg-secondary" />
                  <div className="absolute top-2 right-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(item)}>
                          <Edit className="mr-2 h-4 w-4" /><span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(item.id)} className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" /><span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold truncate">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.category}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
      <PortfolioForm isOpen={isFormOpen} setIsOpen={setIsFormOpen} item={selectedItem} refreshData={() => queryClient.invalidateQueries({ queryKey: ['portfolioItems'] })} />
    </div>
  );
};

export default PortfolioManagementPage;