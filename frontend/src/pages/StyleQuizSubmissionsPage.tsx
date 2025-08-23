// frontend/src/pages/StyleQuizSubmissionsPage.tsx
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Trash2, Edit, PlusCircle, PartyPopper, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";
import { useToast } from "@/hooks/use-toast";
import QuizSubmissionDetailDialog from "./QuizSubmissionDetailDialog";

// Dummy data to ensure the component renders correctly if no data is fetched
const DUMMY_SUBMISSIONS = [
  { id: 1, name: "John Doe", email: "john@example.com", style: "Classic Elegance", email_sent: false },
  { id: 2, name: "Jane Smith", email: "jane@example.com", style: "Rustic Romance", email_sent: true },
];

const StyleQuizSubmissionsPage = () => {
  const [submissions, setSubmissions] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const { toast } = useToast();
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchSubmissions = () => {
    if (!API_URL) {
      console.error("VITE_API_URL is not set. Please check your frontend/.env file.");
      setSubmissions(DUMMY_SUBMISSIONS);
      return;
    }
    fetch(`${API_URL}/api/style-quiz/`)
      .then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setSubmissions(data);
      })
      .catch(error => {
        console.error("Error fetching quiz submissions:", error);
        toast({
            title: "Error Fetching Submissions",
            description: "Could not load quiz submissions from the server.",
            variant: "destructive"
        })
      });
  };

  useEffect(() => {
    fetchSubmissions();
  }, [API_URL]);

  const handleCardClick = (submission) => {
    setSelectedSubmission(submission);
    setIsDialogOpen(true);
  };
  
  const handleEmailSent = (id) => {
    setSubmissions(prevSubmissions => 
        prevSubmissions.map(sub => 
            sub.id === id ? { ...sub, email_sent: true } : sub
        )
    );
  };

  const handleDelete = (id) => {
    fetch(`${API_URL}/api/style-quiz/${id}/`, { method: 'DELETE' })
        .then((response) => {
            if (response.ok) {
                toast({ title: "Success", description: "Quiz submission deleted." });
                fetchSubmissions();
            } else {
                throw new Error('Failed to delete submission.');
            }
        })
        .catch(error => {
            console.error("Error deleting item:", error);
            toast({ title: "Error", description: "Could not delete submission.", variant: "destructive" });
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
              <h2 className="text-2xl font-semibold">Style Quiz Submissions</h2>
              <p className="text-muted-foreground">View submissions from your style quiz.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {submissions.map((submission) => (
              <Card
                key={submission.id}
                className={`cursor-pointer overflow-hidden shadow-soft hover-lift border-2 ${submission.email_sent ? 'border-primary' : 'border-black'}`}
                onClick={() => handleCardClick(submission)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-bold">{submission.name}</CardTitle>
                    <div className="flex items-center space-x-2">
                        {submission.email_sent ? (
                            <span className="text-sm text-primary flex items-center">
                                <Mail className="w-4 h-4 mr-1" />
                                Sent
                            </span>
                        ) : null}
                        <Button 
                          variant="destructive"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevents card click event
                            handleDelete(submission.id);
                          }}
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
      <QuizSubmissionDetailDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        submission={selectedSubmission}
        onEmailSent={handleEmailSent}
      />
    </div>
  );
};

export default StyleQuizSubmissionsPage;