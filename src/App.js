import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    async function loadRepositories() {
      const response = await api.get('repositories')

      setRepositories(response.data)
    }

    loadRepositories()

  }, [])

  async function handleAddRepository() {

    const data = {
      url: 'http://github.com',
      title: 'Github Testes',
      techs: ['Node.js, jest']
    }

    const response = await api.post('repositories', data)

    setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
    
    const repository = repositories.filter(repository => repository.id !== id)
    setRepositories(repository)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
