// src/App.jsx
import MemeGenerator from './components/MemeGenerator';

function App() {
  return (
    <div className="app-container">
      <header className="header">
        <div className="title-container">
          <span className="logo-icon">✨</span>
          <h1>Meme Generator</h1>
        </div>
        <p>The simplest way to create and download beautiful memes.</p>
      </header>
      
      <main>
        <MemeGenerator />
      </main>
    </div>
  );
}

export default App;
