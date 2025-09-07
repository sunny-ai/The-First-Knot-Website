import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { authenticatedFetch } from "@/lib/api";

const API_URL = 'http://127.0.0.1:8000';

const fetchSubmissions = async () => {
  return authenticatedFetch(`${API_URL}/api/contact/`);
};

const statusConfig: { [key: string]: { label: string; color: string } } = {
  new: { label: "New", color: "bg-yellow-500" },
  contacted: { label: "Contacted", color: "bg-gray-500" },
  confirmed: { label: "Confirmed", color: "bg-green-500" },
  no_response: { label: "No Response", color: "bg-red-500" },
};

const RecentSubmissions = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['recentContactSubmissions'],
    queryFn: fetchSubmissions,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading recent submissions.</div>;

  const recentSubmissions = Array.isArray(data) ? data.slice(0, 5) : [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Contact Submissions</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {recentSubmissions.map((submission: any) => (
            <li key={submission.id} className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{submission.name}</p>
                <p className="text-sm text-muted-foreground">{submission.email}</p>
              </div>
              <Badge className={`${statusConfig[submission.status]?.color} text-white`}>
                {statusConfig[submission.status]?.label}
              </Badge>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default RecentSubmissions;