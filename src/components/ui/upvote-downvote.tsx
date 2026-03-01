'use client';
import NumberFlow from '@number-flow/react';
import { motion } from 'motion/react';
import { ArrowDown, ArrowUp } from 'lucide-react';
import React, { useState, useEffect } from 'react';

interface UpvoteDownvoteProps {
  value?: number;
  min?: number;
  max?: number;
  label?: string;
  onChange?: (value: number) => void;
  className?: string;
}

const UpvoteDownvote: React.FC<UpvoteDownvoteProps> = ({
  value: controlledValue,
  min = 0,
  max = 99,
  label = 'Items',
  onChange,
  className = '',
}) => {
  const [internalValue, setInternalValue] = useState(controlledValue ?? 0);
  const value = controlledValue ?? internalValue;
  const [lastAction, setLastAction] = useState<'up' | 'down' | null>(null);

  useEffect(() => {
    if (controlledValue !== undefined) {
      setInternalValue(controlledValue);
    }
  }, [controlledValue]);

  const handleVote = (action: 'up' | 'down') => {
    const newValue = action === 'up'
      ? Math.min(value + 1, max)
      : Math.max(value - 1, min);

    setInternalValue(newValue);
    setLastAction(action);
    onChange?.(newValue);
  };

  return (
    <div
      className={`flex flex-col items-center gap-2 p-4 border rounded-xl shadow-lg w-fit mx-auto transition-colors duration-300 ${
        lastAction === 'up'
          ? 'dark:bg-green-950 bg-green-300 border-green-600 text-white'
          : lastAction === 'down'
            ? 'dark:bg-red-950 bg-red-300 border-red-600 text-white'
            : 'dark:bg-neutral-950 bg-neutral-50 text-primary border-neutral-200 dark:border-neutral-800'
      } ${className}`}
    >
      <div className='text-lg font-medium'>
        <NumberFlow value={value} format={{ notation: 'compact' }} /> {label}
      </div>

      <div className='flex items-center gap-4'>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => handleVote('up')}
          disabled={value >= max}
          className={`p-2 rounded-full text-white transition-colors disabled:opacity-40 ${
            lastAction === 'up' ? 'bg-green-500' : 'bg-black'
          }`}
        >
          <ArrowUp size={24} />
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => handleVote('down')}
          disabled={value <= min}
          className={`p-2 rounded-full text-white transition-colors disabled:opacity-40 ${
            lastAction === 'down' ? 'bg-red-500' : 'bg-black'
          }`}
        >
          <ArrowDown size={24} />
        </motion.button>
      </div>
    </div>
  );
};

export default UpvoteDownvote;
