import React from 'react';
import OfertsBook from './oferts';
import SpecialOferts from './specialOferts';
import RenderCards from './renderCards';

const Oferts = () => {
  return (
    <div>
      <OfertsBook />
      <SpecialOferts />
      {/* <RenderCards /> */}
    </div>
  );
};

export default Oferts;
