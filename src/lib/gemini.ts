import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function getLegalAdvice(prompt: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const result = await model.generateContent(`
      As a legal AI assistant, please provide advice on the following legal question. 
      Be professional, accurate, and cite relevant legal principles when applicable:
      
      ${prompt}
    `);
    
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error getting legal advice:', error);
    throw error;
  }
}