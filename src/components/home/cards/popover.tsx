'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from '@/components/ui/command';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';

const peoples = [
  { label: '1 adult', value: '1' },
  { label: '2 adults', value: '2' },
  { label: '3 adults', value: '3' },
  { label: '4 adults', value: '4' }
];

const FormSchema = z.object({
  peopless: z.union([
    z.literal('1'),
    z.literal('2'),
    z.literal('3'),
    z.literal('4')
  ])
});

export function PopoverForms() {
  const form = useForm({
    resolver: zodResolver(FormSchema)
  });

  async function createForm(formaData: FormData) {
    'use server ';
    const bedrooms = {
      beds: formaData.get('beds')
    };
    console.log('bedrooms', bedrooms);
  }

  return (
    <Form {...form}>
      <form action={createForm}>
        <FormField
          control={form.control}
          name="peopless"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        'w-[200px] justify-between',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value
                        ? peoples.find((people) => people.value === field.value)
                            ?.label
                        : 'Seleccionar adultos'}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search framework..."
                      className="h-9"
                    />
                    <CommandEmpty> Select the number people </CommandEmpty>
                    <CommandGroup>
                      {peoples.map((people) => (
                        <CommandItem
                          value={people.label}
                          key={people.value}
                          onSelect={() => {
                            form.setValue('peopless', people.value);
                          }}
                        >
                          <div
                            onClick={() =>
                              console.log('select value', people.value)
                            }
                          >
                            {people.label}
                          </div>
                          {people.label}
                          <CheckIcon
                            className={cn(
                              'ml-auto h-4 w-4',
                              field && people.value === field.value
                                ? 'opacity-100'
                                : 'opacity-0'
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
