import React from 'react';
import { InputText, InputTextProps } from 'primereact/inputtext';

interface AppInputProps extends InputTextProps {
  removeLabel?: boolean;
  label?: string;
  error?: string;
}

const AppInput: React.FC<AppInputProps> = (props) => {
  const { value, removeLabel, error, label, onChange, ...rest } = props;
  return (
    <div>
      {removeLabel ? (
        <div className='mb-0'>
          <div className="border-1 border-round flex align-items-center" style={{ borderColor: '#C4C4C4' , minHeight: '45px'}}>
            <InputText
              value={value}
              className="w-full text-xs"
              placeholder={label}
              onChange={onChange}
              {...rest}
              style={{minHeight: '45px'}}
            />
          </div>
          <div>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>
        </div>
      ) : (
        <>
          <label htmlFor={rest.id} className="block font-medium text-900 text-xs mb-1">{label}</label>
          <InputText
            id={rest.id}
            placeholder={label}
            className="w-full mb-1 text-sm font-normal"
            value={value}
            onChange={onChange}
            {...rest}
            style={{minHeight: '45px'}}
            required
          />
          {error && <p className="text-red-500 text-xs mt-0">{error}</p>}
        </>
      )}
    </div>
  );
};

export default AppInput;
