
const PaymentModal = ({payMethod,confirm,}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h3 className="text-xl font-semibold mb-4">Select Payment Method</h3>

        <select
          value={selectedPaymentMethod}
          onChange={(e) => setSelectedPaymentMethod(e.target.value)}
          className="border p-2 mb-4 w-full rounded"
        >
          <option value="">Select Payment Method</option>
          <option value="credit_card">Credit Card</option>
          <option value="paypal">PayPal</option>
          <option value="cash_on_delivery">Cash on Delivery</option>
        </select>

        <div className="flex gap-4">
          <button
            onClick={confirmOrder}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Confirm Order
          </button>
          <button
            onClick={() => setIsPaymentModalVisible(false)}
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
