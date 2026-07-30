import React, { useState, useEffect } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import { cn } from '@/utils/cn';

interface SearchProps {
  value?: string;
  onChange?: (val: string) => void;
  placeholder?: string;
  className?: string;
}

export const Search: React.FC<SearchProps> = ({
  value: externalValue,
  onChange,
  placeholder = 'Search...',
  className,
}) => {
  const [internalValue, setInternalValue] = useState(externalValue || '');

  useEffect(() => {
    if (externalValue !== undefined) {
      setInternalValue(externalValue);
    }
  }, [externalValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInternalValue(val);
    if (onChange) onChange(val);
  };

  const handleClear = () => {
    setInternalValue('');
    if (onChange) onChange('');
  };

  return (
    <div className={cn('relative flex items-center w-full max-w-sm', className)}>
      <SearchIcon className="absolute left-3 h-4 w-4 text-neutral-400 pointer-events-none" />
      <input
        type="text"
        value={internalValue}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full pl-9 pr-8 py-1.5 text-xs rounded-md border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900"
      />
      {internalValue && (
        <button
          onClick={handleClear}
          className="absolute right-2.5 text-neutral-400 hover:text-neutral-600 focus:outline-none"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
};
