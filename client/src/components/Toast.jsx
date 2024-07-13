import { toast } from 'react-toastify';

export const Toast = (message, type) => {
  toast(message, {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: false,
    theme: 'dark',
    type: type,
  });
};
