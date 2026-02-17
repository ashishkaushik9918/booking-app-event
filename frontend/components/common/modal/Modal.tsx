import { Modal } from 'antd';
import React from 'react';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { on } from 'events';
interface AlertDialogProps {
    title?: string;
    content?: string;
    visible: boolean;
    onClose: () => void;
    children?: React.ReactNode;
    okButtonText?: string;
    closeButtonText?: string;
    okButtonColor?: string;
    closeButtonColor?: string;
}

const AlertDialog: React.FC<AlertDialogProps> = ({ title = 'Confirmation', content = 'Are you sure you want to continue?', visible, onClose, children,
    okButtonText = 'Confirm', closeButtonText = 'Cancel', okButtonColor = '#008000', closeButtonColor
}) => {
    return (
        <>
            {visible && (
                <Modal
                    centered
                    title={<span><ExclamationCircleFilled style={{ color: '#faad14', marginRight: 8 }} />{title}</span>}
                    open={visible}
                    onOk={onClose}
                    onCancel={onClose}
                    okText={okButtonText}
                    cancelText={closeButtonText}
                    okType="primary"
                    okButtonProps={{
                        style: { backgroundColor: okButtonColor, borderColor: okButtonColor }
                    }}
                    cancelButtonProps={{
                        danger:closeButtonColor ? false: true,
                    
                    }}
                >
                    {content ?? children}
                </Modal>
            )}
        </>
    );
}

export default Modal;