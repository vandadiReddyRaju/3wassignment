// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [name, setName] = useState('');
    const [socialMediaHandle, setSocialMediaHandle] = useState('');
    const [images, setImages] = useState([]);
    const [users, setUsers] = useState([]);

    const handleImageChange = (event) => {
        setImages(event.target.files);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('socialMediaHandle', socialMediaHandle);
        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]);
        }

        await axios.post('https://3wbackend-3yif36fvo-reddy-raju-vandadis-projects.vercel.app/api/users', formData);
        fetchUsers();
        setName('');
        setSocialMediaHandle('');
        setImages([]);
    };

    const fetchUsers = async () => {
      const response = await axios.get('https://3wbackend-3yif36fvo-reddy-raju-vandadis-projects.vercel.app/api/users');

        setUsers(response.data);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
      <div className="App">
      <h1>User Submission Form</h1>
      <form onSubmit={handleSubmit}>
          <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="input-field"
          />
          <input
              type="text"
              placeholder="Social Media Handle"
              value={socialMediaHandle}
              onChange={(e) => setSocialMediaHandle(e.target.value)}
              required
              className="input-field"
          />
          <input
              type="file"
              multiple
              onChange={handleImageChange}
              required
              className="input-file"
          />
          <button type="submit" className="submit-button">Submit</button>
      </form>
  
      <h2>Admin Dashboard</h2>
      <ul>
          {users.map((user) => (
              <li key={user.id}>
                  <h3>{user.name}</h3>
                  <p>{user.socialMediaHandle}</p>
                  <div>
                      {user.images.map((image) => (
                          <img key={image} src={`https://3wbackend-3yif36fvo-reddy-raju-vandadis-projects.vercel.app/uploads/${image}`}
                              alt="" style={{ width: '100px', margin: '5px' }} />
                      ))}
                  </div>
              </li>
          ))}
      </ul>
  </div>
  
    );
}

export default App;
