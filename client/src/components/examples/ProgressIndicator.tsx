import ProgressIndicator from '../ProgressIndicator';

export default function ProgressIndicatorExample() {
  const steps = [
    { id: 1, label: 'Select Service' },
    { id: 2, label: 'Recipient' },
    { id: 3, label: 'Payment' }
  ];
  
  return (
    <div className="w-full max-w-2xl p-4">
      <ProgressIndicator currentStep={2} steps={steps} />
    </div>
  );
}
