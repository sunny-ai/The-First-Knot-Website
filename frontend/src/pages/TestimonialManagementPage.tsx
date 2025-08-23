// frontend/src/pages/TestimonialManagementPage.tsx
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Star, Trash2, Edit, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";
import { useToast } from "@/hooks/use-toast";
import TestimonialForm from "./TestimonialForm";

const TestimonialManagementPage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const { toast } = useToast();
  const API_URL = import.meta.env.VITE_API_URL;
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchTestimonials = () => {
    if (!API_URL) {
      console.error("VITE_API_URL is not set. Please check your frontend/.env file.");
      return;
    }
    fetch(`${API_URL}/api/testimonials/`)
      .then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setTestimonials(data);
      })
      .catch(error => {
        console.error("Error fetching testimonials:", error);
        toast({
            title: "Error Fetching Testimonials",
            description: "Could not load testimonials from the server.",
            variant: "destructive"
        })
      });
  };

  useEffect(() => {
    fetchTestimonials();
  }, [API_URL]);

  const handleEdit = (item) => {
    setSelectedItem(item);
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    fetch(`${API_URL}/api/testimonials/${id}/`, { method: 'DELETE' })
        .then((response) => {
            if (response.ok) {
                toast({ title: "Success", description: "Testimonial deleted." });
                fetchTestimonials();
            } else {
                throw new Error('Failed to delete testimonial.');
            }
        })
        .catch(error => {
            console.error("Error deleting item:", error);
            toast({ title: "Error", description: "Could not delete testimonial.", variant: "destructive" });
        });
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-semibold">Testimonial Management</h2>
              <p className="text-muted-foreground">Manage client testimonials.</p>
            </div>
            <Button onClick={() => { setSelectedItem(null); setIsFormOpen(true); }}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Testimonial
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Testimonial List</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[15%]">Name</TableHead>
                    <TableHead className="w-[15%]">Event</TableHead>
                    <TableHead className="w-[40%]">Text</TableHead>
                    <TableHead className="w-[10%]">Rating</TableHead>
                    <TableHead className="w-[20%] text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {testimonials.map((testimonial) => (
                    <TableRow key={testimonial.id}>
                      <TableCell className="font-medium">{testimonial.name}</TableCell>
                      <TableCell className="text-muted-foreground">{testimonial.event}</TableCell>
                      <TableCell className="whitespace-normal">{testimonial.text}</TableCell>
                      <TableCell>
                        <div className="flex justify-start">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-primary fill-current" />
                          ))}
                        </div>
                        <span className="sr-only">{testimonial.rating} stars</span>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center gap-2">
                          <Button 
                            variant="secondary" 
                            size="sm" 
                            onClick={() => handleEdit(testimonial)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm" 
                            onClick={() => handleDelete(testimonial.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
      <TestimonialForm isOpen={isFormOpen} setIsOpen={setIsFormOpen} item={selectedItem} refreshData={fetchTestimonials} />
    </div>
  );
};

export default TestimonialManagementPage;