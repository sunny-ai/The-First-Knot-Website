import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";
import { useToast } from "@/hooks/use-toast";

const statusConfig: { [key: string]: { label: string; color: string } } = {
  new: { label: "New", color: "bg-yellow-500" },
  contacted: { label: "Contacted", color: "bg-gray-500" },
  confirmed: { label: "Confirmed", color: "bg-green-500" },
  no_response: { label: "No Response", color: "bg-red-500" },
};

const fetchSubmissions = async () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const response = await fetch(`${API_URL}/api/contact/`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const updateSubmissionStatus = async ({ id, status }: { id: number; status: string }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const response = await fetch(`${API_URL}/api/contact/${id}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) {
    throw new Error("Could not update status");
  }
  return response.json();
};

const ContactSubmissionsPage = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: submissions = [], isLoading, error } = useQuery({
    queryKey: ['contactSubmissions'],
    queryFn: fetchSubmissions
  });

  const mutation = useMutation({
    mutationFn: updateSubmissionStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contactSubmissions'] });
      toast({ title: "Success", description: "Status updated." });
    },
    onError: () => {
      toast({ title: "Error", description: "Could not update status.", variant: "destructive" });
    }
  });

  const handleStatusChange = (id: number, status: string) => {
    mutation.mutate({ id, status });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading submissions.</div>;

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Contact Submissions</h2>
          <Card>
            <CardContent>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left p-4">Name</th>
                    <th className="text-left p-4">Email</th>
                    <th className="text-left p-4">Phone</th>
                    <th className="text-left p-4">Event</th>
                    <th className="text-left p-4">Message</th>
                    <th className="text-left p-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((submission: any) => (
                    <tr key={submission.id}>
                      <td className="p-4">{submission.name}</td>
                      <td className="p-4">{submission.email}</td>
                      <td className="p-4">{submission.phone}</td>
                      <td className="p-4">{`${submission.event_type || ''} | ${submission.event_date || ''}`}</td>
                      <td className="p-4">{submission.message}</td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <Badge className={`${statusConfig[submission.status]?.color}`}>
                            {statusConfig[submission.status]?.label}
                          </Badge>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem onClick={() => handleStatusChange(submission.id, 'contacted')}>Contacted</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleStatusChange(submission.id, 'confirmed')}>Confirmed</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleStatusChange(submission.id, 'no_response')}>No Response</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default ContactSubmissionsPage;