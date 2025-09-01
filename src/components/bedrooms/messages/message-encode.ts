const phoneNumber = '50586469676';

export const generateWhatsappUrl = (
  typeBedroom: string,
  numberBedroom: number,
  lowSeasonPrice: number
) => {
  const message = `¡Hola! Me gustaría reservar la habitación ${typeBedroom}, número ${numberBedroom}. Su precio es de C$ ${lowSeasonPrice}. ¿Podrían darme más información?`;
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};
