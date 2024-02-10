import { Button } from '@/components/ui/button';
import { HomeMove, User } from 'tabler-icons-react';
import { ArrowNarrowRight } from 'tabler-icons-react';

const SelectRoom = () => {
  return (
    <div className=" mx-auto max-w-5xl columns-4 bg-blue-900 p-4 rounded-full">
      <div className="border-r-2 mx-2">
        <h1>Selecciona tu habitacion</h1>
      </div>

      <div className="flex flex-row items-center justify-center border-r-2 mx-2">
        <HomeMove size={48} strokeWidth={2} color={'black'} />
        <h1 className="mx-2">Mudarce</h1>
        <ArrowNarrowRight size={48} strokeWidth={2} color={'black'} />
        <h1 className="mx-2">Mudarece</h1>
      </div>

      <div className="flex flex-row items-center justify-center mx-2">
        <User size={30} strokeWidth={2} color={'black'} className="mr-1" />
        <h1 className="mr-1">persona</h1>
        <div className="mx-1">+</div>
        <div className="mx-1">
          <h1>1</h1>
        </div>
        <div className="mx-1">
          <h1>-</h1>
        </div>
      </div>
      <Button type="submit" className="bg-blue-600">
        Buscar
      </Button>
    </div>
  );
};

export default SelectRoom;
