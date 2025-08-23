// frontend/src/pages/TestimonialForm.tsx
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const ratings = [1, 2, 3, 4, 5];

const TestimonialForm = ({ isOpen, setIsOpen, item, refreshData }) => {
  const [formData, setFormData] = useState({
    name: "",
    event: "",
    text: "",
    rating: 1,
  });
  const { toast } = useToast();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name,
        event: item.event,
        text: item.text,
        rating: item.rating,
      });
    } else {
      setFormData({
        name: "",
        event: "",
        text: "",
        rating: 1,
      });
    }
  }, [item]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = item ? `${API_URL}/api/testimonials/${item.id}/` : `${API_URL}/api/testimonials/`;
    const method = item ? 'PUT' : 'POST';

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(() => {
      toast({
        title: `Testimonial ${item ? 'updated' : 'added'} successfully.`,
      });
      refreshData();
      setIsOpen(false);
    })
    .catch(error => {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: `Could not ${item ? 'update' : 'add'} testimonial.`,
        variant: "destructive",
      });
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{item ? "Edit Testimonial" : "Add New Testimonial"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="event">Event</Label>
            <Input id="event" value={formData.event} onChange={(e) => handleChange('event', e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="text">Testimonial Text</Label>
            <Textarea id="text" value={formData.text} onChange={(e) => handleChange('text', e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="rating">Rating</Label>
            <Select value={String(formData.rating)} onValueChange={(value) => handleChange('rating', Number(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Select a rating" />
              </SelectTrigger>
              <SelectContent>
                {ratings.map(rating => (
                  <SelectItem key={rating} value={String(rating)}>{rating} Star{rating > 1 ? 's' : ''}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full">
            {item ? "Update Testimonial" : "Add Testimonial"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TestimonialForm;