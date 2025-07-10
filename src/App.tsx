import { useState } from 'react'
import './App.css'

function App() {
  const [prompt, setPrompt] = useState("")
  const [suggestions, setSuggestions] = useState([])

  const fetchSuggestions = async () => {
    const res = await fetch('https://suggestion-backend-visa.onrender.com/suggest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt })
    })

    const data = await res.json()
    setSuggestions(data.matches)

    console.log("Suggestion button clicked:"+ prompt);
  }

  return (
    <div className="container">
      <h1>UI Suggestion Tool</h1>
      <textarea
        placeholder="Describe your UI (e.g., 'submit button')"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={4}
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
      />
      <button onClick={fetchSuggestions}>Get Suggestions</button>

      <div style={{ marginTop: '2rem' }}>
        {suggestions.map((s:any, i) => (
          <div key={i} style={{ marginBottom: '2rem' }}>
            <h3>React:</h3>
            <pre>{s.react}</pre>
            <h3>Angular:</h3>
            <pre>{s.angular}</pre>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
