import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Skills from "./pages/Skills";
import About from "./pages/About";
import Projects from "./pages/Projects";
import NotFound from "./pages/NotFound";
import Signup from "./components/signup";
import Login from "./components/login";
import AIChat from "./components/AIChat";




const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Route>

          {/* Catch All */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        {/* AI CHATBOT */}
        <AIChat />
      </BrowserRouter>

    </TooltipProvider>
  </QueryClientProvider>
);

export default App;