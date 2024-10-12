import { ComponentType, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { Navigate } from "react-router-dom";
import { useAccount } from "wagmi";
import { logout } from "../store/authSlice";

// HOC that checks if user is authenticated, redirects if not
function withAuthRedirect<T extends JSX.IntrinsicAttributes>(
  WrappedComponent: ComponentType<T>
) {
  const ComponentWithAuthRedirect = (props: T) => {
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector(
      (state) => state.auth.isAuthenticated
    );

    const { isConnected, isConnecting } = useAccount();

    useEffect(() => {
      if (!isConnected && !isConnecting && isAuthenticated) {
        dispatch(logout());
      }
    }, [dispatch, isAuthenticated, isConnected, isConnecting]);

    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuthRedirect;
}

export default withAuthRedirect;
