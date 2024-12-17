from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
class CreateDB:
  def __init__(self, loader, save_path, embeddings = HuggingFaceEmbeddings(
      model_name="sentence-transformers/all-mpnet-base-v2")):
    self.loader = loader
    self.save_path = save_path
    self.embeddings = embeddings

  def create_db(self):
    db = FAISS.from_documents(self.loader, self.embeddings)
    db.save_local(self.save_path)
    return db
  def load_db(self):
    database = FAISS.load_local(self.save_path, self.embeddings,
                                allow_dangerous_deserialization=True)
    return database