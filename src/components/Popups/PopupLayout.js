import React from 'react'
import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { closePopup } from '@/redux/features/applicationSlice';
import LoginPopup from './LoginPopup';

const PopupLayout = () => {
    const {showPopup, popupType, popupSize} = useSelector((state) => state.application);
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
      <Modal
        open={showPopup}
        onCancel={onClose}
        footer={null}
        centered
        width={sizeStyles[popupSize].width}
      >
        {
            popupType === "loginPopup" && <LoginPopup/>
        }
      </Modal>
    );
  };

export default PopupLayout
