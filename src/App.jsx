import { 
  createBrowserRouter, 
  createRoutesFromElements, 
  RouterProvider, 
  Route 
} from "react-router-dom";

import RootLayout from "./layout/RootLayout";

// Pages
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import UrlGeneratorPage from "./pages/UrlGeneratorPage";
import HistoryPage from "./pages/HistoryPage";
import ProfilePage from "./pages/ProfilePage";
import OAuthSuccessPage from "./pages/OAuthSuccessPage";

// Guards
import ProtectedRoute from "./components/ProtectedRoute";
import PrivateRoute from "./components/PrivateRoute";

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        
        {/* Public Route */}
        <Route index element={<HomePage />} />
        <Route path="auth" element={<AuthPage />} />
        <Route path="oauth-success" element={<OAuthSuccessPage />} />

        {/* Protected Routes */}
        <Route
          path="generate"
          element={
            <ProtectedRoute>
              <UrlGeneratorPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="history"
          element={
            <PrivateRoute>
              <HistoryPage />
            </PrivateRoute>
          }
        />

        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
