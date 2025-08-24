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

const RecentSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/api/contact/`)
      .then((response) => response.json())
      .then((data) => setSubmissions(data.slice(0, 5)));
  }, [API_URL]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Form Submissions</CardTitle>
        <CardDescription>
          A list of the 5 most recent form submissions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Event Type</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.map((submission: any) => (
              <TableRow key={submission.id}>
                <TableCell>{submission.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">{submission.status}</Badge>
                </TableCell>
                <TableCell>{submission.event_type}</TableCell>
                <TableCell>{submission.event_date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentSubmissions;