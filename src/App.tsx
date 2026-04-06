import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Story from './pages/Story';
import Generals from './pages/Generals';
import Cards from './pages/Cards';
import Rules from './pages/Rules';
import GameSupport from './pages/GameSupport';
import ARScanner from './pages/ARScanner';
import Map from './pages/Map';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="story" element={<Story />} />
          <Route path="generals" element={<Generals />} />
          <Route path="cards" element={<Cards />} />
          <Route path="rules" element={<Rules />} />
          <Route path="game-support" element={<GameSupport />} />
          <Route path="ar-scanner" element={<ARScanner />} />
          <Route path="map" element={<Map />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


