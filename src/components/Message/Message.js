import React from 'react';

export default function Message(props) {
  return (
    <article
    key={props.message.key}
    data-author={props.message.author}
    className="media landbot-message"
  >
    <figure className="media-left landbot-message-avatar">
      <p className="image is-64x64">
        <img className="is-rounded" src="http://i.pravatar.cc/100" alt="" />
      </p>
    </figure>
    <div className="media-content landbot-message-content">
      <div className="content">
        <p>{props.message.text}</p>
      </div>
    </div>
  </article>
  );
}
