import {format} from 'date-fns';

// Email validation function
export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation function
export const validatePassword = (password: string) => {
  return password.length >= 6;
};

export const validateUsername = (username: string) => username.length > 2;

export const log = (input: any, text: string = '') => {
  console.log(`${text}`, JSON.stringify(input, null, 2));
};

export const formatDateOne = (date: string) => {
  return format(new Date(date), 'dd/MM/yyyy');
};

export const formatPrice = (amount: number | string) => {
  if (typeof amount === 'string') {
    amount = parseInt(amount);
  }
  return (
    new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount) + ' MMK'
  );
};
