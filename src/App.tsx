import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter, Routes, Route } from "react-router";
import { Layout } from "@Layouts/Layout";
import { Home } from "@Pages/Home/Home";
import { Portfolio } from "@Pages/Portfolio";
import { Resume } from "@Pages/Resume";

export function App() {
  return (
    <ErrorBoundary fallback={<p>⚠️Something went wrong</p>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="resume" element={<Resume />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
