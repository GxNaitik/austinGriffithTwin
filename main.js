document.getElementById('send-button').addEventListener('click', async () => {
  const userInput = document.getElementById('user-input').value;
  if (userInput.trim() === '') return;

  const chatBox = document.getElementById('chat-box');
  chatBox.innerHTML += `<p style="text-align:right;"><strong>You:</strong> ${userInput}</p>`;

  try {
    const response = await fetch('https://llama.us.gaianet.network/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama',
        messages: [
          { role: 'system', content: 'Act as a very good AI Twin of Austin Griffith, the founder and CEO of Buidl Guidl. You may answer to the queries of the users which are related to Web3, Buidl Guidl, Dapps, Speedrun Ethereum, Smart Contracts and overall web3 technologies.' },
          { role: 'user', content: `The user asks: ${userInput}. Please analyze and provide a response.` },
        ],
      }),
    });

    const data = await response.json();
    chatBox.innerHTML += `<p><strong>Austin Griffith:</strong> ${data.choices[0].message.content}</p>`;
  } catch (error) {
    chatBox.innerHTML += '<p><strong>Error:</strong> Unable to fetch the response.</p>';
  }

  document.getElementById('user-input').value = '';
});
