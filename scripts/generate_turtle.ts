import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateImage() {
  try {
    console.log('Reading existing image...');
    const imagePath = path.join(process.cwd(), 'public', 'img', 'thanrua.png');
    let base64ImageData = '';
    let mimeType = 'image/png';
    
    if (fs.existsSync(imagePath)) {
      const imageBytes = fs.readFileSync(imagePath);
      base64ImageData = imageBytes.toString('base64');
    } else {
      console.log('Existing image not found, generating from scratch.');
    }

    console.log('Calling Gemini API...');
    const parts: any[] = [
      {
        text: 'mystical Golden Turtle, Vietnamese lacquer art style, gold and crimson colors, divine glowing eyes, ancient patterns, high resolution, isolated on a pure white background, no shadows.',
      }
    ];

    if (base64ImageData) {
      parts.unshift({
        inlineData: {
          data: base64ImageData,
          mimeType: mimeType,
        },
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: parts,
      },
    });
    
    console.log('Processing response...');
    if (response.candidates && response.candidates.length > 0) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64Data = part.inlineData.data;
          fs.writeFileSync(imagePath, Buffer.from(base64Data, 'base64'));
          console.log('Image generated and saved successfully to ' + imagePath);
          return;
        } else if (part.text) {
          console.log('Model returned text:', part.text);
        }
      }
    }
    console.log('No image data found in response.');
  } catch (error) {
    console.error('Error generating image:', error);
  }
}

generateImage();
