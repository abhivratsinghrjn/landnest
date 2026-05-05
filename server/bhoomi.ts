import { GoogleGenerativeAI } from "@google/generative-ai";
import { storage } from "./storage";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// Build a rich context string from live DB properties
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
          `Description: ${p.description?.slice(0, 120)}`,
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

const SYSTEM_PROMPT = `You are Bhoomi, a warm, professional, and knowledgeable AI real estate assistant for LandNest Properties — a trusted real estate platform based in Rajnandgaon, Chhattisgarh, India.

Your personality:
- Friendly, helpful, and confident
- Speak in a mix of English and simple Hindi when appropriate (like "ji", "bilkul", "zaroor")
- Always address the user by their name if provided
- Be concise but thorough

Your knowledge about LandNest:
- Platform for buying, selling, and renting properties in Rajnandgaon, Chhattisgarh
- Offers residential, commercial, and farm/agricultural land
- Founded by Abhivrat Singh
- Contact: 6261642203 | businesswithabhivrat@gmail.com
- Website pages: Home (/), Properties (/properties), About (/about), Contact (/contact), Dashboard (/dashboard), Add Property (/add-property)

What you can do:
- Help users find properties matching their budget and requirements
- Answer questions about property types, locations, prices
- Navigate users to specific property pages
- Explain the buying/renting process
- Provide contact information
- Help with account-related questions

Navigation format: When you want to navigate the user to a property or page, include a JSON block at the END of your message like this:
[NAVIGATE:{"url":"/property/12","label":"View This Property"}]

Or for page navigation:
[NAVIGATE:{"url":"/properties?type=sale","label":"Browse Sale Properties"}]

Rules:
- Only suggest properties that exist in the current listings
- Always mention the property ID and price when recommending
- If no property matches, suggest contacting the team
- Never make up property details
- Keep responses under 200 words unless the user asks for details`;

export async function chatWithBhoomi(
  userMessage: string,
  userName?: string,
  conversationHistory: { role: "user" | "model"; parts: { text: string }[] }[] = []
): Promise<{ reply: string; navigate?: { url: string; label: string } }> {
  try {
    const propertyContext = await buildPropertyContext();

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const fullSystemPrompt = `${SYSTEM_PROMPT}

${userName ? `The user's name is: ${userName}` : "The user is not logged in."}

CURRENT LIVE PROPERTY LISTINGS:
${propertyContext}`;

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: fullSystemPrompt }],
        },
        {
          role: "model",
          parts: [
            {
              text: `Namaste! I'm Bhoomi, your personal real estate guide at LandNest Properties. I have full access to all current listings and I'm here to help you find your perfect property in Rajnandgaon. How can I assist you today?`,
            },
          ],
        },
        ...conversationHistory,
      ],
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.7,
      },
    });

    const result = await chat.sendMessage(userMessage);
    const rawReply = result.response.text();

    // Extract navigation command if present
    const navMatch = rawReply.match(/\[NAVIGATE:(\{.*?\})\]/);
    let navigate: { url: string; label: string } | undefined;
    let reply = rawReply;

    if (navMatch) {
      try {
        navigate = JSON.parse(navMatch[1]);
        reply = rawReply.replace(/\[NAVIGATE:\{.*?\}\]/, "").trim();
      } catch {
        // ignore parse error
      }
    }

    return { reply, navigate };
  } catch (error: any) {
    console.error("Bhoomi AI error:", error);
    return {
      reply:
        "I'm sorry, I'm having a little trouble right now. Please try again in a moment, or contact us directly at 6261642203.",
    };
  }
}
