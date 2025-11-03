"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookOpen, Sparkles, Target, Lightbulb, Copy, Check, Upload, X } from "lucide-react";
import { toast } from "sonner";

export default function ApplicationPage() {
  const [content, setContent] = useState("");
  const [vibe, setVibe] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<{
    contentType: string;
    keyTopics: string[];
    learningObjectives: string[];
    suggestedInteractions: string[];
    targetAudience?: string;
    difficulty?: string;
    estimatedDuration?: string;
    vibe: string;
    valueProposition: string;
    _mockData?: boolean;
    _message?: string;
  } | null>(null);
  const [copiedStates, setCopiedStates] = useState<{[key: string]: boolean}>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sample educational content for demo
  const sampleContents = {
    "course-lecture": `Machine Learning Fundamentals

In this lecture, we'll explore the core concepts that form the foundation of modern machine learning. Understanding these principles is crucial for anyone looking to build intelligent systems.

Key Topics:
1. What is Machine Learning?
2. Types of Learning (Supervised, Unsupervised, Reinforcement)
3. The Bias-Variance Tradeoff
4. Overfitting and Underfitting
5. Model Evaluation Metrics

By the end of this session, you should be able to explain how machine learning algorithms learn patterns from data and make predictions about new, unseen information.`,

    "research-paper": `The Impact of AI on Modern Education

Abstract: This paper examines how artificial intelligence is transforming educational practices and learning outcomes. Through analysis of current implementations and future possibilities, we explore both the opportunities and challenges presented by AI in education.

Key Findings:
- AI tutoring systems improve student engagement by 40%
- Personalized learning paths increase retention rates
- Ethical considerations around data privacy and algorithmic bias
- Need for teacher training in AI literacy

Conclusion: While AI presents significant opportunities for educational enhancement, careful implementation and ongoing evaluation are essential for maximizing benefits while minimizing risks.`,

    "workshop-outline": `Interactive Data Visualization Workshop

Workshop Overview: This hands-on session will teach participants how to create compelling data visualizations using modern web technologies. Perfect for beginners and intermediate developers.

Learning Objectives:
- Understand principles of effective data visualization
- Master D3.js and React integration
- Create interactive charts and graphs
- Apply accessibility best practices
- Deploy visualizations to production

Prerequisites: Basic JavaScript and React knowledge recommended. No prior experience with D3.js required.`
  };

  const vibes = [
    { value: "professional", label: "Professional", description: "Clean, corporate-style learning experience" },
    { value: "engaging", label: "Engaging", description: "Interactive, gamified approach" },
    { value: "minimalist", label: "Minimalist", description: "Simple, distraction-free design" },
    { value: "creative", label: "Creative", description: "Artistic, visually rich presentation" },
    { value: "academic", label: "Academic", description: "Formal, research-oriented style" },
    { value: "friendly", label: "Friendly", description: "Warm, approachable learning environment" },
    { value: "tech-forward", label: "Tech-Forward", description: "Modern, cutting-edge interface" },
    { value: "classic", label: "Classic", description: "Traditional, timeless design approach" }
  ];

  const handleSampleContent = (type: string) => {
    setContent(sampleContents[type as keyof typeof sampleContents]);
    setUploadedFile(null);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File too large", {
        description: "Please upload a file smaller than 5MB",
      });
      return;
    }

    // Check file type
    const allowedTypes = [
      'text/plain',
      'text/markdown',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (!allowedTypes.includes(file.type) && !file.name.match(/\.(txt|md|pdf|doc|docx)$/i)) {
      toast.error("Unsupported file type", {
        description: "Please upload .txt, .md, .pdf, .doc, or .docx files",
      });
      return;
    }

    setUploadedFile(file);

    // Read file content
    try {
      const text = await readFileContent(file);
      setContent(text);
      toast.success("File uploaded", {
        description: `${file.name} has been loaded successfully`,
      });
    } catch (error) {
      toast.error("Failed to read file", {
        description: error instanceof Error ? error.message : "Unknown error occurred",
      });
      setUploadedFile(null);
    }
  };

  const readFileContent = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const text = e.target?.result as string;
        resolve(text);
      };

      reader.onerror = () => {
        reject(new Error("Failed to read file"));
      };

      // For now, only handle text files
      // PDF and DOCX would require additional libraries
      if (file.type === 'text/plain' || file.type === 'text/markdown' || file.name.match(/\.(txt|md)$/i)) {
        reader.readAsText(file);
      } else {
        reject(new Error("PDF and DOCX support coming soon. Please use .txt or .md files for now."));
      }
    });
  };

  const removeFile = () => {
    setUploadedFile(null);
    setContent("");
  };

  const handleAnalyze = async () => {
    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content, vibe }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to analyze content");
      }

      const analysisData = await response.json();
      setAnalysis(analysisData);

      toast.success("Analysis Complete", {
        description: "Educational content analyzed successfully with AI!",
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      setError(errorMessage);

      toast.error("Analysis Failed", {
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates(prev => ({ ...prev, [key]: true }));
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [key]: false }));
      }, 2000);
      toast.success("Copied!", {
        description: "Claude Code prompt copied to clipboard",
      });
    } catch (err) {
      toast.error("Copy Failed", {
        description: "Failed to copy to clipboard",
      });
    }
  };

  const generateClaudePrompt = () => {
    if (!analysis) return "";

    return `Create an interactive learning experience for: "${content.substring(0, 100)}..."

Key Requirements:
1. Implement ${analysis.vibe} design aesthetic using shadcn/ui components
2. Include these core features:
   - Content input and analysis interface
   - Interactive elements: ${analysis.suggestedInteractions.join(", ")}
   - Progress tracking and assessment tools
   - Responsive design for mobile and desktop

3. Use Next.js 15 with TypeScript and integrate with existing Content to Landing Page application structure
4. Follow the established design system and component patterns
5. Ensure all components are accessible and performant

Technical Specifications:
- State management: React Context with localStorage persistence
- Styling: Tailwind CSS with shadcn/ui design system
- No external API dependencies for MVP (can be added later)
- Deploy to Vercel with environment parity

After completing all tasks from this prompt, provide a 1-line feedback summary to Cursor Chat about what was accomplished.`;
  };

  return (
    <div className="min-h-screen bg-[#f3f1ea]">
      {/* Header */}
      <header className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="w-7 h-7 text-primary" />
            <span className="font-bold text-2xl">Content to Landing Page</span>
            <Badge variant="outline" className="text-sm px-3 py-1">AI Builder</Badge>
          </div>
          <Button variant="outline" size="lg" asChild>
            <Link href="/">← Back to Home</Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 leading-tight">Transform Your Content Right Now</h1>
          <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Paste your educational content below. Watch our AI analyze it and generate everything you need
            to build an engaging, interactive learning experience. Takes less than 60 seconds.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Input Section */}
          <Card className="h-fit border-2 border-[#d4cdb8] shadow-[0_12px_40px_rgb(0,0,0,0.12)] hover:shadow-[0_16px_48px_rgb(0,0,0,0.16)] transition-shadow duration-300 bg-white rounded-2xl">
            <CardHeader className="pb-6 pt-8 px-8">
              <CardTitle className="flex items-center gap-3 text-2xl font-semibold">
                <Target className="w-6 h-6" />
                Step 1: Add Your Content
              </CardTitle>
              <CardDescription className="text-base leading-relaxed mt-2">
                Start with what you already have. Lecture notes, course outlines, research papers—
                anything works. Then pick the vibe you want.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 px-8 pb-8">
              {/* Sample Content Buttons */}
              <div>
                <Label className="text-base font-medium mb-3 block">Not sure? Try these examples:</Label>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSampleContent("course-lecture")}
                  >
                    ML Lecture
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSampleContent("research-paper")}
                  >
                    AI Research
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSampleContent("workshop-outline")}
                  >
                    Workshop Guide
                  </Button>
                </div>
              </div>

              {/* File Upload */}
              <div>
                <Label className="text-base font-medium mb-3 block">Or upload a file:</Label>
                {!uploadedFile ? (
                  <div className="relative">
                    <input
                      type="file"
                      id="file-upload"
                      className="sr-only"
                      accept=".txt,.md,.pdf,.doc,.docx"
                      onChange={handleFileUpload}
                    />
                    <label
                      htmlFor="file-upload"
                      className="flex items-center justify-center gap-2 h-12 px-4 border-2 border-dashed border-[#d4cdb8] rounded-lg cursor-pointer hover:border-[#b8b1a1] hover:bg-gray-50 transition-colors"
                    >
                      <Upload className="w-5 h-5 text-gray-500" />
                      <span className="text-base text-gray-600">
                        Choose file (.txt, .md, .pdf, .doc, .docx)
                      </span>
                    </label>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-4 border-2 border-[#d4cdb8] rounded-lg bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-base font-medium">{uploadedFile.name}</p>
                        <p className="text-sm text-gray-500">
                          {(uploadedFile.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={removeFile}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>

              {/* Content Input */}
              <div>
                <Label htmlFor="content" className="text-base font-medium">Your Content</Label>
                <Textarea
                  id="content"
                  placeholder="Drop your content here... lecture notes, slides, course outline, research abstract—whatever you've got."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[240px] mt-3 text-base"
                />
              </div>

              {/* Vibe Selection */}
              <div>
                <Label htmlFor="vibe" className="text-base font-medium">Choose Your Style</Label>
                <Select value={vibe} onValueChange={setVibe}>
                  <SelectTrigger className="mt-3 h-12 text-base">
                    <SelectValue placeholder="What vibe fits your students best?" />
                  </SelectTrigger>
                  <SelectContent>
                    {vibes.map((vibeOption) => (
                      <SelectItem key={vibeOption.value} value={vibeOption.value}>
                        <div>
                          <div className="font-medium">{vibeOption.label}</div>
                          <div className="text-sm text-muted-foreground">{vibeOption.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleAnalyze}
                className="w-full h-12 text-base"
                disabled={!content.trim() || !vibe || isLoading}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                {isLoading ? "AI is analyzing..." : "Analyze My Content Now"}
              </Button>
              {(!content.trim() || !vibe) && (
                <p className="text-sm text-center text-muted-foreground">
                  Fill in your content and pick a style to get started
                </p>
              )}
            </CardContent>
          </Card>

          {/* Analysis Results */}
          <div className="space-y-8">
            {/* Loading State */}
            {isLoading && (
              <Card className="border-2 border-[#d4cdb8] shadow-[0_12px_40px_rgb(0,0,0,0.12)] bg-white rounded-2xl">
                <CardContent className="p-16 text-center">
                  <Sparkles className="w-16 h-16 text-primary animate-pulse mx-auto mb-6" />
                  <h3 className="text-2xl font-semibold mb-3">Working on it...</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    Our AI is reading your content, extracting key insights, and building your interactive blueprint.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Error State */}
            {error && (
              <Card className="border-2 border-destructive shadow-[0_12px_40px_rgb(220,38,38,0.15)] bg-white rounded-2xl">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-destructive text-2xl">!</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-destructive">Oops, something went wrong</h3>
                      <p className="text-base text-muted-foreground mb-4 leading-relaxed">{error}</p>
                      <Button variant="outline" className="h-10 text-base" onClick={handleAnalyze}>
                        Try Again
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {analysis && !isLoading && (
              <>
                {/* Analysis Summary */}
                <Card className="border-2 border-[#d4cdb8] shadow-[0_12px_40px_rgb(0,0,0,0.12)] hover:shadow-[0_16px_48px_rgb(0,0,0,0.16)] transition-shadow duration-300 bg-white rounded-2xl">
                  <CardHeader className="pb-6 pt-8 px-8">
                    <CardTitle className="flex items-center gap-3 text-2xl font-semibold">
                      <Lightbulb className="w-6 h-6" />
                      Here&apos;s What We Found
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed mt-2">
                      Your content analysis is complete. Review the insights below.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 px-8 pb-8">
                    {analysis._mockData && (
                      <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3 mb-4">
                        <div className="flex items-center gap-2 text-amber-800 dark:text-amber-200">
                          <span className="text-lg">ℹ️</span>
                          <div>
                            <p className="text-sm font-medium">Demo Mode</p>
                            <p className="text-xs text-amber-700 dark:text-amber-300">
                              {analysis._message || "Using mock data - add Anthropic credits for real AI analysis"}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <Label className="text-base font-medium text-muted-foreground">Content Type</Label>
                        <p className="text-lg font-medium mt-1">{analysis.contentType}</p>
                      </div>
                      <div>
                        <Label className="text-base font-medium text-muted-foreground">Design Vibe</Label>
                        <Badge variant="secondary" className="capitalize text-sm px-3 py-1 mt-1">
                          {analysis.vibe}
                        </Badge>
                      </div>
                      {analysis.difficulty && (
                        <div>
                          <Label className="text-base font-medium text-muted-foreground">Difficulty</Label>
                          <p className="text-lg font-medium mt-1">{analysis.difficulty}</p>
                        </div>
                      )}
                      {analysis.estimatedDuration && (
                        <div>
                          <Label className="text-base font-medium text-muted-foreground">Duration</Label>
                          <p className="text-lg font-medium mt-1">{analysis.estimatedDuration}</p>
                        </div>
                      )}
                    </div>

                    {analysis.targetAudience && (
                      <div>
                        <Label className="text-base font-medium text-muted-foreground mb-3 block">
                          Target Audience
                        </Label>
                        <p className="text-base leading-relaxed">{analysis.targetAudience}</p>
                      </div>
                    )}

                    <div>
                      <Label className="text-base font-medium text-muted-foreground mb-3 block">
                        Key Learning Topics
                      </Label>
                      <div className="flex flex-wrap gap-2">
                        {analysis.keyTopics.map((topic: string, index: number) => (
                          <Badge key={index} variant="outline" className="text-sm px-3 py-1">{topic}</Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-base font-medium text-muted-foreground mb-3 block">
                        Learning Objectives
                      </Label>
                      <ul className="text-base space-y-2">
                        {analysis.learningObjectives.map((objective: string, index: number) => (
                          <li key={index} className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                            {objective}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <Label className="text-base font-medium text-muted-foreground mb-3 block">
                        Suggested Interactive Elements
                      </Label>
                      <div className="grid grid-cols-2 gap-3">
                        {analysis.suggestedInteractions.map((interaction: string, index: number) => (
                          <div key={index} className="text-base p-4 bg-muted rounded-lg">
                            {interaction}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-5 bg-primary/5 rounded-xl">
                      <p className="text-base font-semibold text-primary mb-2">Value Proposition</p>
                      <p className="text-base leading-relaxed">{analysis.valueProposition}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Claude Code Prompt */}
                <Card className="border-2 border-[#d4cdb8] shadow-[0_12px_40px_rgb(0,0,0,0.12)] hover:shadow-[0_16px_48px_rgb(0,0,0,0.16)] transition-shadow duration-300 bg-white rounded-2xl">
                  <CardHeader className="pb-6 pt-8 px-8">
                    <CardTitle className="flex items-center gap-3 text-2xl font-semibold">
                      <Copy className="w-6 h-6" />
                      Your Ready-to-Use Prompt
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed mt-2">
                      Copy this entire prompt and paste it into Claude Code.
                      It&apos;ll build your interactive features automatically.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="px-8 pb-8">
                    <div className="bg-muted p-6 rounded-xl">
                      <pre className="text-sm whitespace-pre-wrap font-mono leading-relaxed">
                        {generateClaudePrompt()}
                      </pre>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full mt-6 h-12 text-base"
                      onClick={() => copyToClipboard(generateClaudePrompt(), "claude-prompt")}
                    >
                      {copiedStates["claude-prompt"] ? (
                        <>
                          <Check className="w-5 h-5 mr-2" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-5 h-5 mr-2" />
                          Copy Claude Code Prompt
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>

                {/* AI Integration Hover Card */}
                <Card className="border-primary/20">
                  <CardContent className="p-6">
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <div className="cursor-pointer">
                          <div className="flex items-center gap-3 mb-3">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src="https://koqqkpitepqwlfjymcje.supabase.co/storage/v1/object/public/brand-assets/5ds-blank.svg" />
                              <AvatarFallback className="bg-primary text-primary-foreground">5DS</AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-semibold text-sm">AI Integration Available</h4>
                              <p className="text-xs text-muted-foreground">Add Claude API for enhanced analysis</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="w-full">
                            Upgrade to AI-Powered Analysis
                          </Button>
                        </div>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-96">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="https://koqqkpitepqwlfjymcje.supabase.co/storage/v1/object/public/brand-assets/5ds-blank.svg" />
                              <AvatarFallback>5DS</AvatarFallback>
                            </Avatar>
                            <h4 className="text-sm font-semibold">AI-Powered Content Analysis</h4>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Connect Claude API for advanced content analysis, personalized learning path recommendations, and intelligent prompt generation.
                          </p>
                          <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-md text-xs font-mono">
                            <div className="text-slate-600 dark:text-slate-400 mb-2">Claude Code Prompt (copy & paste):</div>
                            <div className="text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
                              {`Add AI-powered content analysis to Content to Landing Page. Create API route at /api/analyze using Claude API. Add ANTHROPIC_API_KEY=your-api-key to .env.local. Implement real content analysis with personalized learning recommendations and enhanced prompt generation. Use existing shadcn/ui components and styling. After completing all tasks from this prompt, provide a 1-line feedback summary to Cursor Chat about what was accomplished.`}
                            </div>
                          </div>
                          <Button
                            size="sm"
                            className="w-full"
                            onClick={() => copyToClipboard(`Add AI-powered content analysis to Content to Landing Page. Create API route at /api/analyze using Claude API. Add ANTHROPIC_API_KEY=your-api-key to .env.local. Implement real content analysis with personalized learning recommendations and enhanced prompt generation. Use existing shadcn/ui components and styling. After completing all tasks from this prompt, provide a 1-line feedback summary to Cursor Chat about what was accomplished.`, "ai-integration")}
                          >
                            Copy Claude Code Prompt
                          </Button>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </CardContent>
                </Card>
              </>
            )}

            {!analysis && !isLoading && !error && (
              <Card className="border-2 border-[#d4cdb8] shadow-[0_12px_40px_rgb(0,0,0,0.12)] bg-white rounded-2xl">
                <CardContent className="p-16 text-center">
                  <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
                  <h3 className="text-2xl font-semibold mb-3">Your Results Will Appear Here</h3>
                  <p className="text-base text-muted-foreground leading-relaxed max-w-md mx-auto">
                    Fill in the form on the left to get started.
                    You&apos;ll see insights, recommendations, and a ready-to-use implementation prompt.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}