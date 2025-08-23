import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const categories = [
  "Wedding Favours",
  "Wedding Invites",
  "Mehndi Favours & Invites",
  "House Decoration",
  "Event Management",
  "Others"
];

const PortfolioForm = ({ isOpen, setIsOpen, item, refreshData }) => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    image: null,
  });
  const { toast } = useToast();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (item) {
      setFormData({
        title: item.title,
        category: item.category,
        description: item.description,
        image: null,
      });
    } else {
      setFormData({
        title: "",
        category: "",
        description: "",
        image: null,
      });
    }
  }, [item]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = item ? `${API_URL}/api/portfolio/${item.id}/` : `${API_URL}/api/portfolio/`;
    const method = item ? 'PUT' : 'POST';

    const postData = new FormData();
    postData.append('title', formData.title);
    postData.append('category', formData.category);
    postData.append('description', formData.description);
    if (formData.image) {
      postData.append('image', formData.image);
    }

    fetch(url, {
      method: method,
      body: postData,
    })
    .then(response => response.json())
    .then(() => {
      toast({
        title: `Portfolio item ${item ? 'updated' : 'created'} successfully.`,
      });
      refreshData();
      setIsOpen(false);
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{item ? "Edit Portfolio Item" : "Add New Portfolio Item"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div>
            <label className="block text-foreground font-medium mb-2">Title</label>
            <Input value={formData.title} onChange={(e) => handleChange('title', e.target.value)} />
          </div>
          <div>
            <label className="block text-foreground font-medium mb-2">Category</label>
            <Select value={formData.category} onValueChange={(value) => handleChange('category', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-foreground font-medium mb-2">Description</label>
            <Textarea value={formData.description} onChange={(e) => handleChange('description', e.target.value)} />
          </div>
          <div>
            <label className="block text-foreground font-medium mb-2">Image</label>
            <Input type="file" onChange={handleFileChange} />
          </div>
          <Button type="submit" className="w-full">
            {item ? "Update Item" : "Add Item"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PortfolioForm;