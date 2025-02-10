from fastapi import FastAPI
from transformers import pipeline

app = FastAPI()

# this will load the AI model
summarizer = pipeline("summarization", mode="facebook/bart-large-cnn")

@app.post("/summarize")
async def summarize_text(data: dict):
    text = data["content"]
    summary = summarizer(text, max_length=150, min_length=50, do_sample=False)
    return {"summary": summary[0]["summary_text"]}

# run the server: uvicorn server:app --host