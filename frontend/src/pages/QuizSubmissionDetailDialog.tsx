// frontend/src/pages/QuizSubmissionDetailDialog.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";

const styleResults = {
  "Classic Elegance": {
    title: "Your style is: Classic Elegance!",
    description: "You dream of a timeless, fairytale wedding. It's all about sophistication, romance, and grand gestures.",
    elements: ["Crystal chandeliers", "Lush white florals", "String quartets", "Calligraphy"],
    palette: [
      { name: "Ivory", hex: "#F5F5DC" },
      { name: "Gold", hex: "#FFD700" },
      { name: "White", hex: "#FFFFFF" },
      { name: "Dusty Blue", hex: "#B0C4DE" }
    ],
    perfectFor: "Couples who love timeless romance and a touch of glamour.",
    quote: "Every love story is beautiful, but ours is my favorite."
  },
  "Rustic Romance": {
    title: "Your style is: Rustic Romance!",
    description: "You love a warm, charming, and down-to-earth celebration. It's cozy, intimate, and connected to nature.",
    elements: ["Barn venues", "String lights", "Wildflower bouquets", "Wooden details"],
    palette: [
        { name: "Earthy Brown", hex: "#8B4513" },
        { name: "Sage Green", hex: "#9DC183" },
        { name: "Cream", hex: "#FFFDD0" },
        { name: "Blush", hex: "#FEEAE6" }
    ],
    perfectFor: "Couples who want a relaxed, personal, and heartfelt wedding.",
    quote: "In a field of wildflowers, I chose you."
  },
  "Modern Minimalist": {
    title: "Your style is: Modern Minimalist!",
    description: "You appreciate clean lines, chic design, and a sophisticated urban feel. It's all about intentionality and style.",
    elements: ["Art galleries or lofts", "Monochromatic colors", "Geometric shapes", "Minimalist decor"],
    palette: [
        { name: "Black", hex: "#000000" },
        { name: "White", hex: "#FFFFFF" },
        { name: "Grey", hex: "#808080" },
        { name: "Slate", hex: "#405D72" }
    ],
    perfectFor: "Couples who are fashion-forward and love contemporary design.",
    quote: "Love is not about possession. It's about appreciation."
  },
  "Bohemian Dream": {
    title: "Your style is: Bohemian Dream!",
    description: "You're a free spirit who wants a relaxed, intimate, and nature-inspired wedding. It's unconventional and deeply personal.",
    elements: ["Outdoor settings", "Pampas grass", "Macrame details", "Flowing dresses"],
    palette: [
        { name: "Terracotta", hex: "#E2725B" },
        { name: "Sage", hex: "#B2AC88" },
        { name: "Dusty Rose", hex: "#DCAE96" },
        { name: "Cream", hex: "#FFFDD0" }
    ],
    perfectFor: "Creative, free-spirited couples who want a non-traditional day.",
    quote: "And into the forest I go, to lose my mind and find my soul."
  },
};

const sendStyleGuideEmail = async (submissionId: number) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const response = await fetch(`${API_URL}/api/style-quiz/${submissionId}/send_style_guide_email/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) {
    throw new Error('Failed to send email.');
  }
  return response.json();
};

const QuizSubmissionDetailDialog = ({ isOpen, setIsOpen, submission, onEmailSent }: any) => {
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: sendStyleGuideEmail,
    onSuccess: () => {
      toast({
        title: "Email Sent",
        description: "The personalized style guide has been sent to the client.",
      });
      onEmailSent(submission.id);
      setIsOpen(false);
    },
    onError: (error) => {
      console.error('Error sending email:', error);
      toast({
        title: "Error",
        description: "Could not send the email. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleSendEmail = () => {
    mutation.mutate(submission.id);
  };

  const resultDetails = styleResults[submission?.style as keyof typeof styleResults];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        {submission && resultDetails ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-display text-3xl">{resultDetails.title}</DialogTitle>
              <DialogDescription className="text-body text-foreground/80">
                This is the personalized style guide for the client based on their quiz answers.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="text-center italic text-lg text-foreground/70">
                "{resultDetails.quote}"
              </div>

              <Card className="p-4 bg-secondary/50 border-secondary">
                <CardHeader className="p-0 mb-4">
                  <h4 className="text-heading text-lg font-semibold">Client Details</h4>
                </CardHeader>
                <CardContent className="p-0 text-sm space-y-1">
                  <p><strong>Name:</strong> {submission.name}</p>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">Email:</p>
                    <span>{submission.email}</span>
                    {submission.email_sent && <Badge variant="secondary">Sent</Badge>}
                  </div>
                  <p><strong>Phone:</strong> {submission.phone || 'N/A'}</p>
                  <p><strong>Address:</strong> {submission.address || 'N/A'}</p>
                </CardContent>
              </Card>

              <Card className="p-4">
                <CardHeader className="p-0 mb-4">
                  <h4 className="text-heading text-lg font-semibold">Color Palette</h4>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="flex h-12 w-full rounded-md overflow-hidden">
                    {resultDetails.palette.map(color => (
                      <div key={color.name} className="flex-1" style={{ backgroundColor: color.hex }}></div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="p-4">
                <CardHeader className="p-0 mb-4">
                  <h4 className="text-heading text-lg font-semibold">Key Elements</h4>
                </CardHeader>
                <CardContent className="p-0">
                  <ul className="list-disc list-inside space-y-1 text-sm text-foreground/80">
                    {resultDetails.elements.map(item => <li key={item}>{item}</li>)}
                  </ul>
                </CardContent>
              </Card>

              <Card className="p-4">
                <CardHeader className="p-0 mb-4">
                  <h4 className="text-heading text-lg font-semibold">Perfect For</h4>
                </CardHeader>
                <CardContent className="p-0 text-sm text-foreground/80">
                  {resultDetails.perfectFor}
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <Button onClick={handleSendEmail} disabled={submission.email_sent || mutation.isPending}>
                <Mail className="mr-2 h-4 w-4" />
                {mutation.isPending ? "Sending..." : "Send Personalized Guide"}
              </Button>
            </div>
          </>
        ) : (
          <p>Loading submission details...</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default QuizSubmissionDetailDialog;