import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from "react-router-dom";

const AdminLogin = () => {
  // In a real application, you would handle form state and submission here
  // to authenticate against your Django backend.

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-20">
      <Card className="w-full max-w-md shadow-elegant">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">The First Knot</CardTitle>
          <CardDescription>Admin Portal</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div>
              <label className="block text-foreground font-medium mb-2">Username</label>
              <Input className="bg-background/80 border-foreground/20" placeholder="Enter your username" />
            </div>
            <div>
              <label className="block text-foreground font-medium mb-2">Password</label>
              <Input type="password" className="bg-background/80 border-foreground/20" placeholder="Enter your password" />
            </div>
            <Link to="/admin/dashboard">
              <Button type="submit" className="w-full text-lg py-4">
                Login
              </Button>
            </Link>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;