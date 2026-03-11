import { useSelector } from 'react-redux';

export const useAuth = () => {
    const { user, token, isLoading, error } = useSelector((state) => state.auth);

    const isAuthenticated = !!token;

    return {
        user,
        token,
        isLoading,
        error,
        isAuthenticated,
    };
};
