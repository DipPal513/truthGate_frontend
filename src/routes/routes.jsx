  // Redirect to /login if not authenticated
  if (!isAuthenticated) {
    navigate("/login", { replace: true });
    return null; // Render nothing while navigating
  }

  // Render the protected route if authenticated
  return element || children || null;
};