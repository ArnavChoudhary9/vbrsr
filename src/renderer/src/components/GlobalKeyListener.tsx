import React, { useEffect } from 'react';

const GlobalKeyListener: React.FC = () => {
  const handleKeyPress = (event: KeyboardEvent) => {
    const { key, ctrlKey, shiftKey, altKey } = event;

    // Example: Define macros for specific key combinations
    if (ctrlKey && key === 's') {
      event.preventDefault();
      console.log('Ctrl + S pressed: Saving...');
      // Add your save logic here
    } else if (ctrlKey && shiftKey && key === 'P') {
      console.log('Ctrl + Shift + P pressed: Open Preferences...');
      // Add your preferences logic here
    } else if (key === 'Escape') {
      console.log('Escape key pressed: Closing modal...');
      // Add your close modal logic here
    } else if (key === 'F1') {
      event.preventDefault();
      console.log('F1 pressed: Open Help...');
      // Add your help logic here
    }
  };

  useEffect(() => {
    // Attach the global keydown listener
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      // Cleanup the listener on component unmount
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default GlobalKeyListener;
