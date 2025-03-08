'use client';

interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export function Switch({ checked, onCheckedChange }: SwitchProps) {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input 
        type="checkbox" 
        className="sr-only peer" 
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
      />
      <div className={`
        w-11 h-6 rounded-full peer 
        peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300
        after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
        after:bg-white after:border-gray-300 after:border after:rounded-full 
        after:h-5 after:w-5 after:transition-all
        ${checked 
          ? 'bg-blue-600 after:translate-x-full after:border-white' 
          : 'bg-gray-200'
        }
      `}></div>
    </label>
  );
} 