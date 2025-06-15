import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { clsx } from 'clsx';

type GadgetStyle = 'bell' | 'default' | 'anywhere-door' | 'time-kerchief'; // Extend as needed

interface InteractiveGadgetButtonProps extends HTMLMotionProps<'button'> {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  className?: string;
  gadgetStyle?: GadgetStyle;
  ariaLabel?: string;
  disabled?: boolean;
}

const InteractiveGadgetButton: React.FC<InteractiveGadgetButtonProps> = ({
  onClick,
  children,
  className,
  gadgetStyle = 'default',
  ariaLabel,
  disabled = false,
  ...rest
}) => {
  console.log('InteractiveGadgetButton loaded');

  const baseStyle =
    'px-6 py-3 rounded-full font-semibold text-white shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-150 ease-in-out';

  let gadgetSpecificStyle = '';

  switch (gadgetStyle) {
    case 'bell':
      gadgetSpecificStyle =
        'bg-yellow-400 hover:bg-yellow-500 focus:ring-yellow-500 border-2 border-yellow-600 text-gray-800 relative overflow-hidden';
      // Adding a small "slit" visual for the bell
      // This could be a pseudo-element or an actual div if more complex design is needed.
      // For simplicity, I'll stick to button styling for now.
      break;
    case 'anywhere-door':
      gadgetSpecificStyle = 'bg-pink-500 hover:bg-pink-600 focus:ring-pink-600';
      break;
    case 'time-kerchief':
      gadgetSpecificStyle = 'bg-blue-400 hover:bg-blue-500 focus:ring-blue-500';
      break;
    default: // 'default' style
      gadgetSpecificStyle = 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-700';
      break;
  }

  const disabledStyle = disabled ? 'opacity-50 cursor-not-allowed' : '';

  // Placeholder for sound effect logic
  const playClickSound = () => {
    // For example:
    // const audio = new Audio('/sounds/gadget-click.mp3');
    // audio.play();
    console.log('Button clicked - play sound effect here if implemented');
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    playClickSound();
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      className={clsx(baseStyle, gadgetSpecificStyle, disabledStyle, className)}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      transition={{ duration: 0.1 }}
      aria-label={ariaLabel || (typeof children === 'string' ? children : 'Interactive button')}
      disabled={disabled}
      {...rest}
    >
      {children}
      {gadgetStyle === 'bell' && (
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-[60%] -translate-x-1/2 h-[2px] w-1/3 bg-yellow-700 rounded-full"
        ></span>
      )}
    </motion.button>
  );
};

export default InteractiveGadgetButton;