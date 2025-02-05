import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Todo App</h1>
      <p>Welcome to Zero Voyage Todo App</p>
    </div>
  );
}

export default App;
