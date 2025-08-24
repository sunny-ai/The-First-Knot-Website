import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

const RecentQuizSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/api/style-quiz/`)
      .then((response) => response.json())
      .then((data) => setSubmissions(data.slice(0, 5)));
  }, [API_URL]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Quiz Submissions</CardTitle>
        <CardDescription>
          A list of the 5 most recent quiz submissions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email Sent</TableHead>
              <TableHead>Style</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.map((submission: any) => (
              <TableRow key={submission.id}>
                <TableCell>{submission.name}</TableCell>
                <TableCell>
                  <Badge variant={submission.email_sent ? "default" : "secondary"}>
                    {submission.email_sent ? "Yes" : "No"}
                  </Badge>
                </TableCell>
                <TableCell>{submission.style}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentQuizSubmissions;