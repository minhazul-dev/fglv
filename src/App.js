import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import HomePage from './Components/Homepage/HomePage';
import Payment from './Components/Payment/Payment';
import MapWithMarkers from './Components/MapWithMarkers/MapWithMarkers';
import Donate from "./Components/Donate/Donate";
import Admin from "./Components/Admin/Admin";
import MapAdmin from "./Components/Admin/map/MapAdmin";
import ClothesDonation from "./Components/ClothesDonation/ClothesDonation";
import Volunteers from "./Components/Admin/Pages/Volunteers/Volunteer";
import StationeryNgadgets from "./Components/StationeryNgadgets/StationeryNgadgets";
import RegisteredOrg from "./Components/RegisteredOrganizations/RegisteredOrg";
import Registration from "./Components/Registration/RegistrationForm";
import MostFrequentVolunteerArea from "./Components/MostFrequentLocation/MostFrequentLocation";
import Scholarship from "./Components/ScholarshipPrograms/Scholarship";
import Verify from "twilio/lib/rest/Verify";

function App() {
  return (
    <>
      <Router>
        {/* <Header /> */}
        <Routes>
          <Route path="/*" exact element={<HomePage />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/liveDonation" element={<MapWithMarkers />} />
          <Route path="/donation" element={<Donate />} />
          <Route path="/admin_panel" element={<Admin />} />
          <Route path="/mapAdmin" element={<MapAdmin />} />
          <Route path="/clothesDonation" element={<ClothesDonation />} />
          <Route path="/multiCategory" element={<StationeryNgadgets />} />
          <Route path="/adminVolunteer" element={<Volunteers />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/registeredOrg" element={<RegisteredOrg />} />
          <Route path="/mostFrequentDonationArea" element={<MostFrequentVolunteerArea />} />
          <Route path="/scholarship" element={<Scholarship />} />
          <Route path="/verification" element={<Verify />} />

        </Routes>


      </Router >
    </>
  );
}

export default App;
