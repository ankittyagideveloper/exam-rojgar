import { useUser, SignIn } from "@clerk/clerk-react";

export default function ProtectedRoute({ children }) {
  const { isSignedIn } = useUser();

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
