from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate
from langchain.prompts import ChatPromptTemplate
import os
import sys
from transformers import pipeline
from langchain_groq import ChatGroq

from create_db import CreateDB


class Chat:
    def __init__(self, model_name, API_KEY, temperature, db_path, loader, prompt):
        self.model_name = model_name
        self.API_KEY = API_KEY
        self.temperature = temperature
        self.loader = loader
        self.db = CreateDB(loader, db_path).load_db()
        self.prompt = prompt

    def get_llm(self):
        return ChatGroq(
            temperature=self.temperature,
            model=self.model_name,
            api_key=self.API_KEY
        )

    def get_match(self, query):
        docs = self.db.similarity_search(query)
        return docs

    def create_prompt(self):
      prompt = ChatPromptTemplate.from_template(self.prompt)
      return prompt
    def qa_bot(self, query):
      docs = self.get_match(query)
      chain = self.create_prompt() | self.get_llm()
      return chain.invoke({"question": query, "context": docs}).content