import Groq from "groq-sdk";
import { storage } from "./storage";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Build rich context from live DB properties
async function buildPropertyContext(): Promise<string> {
  try {
    const properties = await storage.getProperties();
    if (!properties.length) return "No properties currently listed.";

    return properties
      .map((p) => {
        const price =
          p.type === "rent"
            ? `₹${p.price.toLocaleString("en-IN")}/month`
            : p.price >= 10000000
            ? `₹${(p.price / 10000000).toFixed(2)} Cr`
            : p.price >= 100000
            ? `₹${(p.price / 100000).toFixed(1)} L`
            : `₹${p.price.toLocaleString("en-IN")}`;

        return [
          `ID: ${p.id}`,
          `Title: ${p.title}`,
          `Type: ${p.type} | Category: ${p.category}`,
          `Price: ${price}`,
          `Location: ${p.location}`,
          `Area: ${p.area} sq ft`,
          p.bedrooms ? `Bedrooms: ${p.bedrooms}` : null,
          `Status: ${p.status}`,
          `Description: ${p.description?.slice(0, 150)}`,
          `URL: /property/${p.id}`,
        ]
          .filter(Boolean)
          .join(" | ");
      })
      .join("\n");
  } catch {
    return "Unable to fetch properties at this time.";
  }
}

export async function chatWithBhoomi(
  userMessage: string,
  userName?: string,
  conversationHistory: { role: "user" | "assistant"; content: string }[] = []
): Promise<{ reply: string; navigate?: { url: string; label: string } }> {
  try {
    const propertyContext = await buildPropertyContext();

    const systemPrompt = `You are Bhoomi, a warm, professional, and knowledgeable AI real estate assistant for LandNest Properties — a trusted real estate platform based in Rajnandgaon, Chhattisgarh, India.

Your personality:
- Friendly, helpful, and confident
- You can use simple Hindi words occasionally (like "ji", "bilkul", "zaroor", "namaste") to feel local and warm
- Always address the user by their name if provided
- Be concise but thorough — keep responses under 180 words

Your knowledge about LandNest:
- Platform for buying, selling, and renting properties in Rajnandgaon, Chhattisgarh
- Offers residential, commercial, and farm/agricultural land
- Founded by Abhivrat Singh
- Contact: 6261642203 | businesswithabhivrat@gmail.com
- Pages: Home (/), Properties (/properties), About (/about), Contact (/contact), Dashboard (/dashboard), Add Property (/add-property)

${userName ? `The user's name is: ${userName}` : "The user is browsing as a guest."}

CURRENT LIVE PROPERTY LISTINGS (use ONLY these for recommendations):
${propertyContext}

Navigation instructions: When recommending a specific property or page, append a navigation tag at the very end of your response in this exact format (no spaces inside):
[NAVIGATE:{"url":"/property/12","label":"View This Property"}]

For page navigation:
[NAVIGATE:{"url":"/properties?type=sale","label":"Browse Sale Properties"}]

Rules:
- Only recommend properties from the list above
- Always mention price and location when suggesting a property
- If no property matches the user's need, suggest contacting the team
- Never fabricate property details`;

    const messages: { role: "user" | "assistant" | "system"; content: string }[] = [
      { role: "system", content: systemPrompt },
      ...conversationHistory,
      { role: "user", content: userMessage },
    ];

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages,
      max_tokens: 400,
      temperature: 0.7,
    });

    const rawReply = completion.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response. Please try again.";

    // Extract navigation command if present
    const navMatch = rawReply.match(/\[NAVIGATE:(\{[^}]+\})\]/);
    let navigate: { url: string; label: string } | undefined;
    let reply = rawReply;

    if (navMatch) {
      try {
        navigate = JSON.parse(navMatch[1]);
        reply = rawReply.replace(/\[NAVIGATE:\{[^}]+\}\]/, "").trim();
      } catch {
        // ignore parse error, keep full reply
      }
    }

    return { reply, navigate };
  } catch (error: any) {
    console.error("Bhoomi AI error:", error?.message || error);

    if (error?.message?.includes("429") || error?.message?.includes("rate limit")) {
      return { reply: "I'm a little busy right now — please try again in a moment! Or reach us at 6261642203." };
    }
    if (error?.message?.includes("401") || error?.message?.includes("API key")) {
      return { reply: "My AI service isn't configured correctly. Please contact the site admin." };
    }
    return { reply: "Something went wrong on my end. Please try again or contact us at 6261642203." };
  }
}
