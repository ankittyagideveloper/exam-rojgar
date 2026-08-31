import { useUser, SignIn } from "@clerk/clerk-react";
import { Navigate } from "react-router";

export default function ProtectedRoute({ children, requirePremium = false }) {
  const { isLoaded, isSignedIn, user } = useUser();

  // Wait for Clerk to initialise before making any auth decision
  if (!isLoaded) {
    return null;
  }

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

  // If premium is required, check the user's roles metadata
  if (requirePremium && !user?.publicMetadata?.roles?.includes("premium")) {
    return <Navigate to="/target-series#program" replace />;
  }

  // If user is logged in (and premium when required) → Show protected content
  return children;
}

export function AdminRoute({ children }) {
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.roles?.includes("admin");

  if (!user || !isAdmin) {
    // Check if logged in AND is admin
    return <Navigate to="/home" replace />;
  }
  return children;
}
