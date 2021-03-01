import React, { useState } from 'react';

function HomePage() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Homepage</h1>
      <button onClick={() => setCount((count) => count + 1)}>
        Counter {count}
      </button>
    </>
  );
}

export { HomePage as Page };
