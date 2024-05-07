import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

interface DeleteConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const DeleteModal: React.FC<DeleteConfirmationModalProps> = ({ isOpen, onClose, onConfirm }) => {
    return (
        <Modal isOpen={isOpen}>
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">Confirmar eliminación</ModalHeader>
                <ModalBody>
                    <p>¿Estás seguro de que quieres eliminar esta habitación?</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" variant="light" onClick={onClose} >
                        Cancelar
                    </Button>
                    <Button color="danger" onClick={onConfirm} >
                        Eliminar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default DeleteModal;