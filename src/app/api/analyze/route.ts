import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { content, vibe } = await request.json();

    // Validate required fields
    if (!content || !vibe) {
      return NextResponse.json(
        { error: "Content and vibe are required" },
        { status: 400 }
      );
    }

    // Check for API key
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          error: "ANTHROPIC_API_KEY not configured",
          message: "Please add your Anthropic API key to .env.local"
        },
        { status: 500 }
      );
    }

    // Prepare the prompt for Claude
    const systemPrompt = `You are an expert educational content analyst and instructional designer. Your role is to analyze educational content and provide comprehensive recommendations for creating interactive learning experiences.

Analyze the provided educational content and return a JSON response with the following structure:
{
  "contentType": "Brief description of content type (e.g., 'Long-form lecture', 'Research paper summary', 'Workshop guide')",
  "keyTopics": ["Array", "of", "3-5", "key", "topics"],
  "learningObjectives": ["Array", "of", "3-5", "specific", "learning", "objectives"],
  "suggestedInteractions": ["Array", "of", "4-6", "specific", "interactive", "elements"],
  "valueProposition": "A compelling 1-2 sentence value proposition for this learning experience",
  "targetAudience": "Description of the ideal learner for this content",
  "estimatedDuration": "Estimated time to complete (e.g., '45 minutes', '2 hours')",
  "difficulty": "Beginner, Intermediate, or Advanced"
}

Focus on practical, implementable suggestions that align with the ${vibe} design aesthetic.`;

    const userPrompt = `Analyze this educational content and provide recommendations:

${content}

Design Style: ${vibe}`;

    // Call Claude API
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-3-5-haiku-latest",
        max_tokens: 2000,
        messages: [
          {
            role: "user",
            content: `${systemPrompt}\n\n${userPrompt}`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Claude API error:", errorData);

      // If it's a credit/billing/access error, return mock data instead
      if (response.status === 429 || response.status === 402 || response.status === 404 ||
          errorData.error?.type === "not_found_error" ||
          (errorData.error?.type === "invalid_request_error" &&
           errorData.error?.message?.includes("credit"))) {
        console.log("API access issue - falling back to mock data");
        return NextResponse.json({
          contentType: content.length > 500 ? "Long-form educational content" : "Short-form educational content",
          keyTopics: ["Educational Technology", "Interactive Learning", "Content Design"],
          learningObjectives: [
            "Understand core concepts from the material",
            "Apply knowledge to practical scenarios",
            "Evaluate learning outcomes effectively"
          ],
          suggestedInteractions: [
            "Interactive quizzes and assessments",
            "Progress tracking dashboard",
            "Peer discussion forums",
            "AI-powered Q&A system"
          ],
          valueProposition: "Transform static educational content into dynamic, personalized learning experiences using AI-driven analysis.",
          targetAudience: "Educators and learners seeking interactive educational experiences",
          estimatedDuration: content.length > 1000 ? "60-90 minutes" : "30-45 minutes",
          difficulty: "Intermediate",
          vibe: vibe,
          _mockData: true,
          _message: "Demo mode - Add credits to Anthropic account for real AI analysis"
        });
      }

      return NextResponse.json(
        {
          error: "Failed to analyze content",
          details: errorData.error?.message || "Unknown error"
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    const analysisText = data.content[0].text;

    // Parse the JSON response from Claude
    let analysis;
    try {
      // Try to extract JSON from the response
      const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[0]);
        // Add the vibe to the analysis
        analysis.vibe = vibe;
      } else {
        throw new Error("No JSON found in response");
      }
    } catch (parseError) {
      console.error("Failed to parse Claude response:", parseError);
      // Fallback to a basic analysis if parsing fails
      analysis = {
        contentType: content.length > 500 ? "Long-form content" : "Short-form content",
        keyTopics: ["Educational Content", "Learning Design", "AI Integration"],
        learningObjectives: [
          "Understand key concepts from the material",
          "Apply knowledge to practical scenarios",
          "Evaluate learning outcomes"
        ],
        suggestedInteractions: [
          "Interactive quizzes",
          "Progress tracking",
          "Discussion forums",
          "AI-powered Q&A"
        ],
        valueProposition: "Transform educational content into engaging, interactive learning experiences.",
        targetAudience: "General learners",
        estimatedDuration: "Varies",
        difficulty: "Intermediate",
        vibe: vibe
      };
    }

    return NextResponse.json(analysis);
  } catch (error) {
    console.error("Error in analyze API:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
