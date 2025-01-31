import React from "react";
import { SignIn, SignUp, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import './App.css'

const App = () => {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Welcome to My Clerk App</h1>

      {/* Show SignIn or SignUp when signed out */}
      <SignedOut>
        <SignIn />
      </SignedOut>

      {/* Show user info when signed in */}
      <SignedIn>
        <h2>You are signed in!</h2>
        <UserButton />
      </SignedIn>
    </div>
  );
};

export default App;
