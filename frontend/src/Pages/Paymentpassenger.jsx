import React, { useState } from 'react';

const Paymentpassenger = () => {
    const [formData, setFormData] = useState({
        cardNumber: '',
        cardHolderName: '',
        expiryDate: '',
        cvv: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Form submitted:', formData);
      };
    

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Payment Details</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-600">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              className="block w-full mt-1 px-4 py-2 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="XXXX-XXXX-XXXX-XXXX"
              required
            />
          </div>

          <div>
            <label htmlFor="cardHolderName" className="block text-sm font-medium text-gray-600">Card Holder Name</label>
            <input
              type="text"
              id="cardHolderName"
              name="cardHolderName"
              value={formData.cardHolderName}
              onChange={handleChange}
              className="block w-full mt-1 px-4 py-2 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="John Doe"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-600">Expiry Date</label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                className="block w-full mt-1 px-4 py-2 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="MM/YY"
                required
              />
            </div>

            <div>
              <label htmlFor="cvv" className="block text-sm font-medium text-gray-600">CVV</label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                className="block w-full mt-1 px-4 py-2 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="XXX"
                required
              />
            </div>
          </div>

          <button type="submit" className="block w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
            Pay Now
          </button>
        </form>
      </div>
    </div>
  )
}

export default Paymentpassenger
