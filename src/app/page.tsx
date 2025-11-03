import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Zap, Shield } from "lucide-react";
import { Hero } from "@/components/ui/hero";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f3f1ea]">
      {/* Hero Section */}
      <Hero
        eyebrow="INTRODUCING CONTENT TO LANDING PAGE"
        title={
          <>
            <div className="whitespace-nowrap">
              <span className="font-normal">Turn Your Content Into </span>
              <span className="font-normal italic">Interactive </span>
              <span className="font-normal">Experiences</span>
            </div>
            <div className="font-normal">
              In Minutes, Not Hours
            </div>
          </>
        }
        subtitle="AI-powered analysis transforms your lecture notes, course materials, and educational content into engaging landing pages"
        ctaText="Try It Free Now"
        ctaLink="/application"
      />

      {/* Content Section */}
      <main className="w-full bg-[#f3f1ea]">
        <div className="container mx-auto px-4 py-16 md:py-20">

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20">
          <Card className="group border border-[#e8e3d6]/50 shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.15)] hover:-translate-y-2 transition-all duration-500 bg-white rounded-2xl overflow-hidden animate-appear opacity-0">
            <CardHeader className="pb-8 pt-10 px-10">
              <div className="w-16 h-16 bg-gradient-to-br from-[#000000] to-[#2d2d2d] rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold mb-5 leading-tight">Stop Wasting Hours on Content Design</CardTitle>
              <CardDescription className="text-lg leading-relaxed text-gray-700">
                Paste your lecture notes, course outline, or research paper.
                Our AI instantly identifies what makes your content engaging—and what&apos;s missing.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-10 pb-10">
              <ul className="text-lg text-gray-600 space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Extract key learning objectives automatically</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Identify your ideal student audience</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Get specific interaction recommendations</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="group border border-[#e8e3d6]/50 shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.15)] hover:-translate-y-2 transition-all duration-500 bg-white rounded-2xl overflow-hidden animate-appear opacity-0 delay-100">
            <CardHeader className="pb-8 pt-10 px-10">
              <div className="w-16 h-16 bg-gradient-to-br from-[#000000] to-[#2d2d2d] rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold mb-5 leading-tight">Build It in One Click</CardTitle>
              <CardDescription className="text-lg leading-relaxed text-gray-700">
                Get ready-to-use prompts that tell Claude Code exactly how to build your interactive features.
                No coding required. No design skills needed.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-10 pb-10">
              <ul className="text-lg text-gray-600 space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Copy-paste prompts for instant results</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Includes quizzes, progress trackers, Q&A systems</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Works with your existing content</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="group border border-[#e8e3d6]/50 shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.15)] hover:-translate-y-2 transition-all duration-500 bg-white rounded-2xl overflow-hidden animate-appear opacity-0 delay-300">
            <CardHeader className="pb-8 pt-10 px-10">
              <div className="w-16 h-16 bg-gradient-to-br from-[#000000] to-[#2d2d2d] rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold mb-5 leading-tight">From Boring to Brilliant in 5 Minutes</CardTitle>
              <CardDescription className="text-lg leading-relaxed text-gray-700">
                Your students are losing interest. You need results fast.
                Start with working code that&apos;s ready to deploy—not a tutorial to follow.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-10 pb-10">
              <ul className="text-lg text-gray-600 space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Modern, professional design out of the box</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Mobile-friendly automatically</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Deploy to students in minutes, not days</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* How It Works */}
        <Card className="max-w-6xl mx-auto border border-[#e8e3d6]/50 shadow-[0_8px_30px_rgb(0,0,0,0.08)] bg-white rounded-2xl overflow-hidden">
          <CardHeader className="text-center pb-10 pt-10">
            <CardTitle className="text-4xl font-semibold mb-3">How It Works</CardTitle>
            <CardDescription className="text-lg">
              Four simple steps to transform your content
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-10 px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-8 rounded-xl bg-gradient-to-br from-[#f9f7f3] to-[#f3f1ea] border border-[#e8e3d6]/30 hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-gradient-to-br from-[#000000] to-[#2d2d2d] text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl shadow-md">
                  1
                </div>
                <h3 className="font-semibold mb-3 text-lg">Paste Your Content</h3>
                <p className="text-base text-muted-foreground leading-relaxed">Drop in lecture notes or course materials</p>
              </div>
              <div className="text-center p-8 rounded-xl bg-gradient-to-br from-[#f9f7f3] to-[#f3f1ea] border border-[#e8e3d6]/30 hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-gradient-to-br from-[#000000] to-[#2d2d2d] text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl shadow-md">
                  2
                </div>
                <h3 className="font-semibold mb-3 text-lg">AI Analyzes It</h3>
                <p className="text-base text-muted-foreground leading-relaxed">Get instant insights and recommendations</p>
              </div>
              <div className="text-center p-8 rounded-xl bg-gradient-to-br from-[#f9f7f3] to-[#f3f1ea] border border-[#e8e3d6]/30 hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-gradient-to-br from-[#000000] to-[#2d2d2d] text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl shadow-md">
                  3
                </div>
                <h3 className="font-semibold mb-3 text-lg">Copy the Prompt</h3>
                <p className="text-base text-muted-foreground leading-relaxed">Get implementation-ready code prompts</p>
              </div>
              <div className="text-center p-8 rounded-xl bg-gradient-to-br from-[#f9f7f3] to-[#f3f1ea] border border-[#e8e3d6]/30 hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-gradient-to-br from-[#000000] to-[#2d2d2d] text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl shadow-md">
                  4
                </div>
                <h3 className="font-semibold mb-3 text-lg">Launch to Students</h3>
                <p className="text-base text-muted-foreground leading-relaxed">Deploy your interactive experience</p>
              </div>
            </div>
          </CardContent>
        </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#e8e3d6] border-t border-[#d4cdb8]">
        <div className="container mx-auto px-4 py-10">
          <div className="text-center text-base text-muted-foreground">
            <p>Built for educators who deserve better tools • Powered by AI • Ready in minutes</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
