import React from 'react'
import './App.css'
import Header from './components/Header'
import Search from './components/Search'
import Nominees from './components/Nominees'

function App() {
  return (
    <div id="wrapper">
        <Header />
        <main>
          <Search />
          <Nominees />
        </main>
    </div>
  );
}

export default App;
