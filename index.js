
const express = require("express");
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);

app.use(express.json());
app.use(bodyParser.json())
app.use(cors());

app.post("/", async(req, res) => {

  const { message } = req.body;


  const response = await openai.createCompletion({
     model:  "text-davinci-003",
    prompt: `${message}.`,
    max_tokens: 100,
    temperature: 0.5,
  });

  res.json({
    message: response.data.choices[0].text,
  })
})




const port = process.env.PORT;

app.listen(port, () => console.log(`Server listening on port ${port}`));







