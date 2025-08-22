import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, PartyPopper, Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';

const quizQuestions = [
  {
    question: "What's your dream venue?",
    answers: [
      { text: "A grand, historic ballroom", style: "Classic Elegance" },
      { text: "A rustic barn in the countryside", style: "Rustic Romance" },
      { text: "A chic, downtown art gallery", style: "Modern Minimalist" },
      { text: "A sun-drenched beach at sunset", style: "Bohemian Dream" },
    ],
  },
  {
    question: "Choose a color palette:",
    answers: [
      { text: "Ivory, gold, and white", style: "Classic Elegance" },
      { text: "Earthy tones and natural greens", style: "Rustic Romance" },
      { text: "Monochromatic black and white", style: "Modern Minimalist" },
      { text: "Terracotta, sage, and dusty rose", style: "Bohemian Dream" },
    ],
  },
    {
    question: "Pick your wedding flowers:",
    answers: [
      { text: "Classic roses and peonies", style: "Classic Elegance" },
      { text: "Wildflowers and eucalyptus", style: "Rustic Romance" },
      { text: "A single, elegant calla lily", style: "Modern Minimalist" },
      { text: "Dried flowers and pampas grass", style: "Bohemian Dream" },
    ],
  },
  {
    question: "What about the wedding cake?",
    answers: [
      { text: "A multi-tiered cake with intricate piping", style: "Classic Elegance" },
      { text: "A 'naked' cake adorned with fresh berries", style: "Rustic Romance" },
      { text: "A geometric cake with a metallic finish", style: "Modern Minimalist" },
      { text: "A simple, single-tier cake with fresh flowers", style: "Bohemian Dream" },
    ],
  },
  {
    question: "Describe your dream wedding attire:",
    answers: [
      { text: "A timeless ballgown or a classic tuxedo", style: "Classic Elegance" },
      { text: "A lace dress with cowboy boots or a tweed suit", style: "Rustic Romance" },
      { text: "A sleek, simple silhouette or a tailored, modern suit", style: "Modern Minimalist" },
      { text: "A flowing, ethereal dress and a linen suit", style: "Bohemian Dream" },
    ],
  }
];

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
    perfectFor: "Couples who love timeless romance and a touch of glamour."
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
    perfectFor: "Couples who want a relaxed, personal, and heartfelt wedding."
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
    perfectFor: "Couples who are fashion-forward and love contemporary design."
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
    perfectFor: "Creative, free-spirited couples who want a non-traditional day."
  },
};


const StyleQuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({
    "Classic Elegance": 0,
    "Rustic Romance": 0,
    "Modern Minimalist": 0,
    "Bohemian Dream": 0,
  });
  const [showResult, setShowResult] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleAnswer = (style: keyof typeof scores) => {
    setScores(prev => ({ ...prev, [style]: prev[style] + 1 }));

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const getResult = () => {
    return Object.keys(scores).reduce((a, b) => scores[a as keyof typeof scores] > scores[b as keyof typeof scores] ? a : b);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScores({
      "Classic Elegance": 0,
      "Rustic Romance": 0,
      "Modern Minimalist": 0,
      "Bohemian Dream": 0,
    });
    setShowResult(false);
  }

  const finalResultStyle = getResult() as keyof typeof styleResults;

  return (
    <div className="py-20 md:py-32 bg-background">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-display text-5xl md:text-6xl mb-6 text-foreground">
          Find Your Wedding Style
        </h1>
        <p className="text-body text-xl text-foreground/80 mb-12">
          Answer a few quick questions to discover your dream wedding aesthetic!
        </p>

        <Card className="shadow-elegant border">
          <CardContent className="p-8">
            {!showResult ? (
              <div>
                <h2 className="text-heading text-2xl md:text-3xl mb-8 text-foreground">
                  {quizQuestions[currentQuestion].question}
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {quizQuestions[currentQuestion].answers.map(answer => (
                    <Button
                      key={answer.text}
                      onClick={() => handleAnswer(answer.style as keyof typeof scores)}
                      className="text-lg h-auto py-4 whitespace-normal"
                      variant="outline"
                    >
                      {answer.text}
                    </Button>
                  ))}
                </div>
                <div className="mt-8 text-sm text-foreground/60">
                  Question {currentQuestion + 1} of {quizQuestions.length}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center">
                <PartyPopper className="w-16 h-16 text-accent mb-6" />
                <h2 className="text-heading text-3xl md:text-4xl mb-4 text-foreground">
                  {styleResults[finalResultStyle].title}
                </h2>
                <p className="text-body text-lg text-foreground/80 mb-10 max-w-2xl mx-auto">
                  {styleResults[finalResultStyle].description}
                </p>

                <div className="w-full my-8 space-y-10">
                  <Card className="p-6 text-left">
                    <h3 className="text-heading text-xl mb-4 text-foreground">Color Palette:</h3>
                    <div className="palette-container">
                      <div className="palette">
                        {styleResults[finalResultStyle].palette.map(color => (
                          <div
                            key={color.name}
                            className="color"
                            style={{ backgroundColor: color.hex }}
                          >
                            <span>{color.hex.replace('#', '')}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <Card className="p-6">
                      <h3 className="text-heading text-xl mb-4 text-foreground">Key Elements:</h3>
                      <ul className="list-disc list-inside space-y-2 text-body text-foreground/80">
                        {styleResults[finalResultStyle].elements.map(item => <li key={item}>{item}</li>)}
                      </ul>
                    </Card>

                    <Card className="p-6">
                      <h3 className="text-heading text-xl mb-4 text-foreground">Perfect For:</h3>
                      <p className="text-body text-foreground/80">{styleResults[finalResultStyle].perfectFor}</p>
                    </Card>
                  </div>
                </div>

                <Card className="w-full max-w-lg p-6 bg-secondary/50 border-secondary text-center">
                  <h3 className="text-heading text-xl mb-4 text-foreground">Get Your Personalized Style Guide!</h3>
                  <Button onClick={() => setIsFormOpen(true)}>
                    <Mail className="mr-2 h-4 w-4" /> Send My Results
                  </Button>
                </Card>
                <div className="flex gap-4 mt-8">
                  <Button onClick={restartQuiz} variant="outline">Try Again</Button>
                  <Button>Explore Our Portfolio <ArrowRight className="ml-2 h-4 w-4" /></Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Get Your Style Guide</DialogTitle>
            <DialogDescription>
              Enter your details below and we'll send your personalized wedding style guide right to your inbox.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input id="email" type="email" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit">Send to My Email</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StyleQuizPage;