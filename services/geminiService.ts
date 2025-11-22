import { GoogleGenAI, Type, Schema } from "@google/genai";
import { PreInterviewData, PreInterviewResult, PostInterviewInput, PostInterviewResult } from "../types";

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const PRE_INTERVIEW_MODEL = 'gemini-2.5-flash';
const POST_INTERVIEW_MODEL = 'gemini-2.5-flash'; // Using flash for speed, could use pro for complex reasoning

/**
 * Generates pre-interview preparation materials: Summary and Outline.
 */
export const generatePreInterviewPrep = async (data: PreInterviewData): Promise<PreInterviewResult> => {
  const prompt = `
    You are an expert Sales Consultant and Researcher.
    I am preparing for an interview with a client.
    
    Target: ${data.customerName} at ${data.companyName}.
    
    Here is our Internal Data (CRM/Sales Notes):
    ${data.internalNotes}
    
    Here is External Data (Public Info/News):
    ${data.externalInfo}
    
    Please generate a response in JSON format with the following three distinct fields:
    1. backgroundSummary: A concise professional summary merging internal and external facts.
    2. interviewOutline: A structured list of questions and topics to cover, organized by phases (Ice breaking, Discovery, Closing).
    3. suggestedStrategy: A brief strategic advice paragraph on how to approach this specific person based on the tone of the data.
  `;

  const responseSchema: Schema = {
    type: Type.OBJECT,
    properties: {
      backgroundSummary: { type: Type.STRING },
      interviewOutline: { type: Type.STRING },
      suggestedStrategy: { type: Type.STRING },
    },
    required: ["backgroundSummary", "interviewOutline", "suggestedStrategy"],
  };

  try {
    const response = await ai.models.generateContent({
      model: PRE_INTERVIEW_MODEL,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const result = JSON.parse(response.text || "{}");
    return result as PreInterviewResult;
  } catch (error) {
    console.error("Error generating pre-interview prep:", error);
    throw new Error("Failed to generate pre-interview materials.");
  }
};

/**
 * Generates a post-interview report and extracts structured data for the database.
 */
export const generatePostInterviewAnalysis = async (data: PostInterviewInput): Promise<PostInterviewResult> => {
  const prompt = `
    You are a Senior CRM Specialist and Data Analyst.
    We just finished an interview with ${data.customerName}.
    
    Here are the raw notes/transcript from the interview:
    "${data.interviewNotes}"
    
    Task 1: Generate a professional Meeting Report (Markdown format) summarizing key takeaways, action items, and sentiment.
    Task 2: Extract structured data to update our Customer Persona Database.
  `;

  const responseSchema: Schema = {
    type: Type.OBJECT,
    properties: {
      meetingReportMarkdown: { 
        type: Type.STRING, 
        description: "The full text meeting report formatted in Markdown." 
      },
      updatedPersonaData: {
        type: Type.OBJECT,
        description: "Structured fields extracted from the conversation.",
        properties: {
          keyPainPoints: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "List of specific problems the customer is facing."
          },
          budget: { type: Type.STRING, description: "Estimated budget or financial constraints mentioned." },
          decisionMakerStatus: { type: Type.STRING, description: "Is this person the decision maker? e.g., 'Primary', 'Influencer', 'Gatekeeper'." },
          industry: { type: Type.STRING, description: "The industry they operate in, if mentioned." },
          tags: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "3-5 short tags describing the client (e.g., 'High Value', 'Urgent', 'Tech-savvy')."
          }
        }
      }
    },
    required: ["meetingReportMarkdown", "updatedPersonaData"],
  };

  try {
    const response = await ai.models.generateContent({
      model: POST_INTERVIEW_MODEL,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const result = JSON.parse(response.text || "{}");
    return result as PostInterviewResult;
  } catch (error) {
    console.error("Error generating post-interview analysis:", error);
    throw new Error("Failed to analyze interview.");
  }
};
