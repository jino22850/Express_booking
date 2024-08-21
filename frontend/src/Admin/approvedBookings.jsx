import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { FaBusAlt } from "react-icons/fa";

const ApprovedBookings = () => {
  const [approvedBookings, setApprovedBookings] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({
    fromDate: '',
    // turnTime: ''
  });

  useEffect(() => {
    // Fetch all approved bookings initially
    axios.get('http://localhost:8070/api/bookings/approved')
      .then(response => {
        setApprovedBookings(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleChange = (e) => {
    setSearchCriteria({ ...searchCriteria, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { fromDate } = searchCriteria; // Destructure fromDate from searchCriteria
      const toDate = ''; // You can add toDate if you want to search within a date range
  
      const response = await axios.get('http://localhost:8070/api/bookings/approved', {
        params: { fromDate, toDate } // Pass fromDate and toDate as parameters
      });
      setApprovedBookings(response.data);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to search bookings');
    }
  };

  // Define styles for PDF report
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#E4E4E4',
      padding: 20,
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    row: {
      flexDirection: 'row',
      marginBottom: 10,
    },
    cell: {
      flex: 1,
      padding: 5,
    },
  });

  // Define PDF component
  const PDFReport = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.heading}>Approved Bookings Report</Text>
          {approvedBookings.map((booking, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.cell}>{booking.passengerName}</Text>
              <Text style={styles.cell}>{booking.email}</Text>
              <Text style={styles.cell}>{new Date(booking.date).toLocaleDateString()}</Text>
              <Text style={styles.cell}>{booking.turnTime}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );

  return (
    <div className='pt-[50px] bg-[#fbfbfb]'>
      
      
      <div className="flex items-center space-x-4 mb-6">
        <FaBusAlt  className="text-4xl text-blue-900 ml-12 mt-16" />
        <h2 className="text-3xl font-semibold text-blue-900 mt-16">Approved Bookings</h2></div>
    
                    <div className="border-b-8 border-blue-900 mb-6"></div>
                    
      
      <div className='ml-0 mr-2 min-w-screen'>
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-wrap justify-between items-center gap-4 p-4 bg-white shadow rounded-lg">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Date From</label>
              <input
                type="date"
                name="fromDate"
                value={searchCriteria.fromDate}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Date To</label>
              <input
                type="date"
                name="toDate"
                value={searchCriteria.toDate}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <button 
              type="submit"
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-900 transition duration-300"
            >
              Search
            </button>
          </div>
          <br/><br/>
          <PDFDownloadLink  className='bg-blue-500 text-white text-sm rounded-md px-6 py-2 hover:bg-blue-600 transition duration-300'  document={<PDFReport />} fileName="approved_bookings_report.pdf">
        {({ blob, url, loading, error }) => (
          loading ? 'Generating PDF...' : 'Download Report'
        )}
      </PDFDownloadLink>
        </form>
        <div className="bg-gray-100 mx-auto px-8 py-6 rounded-lg shadow-md w-full  items-center">
          <div className="overflow-x-auto">
            <table className="min-w-screen divide-y divide-gray-200 ml-7 mr-7 mt-0">
              <thead className="bg-gray-500">
                <tr>
                  <th className="px-16 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Passenger Name</th>
                  <th className="px-16 py-3 text-left text-xs font-medium text-black  uppercase tracking-wider">Email</th>
                  <th className="px-16 py-3 text-left text-xs font-medium text-black  uppercase tracking-wider">Date</th>
                  <th className="px-16 py-3 text-left text-xs font-medium text-black  uppercase tracking-wider">Turn Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {approvedBookings.map(booking => (
                  <tr key={booking._id}>
                    <td className="px-16 py-4 whitespace-nowrap">{booking.passengerName}</td>
                    <td className="px-16 py-4 whitespace-nowrap">{booking.email}</td>
                    <td className="px-16 py-4 whitespace-nowrap">{new Date(booking.date).toLocaleDateString()}</td>
                    <td className="px-16 py-4 whitespace-nowrap">{booking.turnTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApprovedBookings;
