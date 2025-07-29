/*
  Name: DropDown.tsx
  Description: Component for a dropdown
*/
export const DropDown = ({
  label,
  options,
  value,
  onChange,
  error_msg
}: {
  label: string;
  options: Array<{ id: number; label: string }>;
  value: number | string;
  onChange: (value: number | string) => void;
  error_msg?: string;
}) => {
    console.log("Value in DropDown:", value);
  return (
    <div className="mb-3">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <select
        className={`w-full p-2 border ${error_msg ? 'border-red-300' : 'border-gray-300'} rounded`}
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        {options.map((s) => {
          return(<option key={s.id} value={s.id}>{s.label}</option>)
        })}
      </select>
      {/* print any errors */}
      {error_msg && <p className="text-red-500 text-xs">{error_msg}</p>}
    </div>
  );
};
