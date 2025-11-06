import { useState } from "react";
import { FaStar } from "react-icons/fa";

interface StarPickerProps {
  onChange?: (value: number) => void;
  initialValue?: number;
}

export default function StarPicker({
  onChange,
  initialValue = 0,
}: StarPickerProps) {
  const [rating, setRating] = useState<number>(initialValue);
  const [hover, setHover] = useState<number>(0);

  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, index) => {
        const current = index + 1;
        return (
          <button
            key={index}
            type="button"
            onClick={() => {
              setRating(current);
              if (onChange) onChange(current);
            }}
            onMouseEnter={() => setHover(current)}
            onMouseLeave={() => setHover(0)}
            className="focus:outline-none"
          >
            <FaStar
              size={28}
              className={`transition-colors duration-200 cursor-pointer ${
                current <= (hover || rating)
                  ? "text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
