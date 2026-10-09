import "dotenv/config";

const getOpenAIAPIResponse = async (message) => {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
        throw new Error("Missing OPENAI_API_KEY in environment variables");
    }

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [{
                role: "user",
                content: message
            }]
        })
    };

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", options);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error?.message || "OpenAI request failed");
        }

        return data.choices[0].message.content;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export default getOpenAIAPIResponse;
