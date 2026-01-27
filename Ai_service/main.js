import { GoogleGenAI } from "@google/genai";
import express from "express"
import dotenv from 'dotenv'
dotenv.config()

const app = express()

const ai = new GoogleGenAI({apikey:process.env.GEMINI_API_KEY});

app.use(express.json())
app.post("/api/v1/generate",async(req,res)=>{
    const {prompt} = req.body;
    if(!prompt){
        res.status(400).json({
            message:`Give the prompt first `
        })
        return;
    }
    try {
        const response = await ai.models.generateContent({
        model: "gemini-flash-lite-latest",
        contents: prompt,
        });
        res.json({response:response.text})
        console.log('Api is working ')
    } catch (error) {
        res.status(404).json({message:`Ai req out of limits `})
    }
})
const port = process.env.port;

app.listen(port,()=>{
    console.log(`Ai server is running on http://localhost:${port}`);
    
})


