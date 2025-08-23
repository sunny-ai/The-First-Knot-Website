import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const data = [
  { name: '1', visits: 140 },
  { name: '5', visits: 180 },
  { name: '10', visits: 160 },
  { name: '15', visits: 220 },
  { name: '20', visits: 200 },
  { name: '25', visits: 240 },
  { name: '30', visits: 210 },
];

const TotalVisitsChart = () => {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Total Visits</CardTitle>
        <CardDescription>March 2020</CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="visits" stroke="hsl(var(--primary))" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default TotalVisitsChart;