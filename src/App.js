import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("/repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      url: "https://github.com/jorgevaladares",
      title: `New Repository${Date.now()}`,
      techs: ["React", "Node.js"],
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id, index) {
    const repositoryIndex = Array.from(repositories);
    const response = await api.delete(`/repositories/${id}`);
    repositoryIndex.splice(index, 1);
    setRepositories(repositoryIndex);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository, index) => (
          <div key={index}>
            <li key={repository.id}>
              {repository.title}
              <button
                type="button"
                onClick={() => handleRemoveRepository(repository.id, index)}
              >
                Remover
              </button>
            </li>
          </div>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
