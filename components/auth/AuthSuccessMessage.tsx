
interface AuthSuccessMessageProps {
  message?: string;
}

const AuthSuccessMessage = ({ message }: AuthSuccessMessageProps) => {
  if (!message) return null;

  return <div>{message}</div>;
};

export default AuthSuccessMessage;
