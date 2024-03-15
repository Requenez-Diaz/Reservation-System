'use client';

import React, { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from '@nextui-org/react';
import ModalForm from './forms/forms';

export default function ModalComponent() {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={onOpen}>Reservar</Button>
      <Modal
        placement="top"
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onClose}
        isDismissable={false}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Reserva tu habitacion
          </ModalHeader>
          <ModalBody>
            <ModalForm />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onClick={onClose}>
              Cerrar
            </Button>
            <Button color="success" onClick={onClose}>
              Reservar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
