import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

interface DeleteConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
}

const DeleteModal: React.FC<DeleteConfirmationModalProps> = ({ isOpen, onClose, onDelete }) => {
    return (
        <Modal isOpen={isOpen} onOpenChange={onClose}>
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">Confirmar eliminación</ModalHeader>
                <ModalBody>
                    <p>¿Estás seguro de que quieres eliminar esta habitación?</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                        Cancelar
                    </Button>
                    <Button color="primary" onPress={onDelete}>
                        Eliminar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default DeleteModal;