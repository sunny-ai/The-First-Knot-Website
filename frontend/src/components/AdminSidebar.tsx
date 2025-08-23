import { Link } from "react-router-dom";
import { Heart, LayoutDashboard, FileText, MessageSquare, Users } from "lucide-react";

const AdminSidebar = () => {
  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Portfolio", href: "/admin/portfolio", icon: Heart }, // This link will now work
    { name: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
    { name: "Contact Submissions", href: "/admin/contact-submissions", icon: FileText },
    { name: "Quiz Submissions", href: "/admin/quiz-submissions", icon: Users },
  ];

  return (
    <aside className="w-64 bg-card border-r border-border flex-shrink-0">
      <div className="p-6">
        <Link to="/" className="flex items-center">
          <Heart className="w-8 h-8 text-primary mr-3" />
          <h2 className="text-heading text-2xl font-bold">The First Knot</h2>
        </Link>
      </div>
      <nav className="p-4">
        <ul>
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
      </nav>
    </aside>
  );
};

export default AdminSidebar;