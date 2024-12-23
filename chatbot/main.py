from qa_tool import*
from csv_load import*
from summarize_prompt import QA_PROMPT_TEMPLATE

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

# Load the CSV file containing job data
csv_ = CSVLoaderCustom(path_file= 'D:\project_v1\data\jobs.csv')
loader = csv_.split_load()
# Initialize the Chat instance
chat_instance = Chat(
    model_name="llama-3.1-70b-versatile",       
    API_KEY="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", 
    temperature=0.2,           
    db_path="D:\\project_v1\\data",  
    loader=loader,     
    prompt=QA_PROMPT_TEMPLATE  
    )

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define a Pydantic model for receiving input from the Frontend
class Query(BaseModel):
    query: str

@app.post("/api/query")
async def get_job_recommendation(query: Query):
    user_input = query.query
    response = chat_instance.qa_bot(user_input)

    return {"answer": response}  # Return the response as a dictionary with the key "answer"