import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { CheckIcon, ChevronDown, XIcon, ChevronUp } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Separator } from '@/components/separator';
import { Button } from '@/components/button';
import { Badge } from '@/components/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/command';

/**
 * Variants for the multi-select component to handle different styles.
 * Uses class-variance-authority (cva) to define different styles based on "variant" prop.
 */
const multiSelectVariants = cva('m-1 font-bold', {
  variants: {
    variant: {
      default: '',
      secondary: 'border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80',
      destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
      inverted: 'inverted',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

/**
 * Props for MultiSelect component
 */
interface MultiSelectProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof multiSelectVariants> {
  /**
   * An array of option objects to be displayed in the multi-select component.
   * Each option object has a label, value, and an optional icon.
   */
  options: {
    /** The text to display for the option. */
    label: string;
    /** Additional information to display for the option. */
    extra?: string | number;
    /** The unique value associated with the option. */
    value: string;
    /** Optional icon component to display alongside the option. */
    icon?: React.ComponentType<{ className?: string }>;
    /** Marks the option as disabled. */
    disabled?: boolean;
  }[];

  /**
   * Callback function triggered when the selected values change.
   * Receives an array of the new selected values.
   */
  onValueChange: (value: string[]) => void;

  /** The default selected values when the component mounts. */
  defaultValue?: string[];

  /**
   * Placeholder text to be displayed when no values are selected.
   * Optional, defaults to "Select options".
   */
  placeholder?: string;

  /**
   * Animation duration in seconds for the visual effects (e.g., bouncing badges).
   * Optional, defaults to 0 (no animation).
   */
  animation?: number;

  /**
   * Maximum number of items to display. Extra selected items will be summarized.
   * Optional, defaults to 3.
   */
  maxCount?: number;

  /**
   * The modality of the popover. When set to true, interaction with outside elements
   * will be disabled and only popover content will be visible to screen readers.
   * Optional, defaults to false.
   */
  modalPopover?: boolean;

  /**
   * If true, renders the multi-select component as a child of another component.
   * Optional, defaults to false.
   */
  asChild?: boolean;

  /**
   * Additional class names to apply custom styles to the multi-select component.
   * Optional, can be used to add custom styles.
   */
  className?: string;
}

export const MultiSelect = React.forwardRef<HTMLButtonElement, MultiSelectProps>(
  (
    {
      options,
      onValueChange,
      variant,
      defaultValue = [],
      placeholder = 'Select options',
      maxCount = 3,
      modalPopover = false,
      asChild = false,
      className,
      ...props
    },
    ref
  ) => {
    const [selectedValues, setSelectedValues] = React.useState<string[]>(defaultValue);
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

    const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        setIsPopoverOpen(true);
      } else if (event.key === 'Backspace' && !event.currentTarget.value) {
        const newSelectedValues = [...selectedValues];
        newSelectedValues.pop();
        setSelectedValues(newSelectedValues);
        onValueChange(newSelectedValues);
      }
    };

    const toggleOption = (option: string) => {
      const newSelectedValues = selectedValues.includes(option)
        ? selectedValues.filter((value) => value !== option)
        : [...selectedValues, option];
      setSelectedValues(newSelectedValues);
      onValueChange(newSelectedValues);
    };

    const handleClear = () => {
      setSelectedValues([]);
      onValueChange([]);
    };

    const handleTogglePopover = () => {
      setIsPopoverOpen((prev) => !prev);
    };

    const toggleAll = () => {
      if (selectedValues.length === options.length) {
        handleClear();
      } else {
        const allValues = options.map((option) => option.value);
        setSelectedValues(allValues);
        onValueChange(allValues);
      }
    };

    return (
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen} modal={modalPopover}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            {...props}
            variant="ghost"
            onClick={handleTogglePopover}
            className={cn(
              'flex h-6 items-center justify-between rounded-sm p-0 font-semibold [&_svg]:pointer-events-auto',
              selectedValues.length > 0 ? 'bg-primary' : 'bg-background',
              className
            )}
          >
            {selectedValues.length > 0 ? (
              <div className="text-background flex w-full items-center justify-between">
                <div className="flex flex-wrap items-center ps-2">
                  {selectedValues.slice(0, maxCount).map((value, index) => {
                    const option = options.find((o) => o.value === value);
                    const IconComponent = option?.icon;
                    return (
                      <span key={value} className={cn('flex', multiSelectVariants({ variant }))}>
                        {IconComponent && <IconComponent className="mr-2 h-4 w-4" />}
                        {option?.label}
                        {index < selectedValues.length - 1 ? ',' : ''}
                      </span>
                    );
                  })}
                  {selectedValues.length > maxCount && (
                    <span className={cn('text-background border-foreground/1', multiSelectVariants({ variant }))}>
                      {`+ ${selectedValues.length - maxCount}`}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <XIcon
                    className="mx-2 h-4 cursor-pointer"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleClear();
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="mx-auto flex w-full items-center justify-between">
                <span className="text-primary mx-2 text-sm">{placeholder}</span>
                {isPopoverOpen ? (
                  <ChevronUp className="text-primary mx-1 h-4 cursor-pointer" />
                ) : (
                  <ChevronDown className="text-primary mx-1 h-4 cursor-pointer" />
                )}
              </div>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-0 shadow-xl" align="start" sideOffset={8} onEscapeKeyDown={() => setIsPopoverOpen(false)}>
          <Command>
            <CommandInput placeholder="Search..." onKeyDown={handleInputKeyDown} />
            <CommandList className="pt-4">
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                <CommandItem key="all" onSelect={toggleAll} className="cursor-pointer">
                  <div
                    className={cn(
                      'hover:bg-secondary mr-2 flex h-3 w-3 items-center justify-center rounded-xs',
                      selectedValues.length === options.length
                        ? 'bg-primary text-primary-foreground'
                        : 'outline-secondary outline [&_svg]:invisible'
                    )}
                  ></div>
                  <span>(Select All)</span>
                </CommandItem>
                {options.map((option) => {
                  const isSelected = selectedValues.includes(option.value);
                  return (
                    <CommandItem
                      disabled={option.disabled}
                      key={option.value}
                      onSelect={() => toggleOption(option.value)}
                      className="cursor-pointer"
                    >
                      <div
                        className={cn(
                          'hover:bg-secondary mr-2 flex h-3 w-6 items-center justify-center rounded-xs',
                          isSelected ? 'text-primary-foreground bg-primary' : 'outline-secondary outline [&_svg]:invisible'
                        )}
                      ></div>
                      <div className="flex w-100 justify-between">
                        {option.icon && <option.icon className="text-primary-foreground mr-2 h-4 w-4" />}
                        <span>{option.label}</span>
                        {option.extra && <Badge variant="secondary">{option.extra}</Badge>}
                      </div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
            <CommandGroup className="pt-4">
              <div className="flex items-center justify-between">
                {selectedValues.length > 0 && (
                  <>
                    <CommandItem onSelect={handleClear} className="flex-1 cursor-pointer justify-center">
                      Clear
                    </CommandItem>
                    <Separator orientation="vertical" className="flex h-full min-h-6" />
                  </>
                )}
                <CommandItem onSelect={() => setIsPopoverOpen(false)} className="max-w-full flex-1 cursor-pointer justify-center">
                  Close
                </CommandItem>
              </div>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);

MultiSelect.displayName = 'MultiSelect';
