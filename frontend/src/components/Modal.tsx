import React, { useContext } from 'react';
import '../styles/modal.css';
import { ModalContext } from '../contexts/ModalContext';

const Modal = ({ children }: { children: React.ReactNode }) => {
    const { setOpen } = useContext(ModalContext);

    return (
        <div className="modal" onClick={() => setOpen(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}

export default Modal;
