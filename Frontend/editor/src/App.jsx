import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { marked } from "marked";
import "./App.css";
import Editor from "./Components/Editor";

const socket = io("http://localhost:3001", {
  transports: ["websocket"],
});

const App = () => {
  const [markdown, setMarkdown] = useState("");
  const [html, setHtml] = useState("");

  useEffect(() => {
    socket.on("html", (htmlContent) => {
      setHtml(htmlContent);
    });

    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  const handleMarkdownChange = (newMarkdown) => {
    setMarkdown(newMarkdown);
    socket.emit("markdown", newMarkdown);
  };

  const renderMarkdown = (markdown) => {
    return marked(markdown);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Markdown Editor</h1>
      </header>
      <main>
        <div className="editor-container">
          <Editor
            value={markdown}
            onChange={handleMarkdownChange}
            placeholder="Input Markdown Here..."
            // style={{ height:'100%' , width:'100%'}}
          />
          <div className="preview">
            {/* <h2>Preview</h2> */}
            <div class="app_card">
              <div class="app_tools">
                <div class="app_circle">
                  <span class="red app_box"></span>
                </div>
                <div class="circle">
                  <span class="yellow app_box"></span>
                </div>
                <div class="circle">
                  <span class="green app_box"></span>
                </div>
              </div>
              <div class="card__content">
                {" "}
                <div
                  className="preview-content"
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(markdown) }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
