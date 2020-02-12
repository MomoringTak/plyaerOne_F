import React from "react";

import { useGoogleAuth } from "../AuthG";

export const LoginBtn = isSignedIn => {
  const { signIn, signOut } = useGoogleAuth();
  return (
    <div>
      {isSignedIn ? (
        <button onClick={signOut}>Sign Out</button>
      ) : (
        <button onClick={signIn}>Sign in with Google</button>
      )}
    </div>
  );
};
