import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Search } from "lucide-react";

const AdminHeader = () => {
  return (
    <header className="flex items-center justify-between p-6 bg-card border-b border-border">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </div>
      <div className="flex items-center space-x-4">
        <Search className="w-5 h-5 text-foreground/60" />
        <Bell className="w-5 h-5 text-foreground/60" />
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default AdminHeader;