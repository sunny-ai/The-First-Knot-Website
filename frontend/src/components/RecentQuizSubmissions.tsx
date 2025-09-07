import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authenticatedFetch } from "@/lib/api";
import { Mail } from "lucide-react";

const API_URL = 'http://127.0.0.1:8000';

const fetchQuizSubmissions = async () => {
  return authenticatedFetch(`${API_URL}/api/style-quiz/`);
};

const RecentQuizSubmissions = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['recentQuizSubmissions'],
    queryFn: fetchQuizSubmissions,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading recent quiz submissions.</div>;

  const recentSubmissions = Array.isArray(data) ? data.slice(0, 5) : [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Quiz Submissions</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {recentSubmissions.map((submission: any) => (
            <li key={submission.id} className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{submission.name}</p>
                <p className="text-sm text-muted-foreground">{submission.style}</p>
              </div>
              {submission.email_sent && (
                <span className="text-sm text-primary flex items-center">
                  <Mail className="w-4 h-4 mr-1" />
                  Sent
                </span>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default RecentQuizSubmissions;