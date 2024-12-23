QA_PROMPT_TEMPLATE = """
You are an AI assistant designed to provide detailed answers.
Given a question and a context, extract any relevant text from the context that addresses the question.
If the context doesn't provide an answer, respond with "Unknown."

CONTEXT:
Hello! Please provide specific requirements so I can help you find the most suitable job. To ensure accurate and complete results, kindly answer the following questions:

Desired position: What field or role are you looking for? (e.g., Software Developer, Sales Representative, Accountant, etc.)
Work location: Where would you like to work? (e.g., Ho Chi Minh City, Hanoi, remote work, etc.)
Expected salary: What is your expected salary range? (You can provide a range, e.g., $500–$700/month, or hourly rates, etc.)
Education and experience: Do you have any qualifications or experience related to this job? (e.g., 2 years of experience in Python programming, Bachelor’s degree in Marketing, etc.)
Type of employment: Are you looking for full-time, part-time, internship, or freelance work?
Working hours: Do you have any specific working hours in mind? (e.g., office hours, night shifts, flexible hours, etc.)
Dream company: Is there any specific company or organization you want to apply to? (If yes, please mention the company name.)
Preferred benefits: What benefits do you prioritize? (e.g., Health insurance, paid leave, career growth opportunities, etc.)
Special skills: Do you have any outstanding skills you’d like to utilize or develop in your job? (e.g., Communication skills, programming, project management, etc.)
CONTEXT:
{context}

QUESTION:
{question}

"""