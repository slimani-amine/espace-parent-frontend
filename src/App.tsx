import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./features/shared_components/AppLayout";
// import ProtectedRoute from "./ui/ProtectedRoute";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Dashboard from "./pages/Dashboard";
import Direct from "./pages/Direct";
import Travail from "./pages/Travail";
import Examens from "./pages/Examens";
import PorteMonnaie from "./pages/PorteMonnaie";
import Profile from "./pages/Profile";
import DashboardSubjects from "./pages/DashboardSubjects";
import DashboardSubject from "./pages/DashboardSubject";
import { useState } from "react";
import { store } from "./store";
import { Provider } from "react-redux";
import ExamenDetails from "./pages/ExamenDetails";
import { ConfigProvider } from "antd";
export default function App() {
  const [childId, setChildId] = useState<string>("");

  return (
    <Provider store={store}>
      <ConfigProvider
        theme={{
          components: {
            Table: { headerBg: "#EBEBF3", borderColor: "#DDDDDD",fontWeightStrong: 600},
          },
          token: {
            colorTextHeading: "#ABABB0",
            fontSize:16,
            fontWeightStrong: 600,
          },
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route
              element={
                // <ProtectedRoute>
                <AppLayout childId={childId} setChildId={setChildId} />
                // </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="dashboard/0" />} />
              {/* <Route path="dashboard" element={<Dashboard />} /> */}
              <Route path="dashboard/:enfantId" element={<Dashboard />} />
              <Route
                path="dashboard/:enfantId/subject"
                element={<DashboardSubjects />}
              />
              <Route
                path="dashboard/:enfantId/subject/:subjectId"
                element={<DashboardSubject />}
              />
              <Route path="direct/" element={<Direct childId={childId} />} />
              <Route
                path="direct/:enfantId"
                element={<Direct childId={childId} />}
              />
              <Route
                path="travail-a-faire"
                element={<Travail childId={childId} />}
              />
              <Route
                path="travail-a-faire/:enfantId"
                element={<Travail childId={childId} />}
              />
              <Route path="examens" element={<Examens childId={childId} />} />
              <Route
                path="examens/:enfantId"
                element={<Examens childId={childId} />}
              />
              <Route
                path="examens/:enfantId/examen/:examId"
                element={<ExamenDetails childId={childId} />}
              />
              <Route path="porte-monnaie" element={<PorteMonnaie />} />
              <Route path="profile" element={<Profile />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </Provider>
  );
}
