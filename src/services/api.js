// src/services/api.js
// Template file showing how to seamlessly connect your React React App to your new backend API

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper to handle tokens
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

// --- AUTHENTICATION ---
export const loginUser = async (email, password) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) throw new Error(await res.text());
  const data = await res.json();
  localStorage.setItem('token', data.token); // Store token locally!
  return data;
};

export const registerUser = async (username, email, password) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password })
  });
  if (!res.ok) throw new Error(await res.text());
  const data = await res.json();
  localStorage.setItem('token', data.token);
  return data;
};

export const logoutUser = () => {
  localStorage.removeItem('token');
};

// --- MEME MANAGEMENT ---
export const saveMeme = async (memeData) => {
  // memeData should be { imageUrl, topText, bottomText }
  const res = await fetch(`${API_URL}/memes`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      ...getAuthHeader()
    },
    body: JSON.stringify(memeData)
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
};

export const fetchMyMemes = async () => {
  const res = await fetch(`${API_URL}/memes`, {
    method: 'GET',
    headers: getAuthHeader()
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
};

export const deleteMeme = async (id) => {
  const res = await fetch(`${API_URL}/memes/${id}`, {
    method: 'DELETE',
    headers: getAuthHeader()
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
};
