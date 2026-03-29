import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "https://blogapp.local",
    "X-Title": "BlogApp Autocomplete",
  },
});

const MODEL = "anthropic/claude-sonnet-4.6";


export const getAutocompleteSuggestion = async (req, res, next) => {
  try {
    const { context, type } = req.body;

    if (!context || typeof context !== "string") {
      return res.status(400).json({ message: "context is required" });
    }

    if (!process.env.OPENROUTER_API_KEY) {
      return res
        .status(500)
        .json({ message: "OPENROUTER_API_KEY is not configured on the server" });
    }

    const systemPrompt =
      type === "title"
        ? "You are a creative blog title assistant. Complete the blog post title the user has started writing. Return ONLY the completion (the missing part), not the full title. Keep it concise, engaging, and natural. Do not add quotes, explanations, or extra text."
        : "You are a skilled blog writing assistant. Continue the blog post content the user has started writing. Return ONLY the continuation text (a few sentences), maintaining the same tone and style. Do not repeat what was already written, add a heading, or include any meta-commentary.";

    const userPrompt =
      type === "title"
        ? `Complete this blog title: "${context}"`
        : `Continue this blog post content:\n\n${context}`;

    const response = await client.chat.completions.create({
      model: MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      max_tokens: type === "title" ? 30 : 150,
      temperature: 0.7,
    });

    const suggestion = response.choices[0]?.message?.content?.trim() ?? "";

    return res.status(200).json({ suggestion });
  } catch (error) {
    console.error("Autocomplete error:", error?.message || error);
    next(error);
  }
};
