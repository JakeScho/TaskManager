/*
  Name: MultiLineField.tsx
  Description: Component for a multiple line input field
*/
export const MultiLineField = ({
    label,
    value,
    onChange,
    error_msg,
    placeholder = "",
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    error_msg?: string;
    placeholder?: string;
}) => {
    return (
        <>
            <label className="block text-sm font-medium mb-1">{label}</label>
            <textarea
                className={`w-full p-2 border ${error_msg ? 'border-red-300' : 'border-gray-300'} rounded`}
                placeholder={placeholder}
                value={value}
                onChange={e => onChange(e.target.value)}
            ></textarea>
            {/* print any errors */}
            {error_msg && <p className="text-red-500 text-xs">{error_msg}</p>}
        </>
    );
};