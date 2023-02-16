import React from "react";
import { Route, Routes } from "react-router-dom";
import EditMusicRecord from "../pages/EditMusicRecord";
import Login from "../pages/Login";
import MusicRecords from "../pages/MusicRecords";
import SingleMusicRecord from "../pages/SingleMusicRecord";
import ProtectedRoute from "../PrivateRoute/ProtectedRoute";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MusicRecords />
            </ProtectedRoute>
          }
        />
        <Route
          path="/music/:id"
          element={
            <ProtectedRoute>
              <SingleMusicRecord />
            </ProtectedRoute>
          }
        />
        <Route
          path="/music/:id/edit"
          element={
            <ProtectedRoute>
              <EditMusicRecord />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<h3>Page Not Found</h3>} />
      </Routes>
    </div>
  );
};

export default AllRoutes;







