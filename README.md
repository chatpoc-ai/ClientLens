# ClientLens - Intelligent Interview System

![ClientLens App](https://placehold.co/600x200/2563eb/ffffff?text=ClientLens)

**ClientLens** is a specialized AI-assisted web application designed to revolutionize how professionals prepare for, conduct, and analyze customer interviews. By acting as an intelligent layer between raw data and actionable insights, ClientLens bridges the gap between static CRM records and dynamic human conversations.

## 🚀 Features

### 1. 🔮 Pre-Interview Preparation (The "Lens In")
Stop entering meetings unprepared. ClientLens aggregates scattered data to build a cohesive strategy before you even say "Hello."
*   **Data Synthesis:** Instantly merges internal CRM notes (history, objections) with external intelligence (LinkedIn bios, recent news, company websites).
*   **Strategic Planning:** Generates a tailored **Interview Outline** and **Strategic Approach** based on the specific client's context.
*   **Background Summaries:** Creates concise briefings so you don't have to tab-switch between multiple sources 5 minutes before a call.

### 2. 📝 Post-Interview Analysis (The "Clarity")
Turn unstructured conversation into structured gold.
*   **Automated Reporting:** Converts raw transcripts or messy bullet points into professional **Meeting Reports** formatted in Markdown.
*   **Insight Extraction:** Automatically identifies and extracts critical structured data:
    *   **Key Pain Points:** What is actually bothering the client?
    *   **Budget & Authority:** Identifies financial constraints and decision-maker status.
    *   **Industry & Tags:** Auto-tags clients for better segmentation.
*   **Database Sync:** Updates the central customer persona database with a single click, ensuring your records are never stale.

### 3. 👥 Dynamic Customer Persona Database
A living repository of your clients.
*   **Visual Dashboard:** View your clients not as rows in a spreadsheet, but as rich, card-based personas.
*   **Status Tracking:** Monitor relationships across stages (Lead, Active, Churned, Prospect).
*   **Rich Metadata:** Instantly see last interview dates, roles, and aggregated pain points.

---

## 🎯 Target Market & Use Cases

ClientLens is built for professionals who rely on high-quality human interactions to drive business results.

### Primary Markets
*   **B2B Sales Teams (SaaS, Enterprise):** Account Executives (AEs) use it to prep for discovery calls and automate the tedious data entry into Salesforce/HubSpot after the call.
*   **Customer Success Managers (CSMs):** Use it to track client health, prepare for QBRs (Quarterly Business Reviews), and maintain a historical record of client sentiment.
*   **User Researchers & Product Managers:** Use it to synthesize user interviews, extract feature requests, and build accurate user personas based on real conversations.

### The Problem Solved
*   **The "Prep Gap":** Most reps spend too little time prepping or too much time digging for info. ClientLens reduces 30 minutes of research to 30 seconds.
*   **The "CRM Graveyard":** CRMs often become graveyards of outdated info because manual data entry is painful. ClientLens automates the extraction of structured data, keeping the database alive.
*   **Lost Insights:** Nuance is often lost in manual note-taking. ClientLens captures the subtle details (tone, specific pain points) that might be missed.

---

## 🛠 Tech Stack

*   **Frontend:** React 19, Tailwind CSS (Inter font family)
*   **Icons:** Lucide React
*   **AI Engine:** Google Gemini API (`gemini-2.5-flash` for high-speed, low-latency reasoning)
*   **Build System:** ES Modules (No-build setup for rapid prototyping)

## 📦 Setup & Usage

1.  **Environment Variables:**
    Ensure you have a valid Google Gemini API key stored in `process.env.API_KEY`.

2.  **Installation:**
    The project is designed to run in a modern web environment supporting ES modules. No complex build step is required for the basic version.

3.  **Workflow:**
    *   Navigate to **Pre-Interview** to generate your script.
    *   Conduct your meeting.
    *   Navigate to **Post-Interview**, paste your notes, and let AI update the **Customer DB**.

---

*ClientLens: See your customers clearly.*
