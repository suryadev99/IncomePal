import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix = "";
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.usrinput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.usrinput}`,
    temperature: 0.5,
    max_tokens: 250,
  });

  const basePromptOutput = baseCompletion.data.choices.pop();

  // I build Prompt #2.
  const secondPrompt =
  `
  ${basePromptOutput.text}
  Suggest an Investment strategy , investment portfolio and list best stocks to invest in that country based on the Salary breakdown and my Taxes . Explain why.
  `

  // I call the OpenAI API a second time with Prompt #2
  const secondPromptCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${secondPrompt}`,
    // I set a higher temperature for this one. Up to you!
    temperature: 0.5,
		// I also increase max_tokens.
    max_tokens: 750,
  });

    // Get the output
  const secondPromptOutput = secondPromptCompletion.data.choices.pop();
  delete Object.assign(secondPromptOutput, {["text2"]:secondPromptOutput["text"]})["text"]
  const obj = Object.assign(basePromptOutput, secondPromptOutput)
  console.log(obj)

  res.status(200).json({ output:  obj });
};

export default generateAction;