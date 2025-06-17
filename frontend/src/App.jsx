import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import CreatePage from "./pages/CreatePage.jsx";
import NoteDetailPage from "./pages/NoteDetailPage.jsx";

const App = () => {
  return (
    <div className="relative min-h-screen w-full" data-theme="forest">
      <div className="relative z-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/note/:id" element={<NoteDetailPage />} />
        </Routes>
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-4 text-center text-sm text-base-content/60">
        <p>ThinkBoard © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default App;
