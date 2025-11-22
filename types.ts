export enum AppView {
  DASHBOARD = 'DASHBOARD',
  PRE_INTERVIEW = 'PRE_INTERVIEW',
  POST_INTERVIEW = 'POST_INTERVIEW',
  CUSTOMER_DB = 'CUSTOMER_DB'
}

export interface CustomerPersona {
  id: string;
  name: string;
  company: string;
  role: string;
  industry: string;
  keyPainPoints: string[];
  budget?: string;
  decisionMakerStatus?: string;
  lastInterviewDate?: string;
  tags: string[];
  status: 'Lead' | 'Active' | 'Churned' | 'Prospect';
}

export interface PreInterviewData {
  customerName: string;
  companyName: string;
  internalNotes: string; // From CRM or sales notes
  externalInfo: string; // From LinkedIn, News, Website
}

export interface PreInterviewResult {
  backgroundSummary: string;
  interviewOutline: string;
  suggestedStrategy: string;
}

export interface PostInterviewInput {
  customerId: string;
  interviewNotes: string; // Transcript or raw notes
  customerName: string; // For context
}

export interface PostInterviewResult {
  meetingReportMarkdown: string;
  updatedPersonaData: Partial<CustomerPersona>;
}
