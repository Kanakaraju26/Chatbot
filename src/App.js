import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import logo from './ChatGPT_Clone_assets/assets/chatgpt.svg';
import addbtn from './ChatGPT_Clone_assets/assets/add-30.png';
// import query from './ChatGPT_Clone_assets/assets/message.svg';
import Home from './ChatGPT_Clone_assets/assets/home.svg';
import saved from './ChatGPT_Clone_assets/assets/bookmark.svg';
import advance from './ChatGPT_Clone_assets/assets/rocket.svg';
import sendbutton from './ChatGPT_Clone_assets/assets/send.svg';
import usericon from './ChatGPT_Clone_assets/assets/user-icon.png';
import gptlogo from './ChatGPT_Clone_assets/assets/chatgptLogo.svg';
import savebefore from './ChatGPT_Clone_assets/assets/savebefore.png';
import { Sendmessage } from './chatbot';

function App() {
  const msgend = useRef(null);
  const [input, setinput] = useState('');
  const [messages, setmessages] = useState([{
    text: 'ChatBot, powered by advanced AI, revolutionizes human-computer interaction by delivering natural, context-aware responses, making it an indispensable tool for businesses and individuals alike. Its versatility in applications, from customer service to creative writing, underscores its transformative impact on how we engage with technology.',
    isbot: true,
  }]);
  const [save, setsave] = useState(false);

  const handlesent = async () => {
    const text = input;
    setinput('');
    setmessages(prevMessages => [
      ...prevMessages,
      { text, isbot: false }
    ]);
    
    const res = await Sendmessage(text);
    let botResponse = '';

    if (typeof res === 'object' && res.error) {
      botResponse = 'An error occurred: ' + res.error;
    } else {
      botResponse = res;
    }

    setmessages(prevMessages => [
      ...prevMessages,
      { text: botResponse, isbot: true }
    ]);
  };

  useEffect(() => {
    msgend.current.scrollIntoView();
  }, [messages]);

  const handleEnter = async (e) => {
    if (e.key === 'Enter')
      await handlesent();
  };

  const saveMessagesToLocalStorage = () => {
    localStorage.setItem('savedMessages', JSON.stringify(messages));
  };

  useEffect(() => {
    setsave(false);
  }, [input]);

  const handlesave = () => {
    setsave(true);
    saveMessagesToLocalStorage();
  };

  const getMessagefromLocalStorage = () => {
    const savedMessages = JSON.parse(localStorage.getItem('savedMessages')) || [];
    setmessages(savedMessages);
  };

  return (
    <div className="App">
      <div className='sidebar'>
        <div className='upperSide'>
          <div className='upperside-top'>
            <img src={logo} alt='companyLogo' className='logo' />
            <span className='brand'>ChatBot</span>
          </div>
          <button className='midbtn' onClick={() => { window.location.reload() }}>
            <img src={addbtn} alt='NewChat' className='addbtn' />New Chat
          </button>
          <div className='uppersidebottom'>
            {/* <button className='query'>
              <img src={query} alt='NewChat' className='' />what is programming ?
            </button>
            <button className='query'>
              <img src={query} alt='NewChat' className='' />what is Covid-19 ?
            </button> */}
          </div>
        </div>
        <div className='lowerSide'>
          <div className='listitems'>
            <img src={Home} alt='Home' className='listitemsimg' />
            <a target='_blank' href='https://kanakaportfolio.netlify.app' rel="noreferrer" className='listitema'>Home</a>
          </div>
          <div className='listitems'>
            <img src={saved} alt='saved' className='listitemsimg' />
            <span className='listitema' onClick={getMessagefromLocalStorage}>Saved</span>
          </div>
          <div className='listitems'>
            <img src={advance} alt='Upgrade' className='listitemsimg' />
            <a target='_blank' href='https://kanakaportfolio.netlify.app/static/media/Kanakaraju%20Ponnda.f868eab490ae61b100d9.pdf' rel="noreferrer" className='listitema'>Hire me </a>
          </div>
        </div>
      </div>
      <div className='main'>
        <div className='chats'>
          {messages.map((message, i) => (
            <div className={message.isbot ? "chat bot" : "chat"} key={i}>
              <img src={message.isbot ? gptlogo : usericon} alt={message.isbot ? "gptlogo" : "usericon"} className='chaticon' />
              <pre className='txt'>{message.text}</pre>
            </div>
          ))}
          <div ref={msgend} />
        </div>
        <div className='chat-footer'>
          <div className='input-chat'>
            <input
              type='text'
              id='chat-input'
              placeholder='Send a Message'
              value={input}
              onKeyDown={handleEnter}
              onChange={e => setinput(e.target.value)}
            />
            <button className='send' onClick={handlesent}>
              <img src={sendbutton} className='send-btn' alt='sendbutton' />
            </button>
            <button className='send' onClick={handlesave}>
              <img src={save ? saved : savebefore} className='send-btn' alt='Savebutton' />
            </button>
          </div>
          <p>ChatBot may produce inaccurate information about people, places, or facts</p>
        </div>
      </div>
    </div>
  );
}

export default App;
