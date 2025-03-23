import React, { useState } from 'react';
import { MultiSelect } from '@/components/multi-select';
import { Cat, Dog, Fish, Rabbit, Turtle } from 'lucide-react';

const frameworksList = [
  { value: 'react', label: 'React' },
  { value: 'angular', label: 'Angular' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'ember', label: 'Ember' },
];

function SomeFilter() {
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>(['react', 'angular']);

  return (
    <MultiSelect
      options={frameworksList}
      onValueChange={setSelectedFrameworks}
      defaultValue={selectedFrameworks}
      placeholder="Select frameworks"
      variant="inverted"
      animation={0}
      maxCount={2}
    />
  );
}

export default SomeFilter;
