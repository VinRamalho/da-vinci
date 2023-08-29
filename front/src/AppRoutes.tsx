import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ListRequests } from "./pages/ListRequests";

export const AppRoutes = () => {
  //   const Private = ({ children }) => {
  //     const { authenticad, loading } = useContext(AuthContext);
  //     if (loading) {
  //       return <div className="container">Carregando...</div>;
  //     }
  //     if (!authenticad) {
  //       return <Navigate to="/login" />;
  //     }
  //     return children;
  //   };

  return (
    <Router>
      <Routes>
        <Route path="/list-request" element={<ListRequests />} />
      </Routes>
    </Router>
  );
};
