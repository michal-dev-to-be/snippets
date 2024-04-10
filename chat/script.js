const GROQ_API_KEY = '';

const chatMessageList = document.querySelector('ul');

const messages = [
  //   {
  //     role: 'system',
  //     content: 'Rozmawiasz w sposób zwięzły i luźny.',
  //   },
];

document.querySelector('button').addEventListener('click', async () => {
  const userInput = document.querySelector('input');
  const userMessage = userInput.value;

  messages.push({
    role: 'user',
    content: userMessage,
  });

  chatMessageList.insertAdjacentHTML(
    'beforeend',
    `<li class="user-message">${userMessage}</li>`
  );

  const response = await fetch(
    'https://api.groq.com/openai/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + GROQ_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages,
        model: 'mixtral-8x7b-32768',
      }),
    }
  );

  const data = await response.json();

  const aiResponse = data.choices[0].message.content;

  messages.push({
    role: 'assistant',
    content: aiResponse,
  });

  chatMessageList.insertAdjacentHTML(
    'beforeend',
    `<li class="ai-message">${aiResponse}</li>`
  );
});
