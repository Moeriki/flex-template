import React, { useState } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import logo from './logo.svg';
import { HomePage } from './pages/home';
import { AboutPage } from './pages/about';

import './app.css';

export function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} className="app-logo" alt="logo" />
        <ul>
          <li>
            <Link className="app-link" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="app-link" to="/about">
              About
            </Link>
          </li>
        </ul>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/about" exact>
            <AboutPage />
          </Route>
        </Switch>
        <p>
          <button onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          <a
            className="app-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  );
}
