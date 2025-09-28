import { useGetGamesList } from '@/hooks/useGames';
import type { GameSchema } from '@/types/games';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface GameSelectDropDownProps {
  value?: string | number; // currently selected value
  onChange: (value: string) => void; // callback when changed
  placeholder?: string;
  showAllOption?: boolean; // if true, show "All Games"
}

const GameSelectDropDown = ({
  value,
  onChange,
  placeholder = 'Select a game',
}: GameSelectDropDownProps) => {
  const { data, isLoading } = useGetGamesList();
  const games: GameSchema[] = data || [];

  return (
    <Select value={value?.toString()} onValueChange={onChange}>
      <SelectTrigger className="w-64">
        <SelectValue placeholder={isLoading ? 'Loading...' : placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem key={'0'} value="0">
          All
        </SelectItem>
        {games.map((game) => (
          <SelectItem key={game.id} value={game.id.toString()}>
            {game.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default GameSelectDropDown;
