import pickle
from fastapi import FastAPI
from pydantic import BaseModel

class InputData(BaseModel):
	message: str

app = FastAPI()

with open("SVM_model.pkl", "rb") as f:
	model = pickle.load(f)

@app.post("/predict")
def predict(data: InputData):
	message = [data.message]
	prediction = model.predict(message)
	return {"message":"success" , "answer":prediction[0]}

