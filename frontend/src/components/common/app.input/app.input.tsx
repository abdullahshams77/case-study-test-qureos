import React from 'react';
import { InputText, InputTextProps } from 'primereact/inputtext';

interface AppInputProps extends InputTextProps {
  label?: string;
  error?: string;
}

const AppInput: React.FC<AppInputProps> = (props) => {
  const { value, error, label, onChange, ...rest } = props;
  return (
    <div>
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
    </div>
  );
};

export default AppInput;
