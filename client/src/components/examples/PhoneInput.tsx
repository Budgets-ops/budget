import PhoneInput from '../PhoneInput';
import { useState } from 'react';

export default function PhoneInputExample() {
  const [phone, setPhone] = useState('');
  
  return (
    <div className="w-full max-w-md p-4">
      <PhoneInput
        label="Phone Number"
        value={phone}
        onChange={setPhone}
        placeholder="0XX XXX XXXX"
      />
    </div>
  );
}
