import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = () => {
    axios.get('http://localhost:8070/api/feedback/feedback')
      .then(res => {
        setFeedbacks(res.data.feedbacks);
      })
      .catch(err => console.error(err));
  };

  const handleApprove = (id) => {
    axios.post('http://localhost:8070/api/feedback/approve', { id })
      .then(res => {
        // If the feedback is successfully approved, fetch the updated list of feedbacks
        if (res.data.success) {
          fetchFeedbacks();
        } else {
          console.error('Failed to approve feedback');
        }
      })
      .catch(err => console.error(err));
  };

  return (
    <div className='bg-gray-200'>
      <h2 className="text-2xl font-semibold mb-4 mt-14 ml-14">Feedbacks</h2>
    
      <table className="min-w-screen divide-y divide-gray-200 ml-7 mr-7 mt-20">
        <thead className="bg-gray-500">
          <tr>
            <th className="px-10 py-5 text-left text-xs font-medium text-black uppercase tracking-wider">First Name</th>
            <th className="px-10 py-5 text-left text-xs font-medium text-black uppercase tracking-wider">Last Name</th>
            <th className="px-10 py-5 text-left text-xs font-medium text-black uppercase tracking-wider">Email</th>
            <th className="px-10 py-5 text-left text-xs font-medium text-black uppercase tracking-wider">Phone</th>
            <th className="px-10 py-5 text-left text-xs font-medium text-black uppercase tracking-wider">Message</th>
            <th className="px-10 py-5 text-left text-xs font-medium text-black uppercase tracking-wider">Status</th>
            <th className="px-10 py-5 text-left text-xs font-medium text-black uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {feedbacks.map(feedback => (
            <tr key={feedback._id}>
              <td className="px-8 py-4 whitespace-nowrap">{feedback.fName}</td>
              <td className="px-8 py-4 whitespace-nowrap">{feedback.lName}</td>
              <td className="px-8 py-4 whitespace-nowrap">{feedback.email}</td>
              <td className="px-8 py-4 whitespace-nowrap">{feedback.phone}</td>
              <td className="px-8 py-4 whitespace-nowrap">{feedback.message}</td>
              <td className="px-8 py-4 whitespace-nowrap">{feedback.approved ? 'Approved' : 'Pending'}</td>
              <td className="px-8 py-4 whitespace-nowrap">
                {!feedback.approved && (
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none mr-2"
                    onClick={() => handleApprove(feedback._id)}
                  >
                    Approve
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Feedback;
