import React, { useState, useEffect } from 'react';
import InputText from '../InputText/InputText';
import Message from '../Message/Message';

var core = new window.Landbot.Core({
  firebase: window.firebase,
  brandID: 12235,
  channelToken: 'H-441480-B0Q96FP58V53BJ2J',
  welcomeUrl: 'https://welcome.landbot.io/',
  welcome: [
    { samurai: -1, type: 'text', message: 'Type something to start a conversation with landbot.' }
  ],
});

export default function Chat() {
  const [messages, setMessages] = useState({});

  useEffect(() => {
    core.pipelines.$readableSequence.subscribe(data => {
      setMessages(messages => ({
        ...messages,
        [data.key]: parseMessage(data),
      }))
    });

    core
      .init()
      .then(data => {
        setMessages(
          parseMessages(data.messages)
        );
      });
  }, []);

  useEffect(() => {
    const container = document.getElementById('landbot-messages-container');
    scrollBottom(container);
  }, [messages]);

  const submit = (value) => {
    if (value !== '') {
      core.sendMessage({ message: value });
    }
  };

  return (
    <>
      <div className="landbot-header">
        <h1 className="subtitle">Landbot</h1>
      </div>

      <div id="landbot-messages-container" className="landbot-messages-container">
        {Object.values(messages)
          .filter(messagesFilter)
          .sort((a, b) => a.timestamp - b.timestamp)
          .map(message => (
            <Message message={message}></Message>
          ))
        }
      </div>
        <InputText onSubmit={submit}></InputText>
    </>
  );
}

function parseMessages(messages) {
  return Object
    .values(messages)
    .reduce((obj, next) => {
      obj[next.key] = parseMessage(next);
      return obj;
    }, {});
}

function parseMessage(data) {
  return {
    key: data.key,
    text: data.title || data.message,
    author: data.samurai !== undefined ? 'bot' : 'user',
    timestamp: data.timestamp,
    type: data.type,
  };
}

function messagesFilter(data) {
  /** Support for basic message types */
  return ['text', 'dialog'].includes(data.type);
}

function scrollBottom(container) {
  if (container) {
    container.scrollTo({
      top: container.scrollHeight,
      behavior: 'smooth',
    });
  }
}