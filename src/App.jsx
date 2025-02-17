import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import AddEmployee from './pages/AddEmployee';
import Branch from './pages/Branch';
import Attendance from './pages/Attendance';
import TimeTracker from './pages/TimeTracker';
import DashboardLyout from './pages/DashboardLyout';
import MainContent from './componets/MainContent';
import Users from './componets/Users';
import DailyActivity from './componets/DailyActivity';
import UserManagement from './componets/UserManagement';
import EmployeePayroll from './pages/EmployeePayroll';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard/*" element={<DashboardLyout />}>
          <Route index element={<MainContent />} />
          <Route path="employee" element={<AddEmployee />} />
          <Route path="branch" element={<Branch />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="users" element={<Users />} />
          <Route path="time-tracker" element={<TimeTracker />} />
          <Route path="activity" element={<DailyActivity />} />
          <Route path="smart-groups" element={<UserManagement />} />
          <Route path="emppayroll" element={<EmployeePayroll />} />

        </Route>
      </Routes>
  );
}

export default App;
