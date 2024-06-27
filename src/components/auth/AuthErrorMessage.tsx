
interface AuthErrorMessageProps {
  message?: string;
}

const AuthErrorMessage = ({ message }: AuthErrorMessageProps) => {
  if (!message) return null;

  return <div>{message}</div>;
};

export default AuthErrorMessage;
