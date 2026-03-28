// src/components/TemplateSelector.jsx
import { useState } from 'react';
import { memeTemplates, categories } from '../data/templates';

export default function TemplateSelector({ onSelectTemplate, selectedTemplateId }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredTemplates = memeTemplates.filter((template) => {
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="template-selector">
      <h3 className="section-title">Choose a Template</h3>
      
      <div className="filters">
        <input 
          type="text" 
          placeholder="Search templates..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        
        <div className="categories">
          {categories.map(category => (
            <button
              key={category}
              className={`category-chip ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="template-grid">
        {filteredTemplates.map(template => (
          <div 
            key={template.id}
            className={`template-item ${selectedTemplateId === template.id ? 'selected' : ''}`}
            onClick={() => onSelectTemplate(template)}
            title={template.name}
          >
            <img src={template.url} alt={template.name} loading="lazy" />
          </div>
        ))}
        {filteredTemplates.length === 0 && (
          <p className="no-results">No templates found.</p>
        )}
      </div>
    </div>
  );
}
