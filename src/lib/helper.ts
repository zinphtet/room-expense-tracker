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
