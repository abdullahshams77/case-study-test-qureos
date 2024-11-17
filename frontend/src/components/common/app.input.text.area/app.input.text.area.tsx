// components/common/AppInputTextArea.tsx
import React from 'react';
import { InputTextarea, InputTextareaProps } from 'primereact/inputtextarea';

interface AppInputTextAreaProps extends InputTextareaProps {
  error?: string;
  label?: string;
}

const AppInputTextArea: React.FC<AppInputTextAreaProps> = ({ value, onChange, error, label, ...rest }) => {
  return (
    <div className="mb-1">
      <label className="block font-medium text-900 text-xs mb-1">{label}</label>
      <InputTextarea
        value={value}
        onChange={onChange}
        className="w-full text-sm font-normal"
        {...rest}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default AppInputTextArea;
