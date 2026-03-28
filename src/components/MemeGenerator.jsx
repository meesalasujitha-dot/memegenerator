// src/components/MemeGenerator.jsx
import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import TemplateSelector from './TemplateSelector';

export default function MemeGenerator() {
  const [image, setImage] = useState(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);
  const [topText, setTopText] = useState('TOP TEXT');
  const [bottomText, setBottomText] = useState('BOTTOM TEXT');
  const memeRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
        setSelectedTemplateId(null); // Clear selected template if user uploads custom image
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectTemplate = (template) => {
    setImage(template.url);
    setSelectedTemplateId(template.id);
  };

  const handleDownload = async () => {
    if (memeRef.current) {
      const canvas = await html2canvas(memeRef.current, { useCORS: true, backgroundColor: null });
      const link = document.createElement('a');
      link.download = 'meme.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  return (
    <div className="meme-generator-wrapper">
      <TemplateSelector 
        onSelectTemplate={handleSelectTemplate} 
        selectedTemplateId={selectedTemplateId} 
      />

      <div className="meme-generator-container">
        <div className="controls">
          <label className="upload-btn">
            Upload Custom Image
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </label>

          <div className="input-divider"><span>OR</span></div>
          
          <div className="input-group">
            <label>Top Text</label>
            <input
              type="text"
              value={topText}
              onChange={(e) => setTopText(e.target.value.toUpperCase())}
              placeholder="Top Text"
            />
          </div>

          <div className="input-group">
            <label>Bottom Text</label>
            <input
              type="text"
              value={bottomText}
              onChange={(e) => setBottomText(e.target.value.toUpperCase())}
              placeholder="Bottom Text"
            />
          </div>

          <button 
            className="download-btn" 
            onClick={handleDownload}
            disabled={!image}
          >
            Download Meme
          </button>
        </div>

        <div className="preview-container">
          {image ? (
            <div className="meme-preview" ref={memeRef}>
              <img src={image} alt="Meme template" className="meme-image" crossorigin="anonymous" />
              <h2 className="meme-text top">{topText}</h2>
              <h2 className="meme-text bottom">{bottomText}</h2>
            </div>
          ) : (
            <div className="placeholder">
              <p>Please upload an image or select a template to start generating your meme.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
