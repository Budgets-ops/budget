import ServiceCard from '../ServiceCard';
import { useState } from 'react';

export default function ServiceCardExample() {
  const [selected, setSelected] = useState(false);
  
  return (
    <div className="w-64">
      <ServiceCard
        id="mtn"
        name="MTN"
        logo="https://placehold.co/200x100/FFD700/000000?text=MTN"
        category="telecom"
        selected={selected}
        onClick={() => setSelected(!selected)}
      />
    </div>
  );
}
