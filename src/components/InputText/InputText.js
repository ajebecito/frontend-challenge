import React, { useState } from "react";

export default function InputText(props) {
  const [input, setInput] = useState("");

  const submit = () => {
    if (input !== "") {
      props.onSubmit(input);
      setInput("");
    }
  };

  return (
    <div className="landbot-input-container">
      <div className="field">
        <div className="control">
          <input
            className="landbot-input"
            type="text"
            placeholder="Type here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                submit();
              }
            }}
          />
          <button
            className="button landbot-input-send"
            disabled={input === ""}
            onClick={submit}
          >
            <span className="icon is-large">
              <i className="fas fa-paper-plane fa-lg"></i>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
