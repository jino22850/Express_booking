import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaAddressBook } from "react-icons/fa6";
import { PiPhoneCallFill } from "react-icons/pi";
import { MdAttachEmail } from "react-icons/md";
import axios from 'axios'; 
import Cover from '../Assests/booking2.png';

const Contact = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [formData, setFormData] = useState({
    fName: '',
    lName: '',
    email: '',
    phone: '',
    message: '',
  });

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get('http://localhost:8070/api/feedback/feedback/approved');
      setFeedbacks(response.data.approvedFeedbacks);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fName.trim() || !formData.lName.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.message.trim()) {
      alert('All fields are required');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8070/api/feedback/feedbackadd', formData);
      if (response.data.success) {
        alert('Feedback submitted successfully');
        setFormData({
          fName: '',
          lName: '',
          email: '',
          phone: '',
          message: '',
        });
      } else {
        alert('Failed to submit feedback');
      }
    } catch (error) {
      alert('Failed to submit feedback');
    }
  };

  return (
    <div>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col md:flex-row justify-center bg-gray-100 py-16 px-4 md:px-0"
    >
      {/* Left side: Contact Information */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="w-full md:w-full p-6 md:mr-4 bg-white rounded-lg shadow-md"
      >
        <h2 className="text-3xl font-semibold mb-4 text-blue-900 uppercase">Contact Information</h2>
        <div className='grid grid-cols-2 gap-6'>
          <div className='flex justify-end items-center'>
            <img src={Cover} alt='Booking' className="h-48 w-auto rounded-lg shadow-lg" />
          </div>
          <div>
            <ContactItem icon={<FaAddressBook className='text-indigo text-xl md:text-2xl' />} title="XPress Booking, Judge's Hill Road, Badulla" />
            <ContactItem icon={<PiPhoneCallFill className='text-indigo text-xl md:text-2xl' />} title="055-2586652" />
            <ContactItem icon={<MdAttachEmail className='text-indigo text-xl md:text-2xl' />} title="xpressbooking@gmail.com" />
          </div>
        </div>
        <p className="text-base text-gray-700 italic font-semibold mt-8">
          Thank you for choosing XPress Booking. We look forward to serving you and making your travel experience unforgettable!
        </p>
      </motion.div>
      {/* Right side: Form */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="w-full p-6 bg-gray-100 rounded-lg shadow-md md:mt-10"
      >
        <h1 className='text-3xl font-semibold mb-6 text-yellow-800'>Your Feedback Matters</h1>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='grid grid-cols-2 gap-6'>
            <FormField label="First Name" name="fName" type="text" value={formData.fName} onChange={handleChange} />
            <FormField label="Last Name" name="lName" type="text" value={formData.lName} onChange={handleChange} />
            <FormField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
            <FormField label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
            <div className="col-span-2">
              <label htmlFor="message" className="block text-sm font-semibold text-gray-900">Message</label>
              <textarea id="message" name="message" rows={4} className="block w-full rounded-md border-gray-300 px-3.5 py-2 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={formData.message} onChange={handleChange}></textarea>
            </div>
            <div className="col-span-2 flex justify-center">
              <button type="submit" className="bg-orange-800 text-white py-2 px-8 rounded-md hover:bg-yellow-700 transition-colors duration-300">Submit</button>
            </div>
          </div>
        </form>
      </motion.div>
      
    </motion.div>
    {/* Feedbacks section */}
    <motion.div
    initial={{ x: 100, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ delay: 0.6, duration: 0.8 }}
    className="w-full md:w-full p-6  bg-white rounded-lg shadow-md"
  >
    <h2 className='text-3xl font-semibold mb-4 text-blue-900'>Feedbacks</h2>
    <ul className='space-y-4 w-1/2'>
      {feedbacks.map(feedback => (
        <li key={feedback._id} className='bg-gray-100 p-4 rounded-lg shadow-md'>
          <div>
            <strong>Name:</strong> {feedback.fName} {feedback.lName}
          </div> 
          <div>
            <strong>Message:</strong> {feedback.message}
          </div>
        </li>
      ))}
    </ul>
  </motion.div>
  </div>
  );
};

const ContactItem = ({ icon, title }) => (
  <div className='flex items-center space-x-4'>
    <div className='text-indigo text-xl md:text-3xl'>{icon}</div>
    <div className='md:text-xl font-semibold'>{title}</div>
  </div>
);

const FormField = ({ label, name, type, value, onChange }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-semibold text-gray-900">{label}</label>
    <input
      type={type}
      id={name}
      name={name}
      className="block w-full rounded-md border-gray-300 px-3.5 py-2 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      value={value}
      onChange={onChange}
    />
  </div>
);

export default Contact;
