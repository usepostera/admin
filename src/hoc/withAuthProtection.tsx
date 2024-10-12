import { ComponentType } from "react";
import { useAppSelector } from "../store/store";
import { Navigate } from "react-router-dom";

// HOC that checks if user is authenticated, redirects to dashboard if logged in
function withAuthProtection<T extends JSX.IntrinsicAttributes>(
  WrappedComponent: ComponentType<T>
) {
  const ComponentWithAuthProtection = (props: T) => {
    const isAuthenticated = useAppSelector(
      (state) => state.auth.isAuthenticated
    );

    if (isAuthenticated) {
      return <Navigate to="/" />;
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuthProtection;
}

export default withAuthProtection;
