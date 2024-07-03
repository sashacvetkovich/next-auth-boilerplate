export const getPasswordStrength = (password: string) => {
  if (password.length <= 6) {
    return {
      width: 0,
      color: 'red',
    };
  }

  let score = 0;

  // Criteria for password strength
  const hasLowerCase = /[a-z]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  // Increment score based on the criteria
  if (hasLowerCase) score++;
  if (hasUpperCase) score++;
  if (hasNumbers) score++;
  if (hasSpecialChars) score++;

  switch (score) {
    case 1:
      return {
        width: 25,
        color: '#ff4545',
      };
    case 2:
      return {
        width: 50,
        color: '#FF9119',
      };
    case 3:
      return {
        width: 75,
        color: '#0080FF',
      };
    case 4:
      return {
        width: 100,
        color: '#4BB543',
      };
    default:
      return {
        width: 0,
        color: 'red',
      };
  }
};
