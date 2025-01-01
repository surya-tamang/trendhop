const PaymentModal = ({
  close,
  setPaymentMethod,
  paymentMethod,
  onConfirm,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-5 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Select Payment Method</h3>

        <select
          value={paymentMethod}
          onChange={setPaymentMethod}
          className="border p-2 mb-4"
        >
          <option value="">Select Payment Method</option>
          <option value="cash_on_delivery">Cash on Delivery</option>
          <option value="credit_card" disabled>
            Credit Card [not available]
          </option>
          <option value="esewa" disabled>
            Esewa [not available]
          </option>
          <option value="khalti" disabled>
            Khalti [not available]
          </option>
        </select>

        <div className="flex gap-4">
          <button
            onClick={onConfirm}
            className="bg-green text-white py-2 px-4 rounded"
          >
            Confirm Order
          </button>
          <button
            onClick={close}
            className="bg-gray-500 text-white py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
