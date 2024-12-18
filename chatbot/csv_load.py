import csv
from typing import List, Dict
from langchain_text_splitters import CharacterTextSplitter
from langchain.docstore.document import Document

class CSVLoaderCustom:
    def __init__(self, path_file: str, delimiter: str = ",", quotechar: str = '"', encoding: str = 'utf-8') -> None:
        self._path = path_file
        self._delimiter = delimiter
        self._quotechar = quotechar
        self._encoding = encoding

    def loader(self) -> List[Dict]:
        # Directly load CSV using Python's built-in csv module
        rows = []
        try:
            with open(self._path, mode='r', newline='', encoding=self._encoding) as file:
                csv_reader = csv.DictReader(file, delimiter=self._delimiter, quotechar=self._quotechar)
                for row in csv_reader:
                    rows.append(row)
        except UnicodeDecodeError:
            with open(self._path, mode='r', newline='', encoding='latin-1') as file:
                csv_reader = csv.DictReader(file, delimiter=self._delimiter, quotechar=self._quotechar)
                for row in csv_reader:
                    rows.append(row)
        return rows

    def split_load(self, chunk_size: int = 1000, chunk_overlap: int = 50):
        # Load rows from CSV
        rows = self.loader()
        
        # Convert rows to Langchain Documents
        documents = []
        for row in rows:
            # Convert entire row to a string for text splitting
            content = "\n".join([f"{key}: {value}" for key, value in row.items()])
            documents.append(Document(page_content=content, metadata=row))

        # Split documents
        text_splitter = CharacterTextSplitter(
            separator="\n",
            chunk_size=chunk_size,
            chunk_overlap=chunk_overlap,
            length_function=len,
            is_separator_regex=False,
        )

        texts = text_splitter.split_documents(documents)
        return texts