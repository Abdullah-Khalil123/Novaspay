interface RadioGroupProps<T> {
  options: { label: string; value: T }[];
  value?: T;
  onChange?: (val: T) => void;
}

function RadioGroup<T>({ options, value, onChange }: RadioGroupProps<T>) {
  return (
    <div className="flex space-x-4">
      {options.map((opt) => {
        const selected = value === opt.value;
        return (
          <button
            key={String(opt.value)}
            onClick={() => onChange?.(opt.value)}
            type="button"
            className={`flex items-center px-4 py-1 mb-5 rounded-md border transition 
              ${
                selected
                  ? 'border-green-800 bg-green-50 text-green-800'
                  : 'border-gray-300 bg-white text-gray-600'
              }`}
          >
            <span
              className={`w-4 h-4 mr-2 rounded-full border flex items-center justify-center 
                ${
                  selected ? 'border-green-800 bg-green-800' : 'border-gray-400'
                }`}
            >
              {selected && (
                <span className="w-2 h-2 bg-white rounded-full"></span>
              )}
            </span>
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

export default RadioGroup;
