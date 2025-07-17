const { text } = require("stream/consumers")

const callGemini = async (questions) => {
    const url = ""

    const response = await axios.post(url, 
        {
            contents : [{
                parts: [{text: prompt}]
            }]
        },
        {
            headers: {
                "Content-Type": "application/json",
                "X-google-api-key": process.env.GEMINI_API_KEY
            }
        }   
    );   
    
    const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    return text.split("\n").filter((line) => line.trim() !== "");
}

module.exports = {callGemini};