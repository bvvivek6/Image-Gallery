import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import ImageGallery from "./components/ImageGallery";
import ImageDetails from "./components/ImageDetails";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ImageGallery />} />
          <Route path="/:id" element={<ImageDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
