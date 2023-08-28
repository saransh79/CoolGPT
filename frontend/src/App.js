import { Routes, Route } from 'react-router-dom';
import { useMemo } from 'react';
import {  ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './theme';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import Register from './pages/Register';
import Login from './pages/Login';
import Summary from './pages/Summary';
import { Toaster } from 'react-hot-toast';
import Paragraph from './pages/Paragraph';
import ChatBot from './pages/ChatBot';
import JsConverter from './pages/JsConverter';
import ScifiImage from './pages/ScifiImage';
import Corrector from './pages/Corrector'

function App() {
  const theme = useMemo(() => createTheme(themeSettings(), []), []);
  return (
    <>
      <ThemeProvider theme={theme}>
        <Navbar />
        <Toaster/>
        <Routes>
          <Route path='/' exact element={<Homepage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/summary' element={<Summary />} />
          <Route path="/paragraph" element={<Paragraph />} />
          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="/js-converter" element={<JsConverter />} />
          <Route path="/scifi-image" element={<ScifiImage />} />
          <Route path="/text-corrector" element={<Corrector />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
