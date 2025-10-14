import OrderSummary from '../OrderSummary';

export default function OrderSummaryExample() {
  return (
    <div className="w-full max-w-md p-4">
      <OrderSummary
        serviceName="MTN"
        recipientNumber="0244123456"
        packageName="1GB Daily Bundle"
        dataAmount="1GB"
        validity="Valid for 24 hours"
        price={5.00}
      />
    </div>
  );
}
