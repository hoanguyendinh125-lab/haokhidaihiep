import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateGoldenTurtleImage() {
  try {
    // Fetch the existing image to use as a reference
    const responseImg = await fetch('/img/thanrua.png');
    const blob = await responseImg.blob();
    const reader = new FileReader();
    
    const base64Promise = new Promise<string>((resolve) => {
      reader.onloadend = () => {
        const base64data = reader.result as string;
        // Remove the data:image/png;base64, prefix
        resolve(base64data.split(',')[1]);
      };
    });
    reader.readAsDataURL(blob);
    const base64ImageData = await base64Promise;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64ImageData,
              mimeType: 'image/png',
            },
          },
          {
            text: 'mystical Golden Turtle, Vietnamese lacquer art style, gold and crimson colors, divine glowing eyes, ancient patterns, high resolution, isolated on a pure white background, no shadows.',
          },
        ],
      },
    });

    if (response.candidates && response.candidates.length > 0) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    return null;
  } catch (error) {
    console.error("Error generating image:", error);
    return null;
  }
}
