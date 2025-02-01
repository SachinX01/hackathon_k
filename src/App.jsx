import React from "react";
import { SignIn, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css'
import Homepage from "./components/Homepage";
import Quiz from "./components/Quiz";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
              <SignedIn>
                <Navigate to="/homepage" replace />
              </SignedIn>
            </>
          }
        />
        <Route
          path="/sign-in/*"
          element={<SignIn routing="path" path="/sign-in" />}
        />
        <Route
          path="/homepage"
          element={
            <>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
              <SignedIn>
                <Homepage />
              </SignedIn>
            </>
          }
        />
        <Route
          path="/quiz/:topic"
          element={
            <>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
              <SignedIn>
                <Quiz />
              </SignedIn>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
