import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

export function SelectAdulst() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Adultos" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Personas</SelectLabel>
          <SelectItem value="one">1</SelectItem>
          <SelectItem value="second">2</SelectItem>
          <SelectItem value="three">3</SelectItem>
          <SelectItem value="four">4</SelectItem>
          <SelectItem value="five">5</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
