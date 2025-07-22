import { useUserPreferences } from './contexts';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './select';

interface Props {}
export function SelectKeySwitchPricePerQuantity({}: Props) {
  const { showKeySwitchPricePerQuantity, setShowKeySwitchPricePerQuantity } = useUserPreferences();
  const options = ['1', '10', '20', '50', '100'];

  return (
    <div className="text-primary flex items-baseline text-sm font-semibold">
      <span>Show price per item:</span>
      <Select onValueChange={(value) => setShowKeySwitchPricePerQuantity(Number(value))} value={showKeySwitchPricePerQuantity + ''}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="border-secondary/20 shadow-lg">
          <SelectGroup>
            {options.map((option) => (
              <SelectItem value={option} key={option}>
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
