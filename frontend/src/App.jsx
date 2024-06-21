import WebViewer from '@pdftron/webviewer';
import { useEffect, useRef, useState } from 'react';
import './App.css';
import Generator from './pages/Generator';
import { BrowserRouter, Routes } from 'react-router-dom';

const App = () => {


  return (
    <div>
      <Generator />
    </div>
  );
};

export default App;
