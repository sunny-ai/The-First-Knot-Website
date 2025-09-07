// frontend/src/pages/StyleQuizSubmissionsPage.tsx
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Trash2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";
import { useToast } from "@/hooks/use-toast";
import QuizSubmissionDetailDialog from "./QuizSubmissionDetailDialog";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const fetchSubmissions = async () => {
  const API_URL = import.meta.env.VITE_API_URL;
  if (!API_URL) {
    throw new Error("VITE_API_URL is not set.");
  }
  const response = await fetch(`${API_URL}/api/style-quiz/`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const deleteSubmission = async (id: number) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const response = await fetch(`${API_URL}/api/style-quiz/${id}/`, { method: 'DELETE' });
  if (!response.ok) {
    throw new Error('Failed to delete submission.');
  }
};

const StyleQuizSubmissionsPage = () => {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const { toast } = useToast();

  const { data: submissions = [], error, isLoading } = useQuery({
    queryKey: ['quizSubmissions'],
    queryFn: fetchSubmissions,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteSubmission,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quizSubmissions'] });
      toast({ title: "Success", description: "Quiz submission deleted." });
    },
    onError: (error) => {
      console.error("Error deleting submission:", error);
      toast({ title: "Error", description: "Could not delete submission.", variant: "destructive" });
    }
  });

  const handleCardClick = (submission: any) => {
    setSelectedSubmission(submission);
    setIsDialogOpen(true);
  };

  const handleEmailSent = (id: number) => {
    queryClient.invalidateQueries({ queryKey: ['quizSubmissions'] });
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error fetching quiz submissions.</div>

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-semibold">Style Quiz Submissions</h2>
              <p className="text-muted-foreground">View submissions from your style quiz.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {submissions.map((submission: any) => (
              <Card
                key={submission.id}
                className={`cursor-pointer overflow-hidden shadow-soft hover-lift border-2 ${submission.email_sent ? 'border-primary' : 'border-black'}`}
                onClick={() => handleCardClick(submission)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-bold">{submission.name}</CardTitle>
                    <div className="flex items-center space-x-2">
                        {submission.email_sent && (
                            <span className="text-sm text-primary flex items-center">
                                <Mail className="w-4 h-4 mr-1" />
                                Sent
                            </span>
                        )}
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(submission.id);
                          }}
                          disabled={deleteMutation.isPending}
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-2"><strong>Email:</strong> {submission.email}</CardDescription>
                  <CardDescription className="mb-2"><strong>Style:</strong> {submission.style}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
      {selectedSubmission && (
        <QuizSubmissionDetailDialog
          isOpen={isDialogOpen}
          setIsOpen={setIsDialogOpen}
          submission={selectedSubmission}
          onEmailSent={handleEmailSent}
        />
      )}
    </div>
  );
};

export default StyleQuizSubmissionsPage;