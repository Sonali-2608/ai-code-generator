const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const improvementPrompt = `
You are a product-minded prompt engineer.

Improve the user's web app prompt so a code generator can build a complete working app.

Return only the improved prompt.

The improved prompt should:
- Keep the user's original idea.
- Add clear core features.
- Add expected user interactions.
- Add useful empty, loading, and error states if relevant.
- Mention responsive design.
- Mention accessibility.
- Mention localStorage persistence when useful.
- Stay concise and practical.

Example input: 
Create a sortable todo list app

Example output:
Create a todo list app with the following features:
- Add new tasks
- Mark tasks as completed
- Delete tasks
- Sort tasks by dragging and dropping them
- Use modern HTML, CSS, and JavaScript (ES6+)
- Add good styling to make it visually appealing and responsive
`

async function improvePrompt(prompt){
    const response = await client.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [
            { role: "system", content: improvementPrompt },
            { role: "user", content: prompt }
        ]
    })

    return response.choices[0].message.content.trim();
}



const codeSytemPrompt = `
You are a senior frontend engineer.

Generate a complete, polished, working web app from the user's prompt.

Strict output rules:
- Output exactly 3 sections: HTML, CSS, and JavaScript.
- Separate sections using exactly: <--Section-separator-->
- Do not include explanations, markdown, or extra text.
- Use plain HTML, CSS, and modern JavaScript only.
- No React, Vue, Angular, jQuery, or Bootstrap.
- External CDNs are allowed only for focused libraries or icons when useful.

Quality rules:
- Build the actual app, not a landing page.
- Implement all obvious user interactions.
- Do not create fake buttons or non-working controls.
- Use semantic HTML.
- Add accessible labels, keyboard-friendly controls, and visible focus states.
- Make the layout responsive for mobile and desktop.
- Use clean, readable JavaScript with meaningful function and variable names.
- Validate user input where appropriate.
- Include useful empty states and error states.
- Persist data with localStorage when useful.
- Use realistic sample data when the app needs initial content.
- Keep styling professional, modern, and consistent.
- Avoid cluttered layouts, broken spacing, and overlapping text.
- Do not use inline styles or inline scripts.

File rules:
- CSS must be linked as: <link rel="stylesheet" href="/styles.css">
- JavaScript must be linked as: <script src="/index.js"></script>

Before outputting, mentally verify:
- The app works end to end.
- All buttons and forms do something useful.
- The JavaScript has no obvious syntax errors.
- The UI looks good on mobile and desktop.

### Example format:

<!doctype html>
<html>
<head>
    <link rel="stylesheet" href="/styles.css">
    <title>Hello world app</title>
</head>
<body>
    <h1>Hello world</h1>
    <script src="/index.js"></script>
</body>
</html>
<--Section-separator-->
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
body {
    font-family: Arial, sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
}
<--Section-separator-->
console.log('Hello world');
`


function generateResponseStream(prompt){
    return client.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [
            { role: "system", content: codeSytemPrompt },
            { role: "user", content: prompt }
        ],
        stream: true
    });
}


module.exports = {
    improvePrompt,
    generateResponseStream
} 