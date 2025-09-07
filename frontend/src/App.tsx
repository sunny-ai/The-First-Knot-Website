// frontend/src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/AuthContext"; // Import AuthProvider

// Import pages and components
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import StyleQuizPage from "./pages/StyleQuizPage";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/AdminDashboard";
import PortfolioManagementPage from "./pages/PortfolioManagementPage";
import TestimonialManagementPage from "./pages/TestimonialManagementPage";
import ContactSubmissionsPage from "./pages/ContactSubmissionsPage";
import StyleQuizSubmissionsPage from "./pages/StyleQuizSubmissionsPage";
import LoginPage from "./pages/LoginPage"; // Import LoginPage
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute
import MainLayout from "./components/MainLayout"; // Create a simple layout component

const queryClient = new QueryClient();

// A simple layout for public pages
const MainLayoutWrapper = ({ children }: { children: React.ReactNode }) => (
  <MainLayout>{children}</MainLayout>
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider> {/* Wrap everything with AuthProvider */}
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<MainLayoutWrapper><Home /></MainLayoutWrapper>} />
              <Route path="/about" element={<MainLayoutWrapper><AboutPage /></MainLayoutWrapper>} />
              <Route path="/services" element={<MainLayoutWrapper><ServicesPage /></MainLayoutWrapper>} />
              <Route path="/portfolio" element={<MainLayoutWrapper><Portfolio /></MainLayoutWrapper>} />
              <Route path="/contact" element={<MainLayoutWrapper><Contact /></MainLayoutWrapper>} />
              <Route path="/style-quiz" element={<MainLayoutWrapper><StyleQuizPage /></MainLayoutWrapper>} />

              {/* Authentication Route */}
              <Route path="/login" element={<LoginPage />} />

              {/* Protected Admin Routes */}
              <Route
                path="/admin"
                element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>}
              />
              <Route
                path="/admin/portfolio"
                element={<ProtectedRoute><PortfolioManagementPage /></ProtectedRoute>}
              />
              <Route
                path="/admin/testimonials"
                element={<ProtectedRoute><TestimonialManagementPage /></ProtectedRoute>}
              />
              <Route
                path="/admin/contact-submissions"
                element={<ProtectedRoute><ContactSubmissionsPage /></ProtectedRoute>}
              />
              <Route
                path="/admin/style-quiz-submissions"
                element={<ProtectedRoute><StyleQuizSubmissionsPage /></ProtectedRoute>}
              />

              {/* Not Found Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </AuthProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;