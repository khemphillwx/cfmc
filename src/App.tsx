import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Join from "./pages/Join";
import Staff from "./pages/Staff";
import Story from "./pages/Story";
import Beliefs from "./pages/Beliefs";
import SundaySchool from "./pages/SundaySchool";
import Groups from "./pages/Groups";
import Missions from "./pages/Missions";
import Kids from "./pages/Kids";
import Students from "./pages/Students";
import Glow from "./pages/Glow";
import Give from "./pages/Give";
import Weddings from "./pages/Weddings";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="join" element={<Join />} />
          <Route path="about/staff" element={<Staff />} />
          <Route path="about/our-story" element={<Story />} />
          <Route path="about/what-we-believe" element={<Beliefs />} />
          <Route path="ministries/kids" element={<Kids />} />
          <Route path="ministries/students" element={<Students />} />
          <Route path="ministries/sunday-school" element={<SundaySchool />} />
          <Route path="ministries/groups-studies" element={<Groups />} />
          <Route path="ministries/missions-outreach" element={<Missions />} />
          <Route path="glow" element={<Glow />} />
          <Route path="give" element={<Give />} />
          <Route path="weddings" element={<Weddings />} />
          <Route path="privacy-policy" element={<Privacy />} />
          <Route path="terms-of-service" element={<Terms />} />
          {/* Fallback for other routes */}
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
