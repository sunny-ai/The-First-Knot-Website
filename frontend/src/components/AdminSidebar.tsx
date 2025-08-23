import { Link, useNavigate } from "react-router-dom";
import {
  Heart,
  LayoutDashboard,
  FileText,
  MessageSquare,
  Users,
  LogOut,
} from "lucide-react";

const AdminSidebar = () => {
  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Portfolio", href: "/admin/portfolio", icon: Heart },
    { name: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
    {
      name: "Contact Submissions",
      href: "/admin/contact-submissions",
      icon: FileText,
    },
    { name: "Quiz Submissions", href: "/admin/quiz-submissions", icon: Users },
  ];
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, you'd clear the auth token here
    console.log("Logging out...");
    navigate("/admin");
  };

  return (
    <aside className="w-64 bg-card border-r border-border flex-shrink-0">
      <div className="p-6">
        <Link to="/" className="flex items-center">
          <Heart className="w-8 h-8 text-primary mr-3" />
          <h2 className="text-heading text-2xl font-bold">The First Knot</h2>
        </Link>
      </div>
      <nav className="p-4 flex flex-col h-[calc(100%-8rem)]">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.href}
                className="flex items-center px-4 py-2 text-foreground/80 hover:bg-secondary rounded-md transition-colors duration-200"
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-foreground/80 hover:bg-secondary rounded-md transition-colors duration-200"
          >
            <LogOut className="w-5 h-5 mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default AdminSidebar;