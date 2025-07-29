/*
  Name: InputField.tsx
  Description: Component an input field (currently used for date and text)
*/
export const InputField = ({
    label,
    value,
    type = "text",
    onChange,
    error_msg,
    placeholder = "",
}: {
    label: string;
    value: string;
    type?: string;
    onChange: (value: string) => void;
    error_msg?: string;
    placeholder?: string;
}) => {
    return (
        <>
            <label className="block text-sm font-medium mb-1">{label}</label>
            <input
                type={type}
                className={`w-full p-2 border ${error_msg ? 'border-red-300' : 'border-gray-300'} rounded`}
                placeholder={placeholder}
                value={value}
                onChange={e => onChange(e.target.value)}
            />
            {/* print any errors */}
            {error_msg && <p className="text-red-500 text-xs">{error_msg}</p>}
        </>
    );
};
