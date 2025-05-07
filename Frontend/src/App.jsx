import { useState, useEffect } from "react"
import Editor from "react-simple-code-editor"
import "prismjs/themes/prism.css"
import prism from "prismjs"
import axios from "axios"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github-dark.css"
import './App.css'


function App() {

  const [code, setCode] = useState('')
  const [review, setReview] = useState('')
axios.defaults.withCredentials=true
  useEffect(() => {
    prism.highlightAll()
  })

  async function reviewCode() {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  try {
    const response = await axios.post(
      `${apiUrl}/ai/get-review`, 
      { code },
      { 
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    setReview(response.data.review);
  } catch (error) {
    console.error('Error:', error);
    setReview('Error getting code review');
  }
  }
  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.js)}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%"
              }}
            />
          </div>
          <div
            onClick={reviewCode}
            className="review">Review</div>
        </div>
        <div className="right">
          <Markdown style>{review}</Markdown></div>
      </main>
    </>
  )
}

export default App
