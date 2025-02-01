import { GoogleGenerativeAI } from "@google/generative-ai";

// Get API key from environment variable
const apiKey = "AIzaSyCaWBy9tAOF7rdJfF-e_1VNzoh9Al117Tw";
const genAI = new GoogleGenerativeAI(apiKey);

export const generateQuestions = async (topic) => {
  if (!topic) {
    throw new Error('Topic is required');
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Create 5 multiple choice questions about ${topic} in cybersecurity. 
    Focus on practical scenarios, attack methods, prevention techniques, and best practices.
    Make questions challenging but understandable.

    Return the response in this exact JSON format:
    {
      "questions": [
        {
          "question": "Question text here?",
          "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
          "correctAnswer": "The correct option text exactly as it appears in options"
        }
      ]
    }

    Requirements:
    1. Create exactly 5 questions
    2. Each question must have exactly 4 options
    3. One option must be the correct answer
    4. The correctAnswer must match exactly with one of the options
    5. Make all options realistic and plausible
    6. Include both technical and practical questions
    
    Topics to cover for each type:
    - Phishing: Email scams, identifying fake emails, prevention methods
    - Pretexting: Social engineering, impersonation tactics, verification methods
    - Baiting: Physical and digital lures, USB drops, malware delivery
    - Diversion Theft: Package redirection, delivery fraud, supply chain attacks
    - Vishing: Voice phishing, phone scams, caller verification
    - Whaling: Executive targeting, spear phishing, high-value targets`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    try {
      // Remove any markdown formatting if present
      const cleanText = text.replace(/```json\n?|\n?```/g, '');
      const data = JSON.parse(cleanText);
      
      // Validate response format
      if (!data.questions || !Array.isArray(data.questions)) {
        throw new Error('Invalid response format: questions array not found');
      }

      // Validate each question
      data.questions.forEach((q, index) => {
        if (!q.question || !Array.isArray(q.options) || !q.correctAnswer) {
          throw new Error(`Invalid question format at index ${index}`);
        }
        if (q.options.length !== 4) {
          throw new Error(`Question at index ${index} must have exactly 4 options`);
        }
        if (!q.options.includes(q.correctAnswer)) {
          throw new Error(`Correct answer not found in options for question ${index + 1}`);
        }
      });

      if (data.questions.length !== 5) {
        throw new Error('Must have exactly 5 questions');
      }
      
      return data.questions;
    } catch (parseError) {
      console.error('Error parsing Gemini response:', parseError, 'Raw text:', text);
      throw new Error('Failed to generate valid questions. Please try again.');
    }
  } catch (error) {
    console.error('Error generating questions:', error);
    throw new Error('Failed to generate questions. Please check your API key and try again.');
  }
};