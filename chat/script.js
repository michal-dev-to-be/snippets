// https://console.groq.com/docs/quickstart
const GROQ_API_KEY = '<WEZ_KLUCZ_DO_API_GROQ_AI_Z_PLARFORMY_Z_LINKU_WYZEJ>';

const USER_AVATAR_URL = 'https://cdn-icons-png.flaticon.com/512/168/168726.png';
const ASSISTANT_AVATAR_URL =
  'https://icons.iconarchive.com/icons/iconarchive/robot-avatar/256/Blue-2-Robot-Avatar-icon.png';
const chatMessageList = document.querySelector('ul');
const loader = document.querySelector('#loader');

const messages = [
  {
    role: 'system',
    content:
      'You are a chat bot. You answer only shortly. Maximum 2 sentences but concentrte only on the question related stuff. Do not comment to much. It is likely that conversation will be in polish language. Respond  in only using the language used in the prompt. Use words you are sure are correct.',
  },
];

let isLoading = false;

const addAssistantMessage = (message) => {
  messages.push({
    role: 'assistant',
    content: message,
  });
};

const addUserMessage = (message) => {
  messages.push({
    role: 'user',
    content: message,
  });
};

const setLoading = (loading) => {
  isLoading = loading;

  if (isLoading) {
    loader.classList.remove('is-hidden');
  } else {
    loader.classList.add('is-hidden');
  }
};

const removeLoader = () => {
  const activeLodaer = document.querySelector('.loader');

  if (activeLodaer) {
    activeLodaer.parentNode.removeChild(activeLodaer);
  }
};

const renderMessage = (message, role) => {
  const avatarUrl = role === 'user' ? USER_AVATAR_URL : ASSISTANT_AVATAR_URL;

  return `
    <li class="is-flex is-align-items-center chat-message">
                <figure class="avatar image is-48x48">
                  <img class="is-rounded has-background-white p-1" src=${avatarUrl} />
                </figure>
                <p class="has-text-white ml-4">${message}</p>
      </li>
  `;
};

const handleFormSubmit = async (e) => {
  e.preventDefault();

  const initialAIMessage = document.querySelector('#initial-ai-message');
  const userInput = document.querySelector('input');
  const userMessage = userInput.value;

  if (initialAIMessage) {
    chatMessageList.removeChild(initialAIMessage);
  }

  if (!userMessage || isLoading) return;

  addUserMessage(userMessage);

  userInput.value = '';

  chatMessageList.insertAdjacentHTML(
    'beforeend',
    renderMessage(userMessage, 'user')
  );

  setLoading(true);

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

  addAssistantMessage(aiResponse);

  chatMessageList.insertAdjacentHTML(
    'beforeend',
    renderMessage(aiResponse, 'assistant')
  );

  chatMessageList.scrollIntoView({ block: 'end' });

  setLoading(false);
};

document
  .querySelector('#ai-chat-form')
  .addEventListener('submit', handleFormSubmit);
