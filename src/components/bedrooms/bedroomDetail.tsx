import React from 'react';

interface BedroomDetailProps {
  label: string;
  value: string | number | boolean;
  isPrice?: boolean;
  isStatus?: boolean;
}

const BedroomDetail: React.FC<BedroomDetailProps> = ({
  label,
  value,
  isPrice,
  isStatus
}) => {
  let formattedValue = value;

  if (isPrice) {
    formattedValue = `$${value}`;
  }

  if (isStatus) {
    formattedValue = value ? 'Activa' : 'Inactiva';
  }

  return (
    <p
      className={`text-gray-600 mb-2 ${isStatus ? (value ? 'text-green-600' : 'text-red-600') : ''}`}
    >
      <strong>{label}:</strong> {formattedValue}
    </p>
  );
};

export default BedroomDetail;
