import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2 } from 'lucide-react';

interface FeaturesInputProps {
  value: string[];
  onChange: (features: string[]) => void;
}

export const FeaturesInput: React.FC<FeaturesInputProps> = ({ value, onChange }) => {
  const [input, setInput] = useState('');

  const addFeature = () => {
    if (input.trim() && !value.includes(input.trim())) {
      onChange([...value, input.trim()]);
      setInput('');
    }
  };

  const removeFeature = (feature: string) => {
    onChange(value.filter(f => f !== feature));
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          placeholder="Shto tipar të ri..."
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-1"
        />
        <Button type="button" onClick={addFeature} disabled={!input.trim()}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <ul className="space-y-1">
        {value.map((feature, idx) => (
          <li key={idx} className="flex items-center gap-2">
            <span className="text-sm bg-muted px-2 py-1 rounded">{feature}</span>
            <Button type="button" size="sm" variant="destructive" onClick={() => removeFeature(feature)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};
