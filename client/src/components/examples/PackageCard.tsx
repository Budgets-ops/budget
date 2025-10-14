import PackageCard from '../PackageCard';
import { useState } from 'react';

export default function PackageCardExample() {
  const [selected, setSelected] = useState(false);
  
  return (
    <div className="w-full max-w-md p-4">
      <PackageCard
        id="pkg-1"
        name="1GB Daily Bundle"
        dataAmount="1GB"
        price={5.00}
        validity="Valid for 24 hours"
        selected={selected}
        onClick={() => setSelected(!selected)}
      />
    </div>
  );
}
