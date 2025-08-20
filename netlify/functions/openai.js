const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.handler = async function (event) {
  try {
    const { question } = JSON.parse(event.body || "{}");
    if (!question) return { statusCode: 400, body: JSON.stringify({ error: "No question provided." }) };

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: question }],
    });

    return { statusCode: 200, body: JSON.stringify({ answer: completion.choices[0].message.content }) };
  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: JSON.stringify({ error: error.message || "Server error" }) };
  }
};
