import { useUser, SignIn } from "@clerk/clerk-react";
import { Navigate } from "react-router";

export default function ProtectedRoute({ children }) {
  const { isSignedIn, user } = useUser();

  // If user is not logged in → Show Clerk's SignIn form
  if (!isSignedIn) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
      >
        <SignIn routing="hash" signUpUrl="/sign-up" />
      </div>
    );
  }

  // If user is logged in → Show protected content
  return children;
}

export function AdminRoute({ children }) {
  const { isSignedIn, user } = useUser();
  const isAdmin = user?.publicMetadata?.role === "admin";

  if (!user || !isAdmin) {
    // Check if logged in AND is admin
    return <Navigate to="/home" replace />;
  }
  return children;
}
