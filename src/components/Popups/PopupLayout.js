import React from 'react'
import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { closePopup } from '@/redux/features/applicationSlice';
import LoginPopup from './LoginPopup';
import BookingConfirmationPopup from './BookingConfirmationPopup';
import PnrEnquiryPopup from './PnrEnquiryPopup';
import { StytchLogin } from '@stytch/nextjs';
import "@/styles/popup.css"
import { Close } from '@mui/icons-material';

const PopupLayout = () => {
  const { showPopup, popupType, popupSize } = useSelector((state) => state.application);
  const dispacth = useDispatch();

  const sizeStyles = {
    xs: { width: '300px' },
    sm: { width: '500px' },
    md: { width: '700px' },
    lg: { width: '900px' },
    full: { width: '100%' },
  };

  const onClose = () => {
    dispacth(closePopup());
  };

  return (
    popupType === "loginPopup" && showPopup ?
      <div className='popup-container'>
        <div className='popup-container-inner'>

          <StytchLogin config={{
            products: ['oauth', 'emailMagicLinks'],
            oauthOptions: {
              providers: [{
                type: 'google',
                one_tap: false
              }],
            },
            emailMagicLinksOptions: {
              loginRedirectURL: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
              loginExpirationMinutes: 30,
              signupRedirectURL: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
              signupExpirationMinutes: 30,
              createUserAsPending: true,
            },
          }}
            styles={{
              colors: { primary: '#0577CA' },
              fontFamily: '"DM-Sans", sans-serif',
            }}
          />
          <div className='close-icon'>
            <Close onClick={onClose} />
          </div>
        </div>
      </div>
      : <Modal
        open={showPopup}
        onCancel={onClose}
        footer={null}
        centered
        width={sizeStyles[popupSize].width}
      >
        {
          popupType === "loginPopup" && <LoginPopup />
        }
        {
          popupType === "bookingConfirmationPopup" && <BookingConfirmationPopup />
        }
        {
          popupType === "pnrEnquiryPopup" && <PnrEnquiryPopup />
        }
      </Modal>
  );
};

export default PopupLayout
