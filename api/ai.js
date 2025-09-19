import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { prompt } = req.body;

  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generate",
      {
        prompt: { text: prompt },
        temperature: 0.7,
        maxOutputTokens: 500,
      },
      {
        headers: {
          "Authorization": "Bearer AIzaSyDIKc96jiFKaI2iBxe3WFa_ExZfhRpfzNU",
        },
      }
    );
    res.status(200).json(response.data.candidates[0]);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: error.message });
  }
}
