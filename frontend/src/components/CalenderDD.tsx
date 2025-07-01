import { useState } from 'react';
import DatePicker from 'react-datepicker';

type CalendarDropdownProps = {
  children: React.ReactNode;
};

export default function CalendarDropdown({ children }: CalendarDropdownProps) {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setOpen(false);
    console.log('Selected date:', date);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="focus:outline-none"
      >
        {children}
      </button>

      {open && (
        <div className="absolute mt-2 z-50 bg-white border rounded shadow p-2">
          <DatePicker
            inline
            selected={selectedDate}
            onChange={handleDateChange}
          />
        </div>
      )}
    </div>
  );
}
