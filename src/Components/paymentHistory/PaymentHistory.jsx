import React, { useState, useEffect } from 'react';
// import './PaymentHistory.css';

const PaymentHistoryPage = () => {
  const [filter, setFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  const payments = [
    { id: 1, name: 'John Doe', from: 'City A', to: 'City B', date: '2024-07-01', price: 100, status: 'success' },
    { id: 2, name: 'Jane Smith', from: 'City C', to: 'City D', date: '2024-08-15', price: 150, status: 'canceled' },
    { id: 3, name: 'Alice Johnson', from: 'City E', to: 'City F', date: '2023-09-03', price: 200, status: 'success' },
    // Add more dummy data as needed
  ];

  const getFilteredPayments = () => {
    const currentDate = new Date();
    let filteredPayments = payments.filter(payment => 
      filter === 'all' ? true : payment.status === filter
    );

    if (timeFilter === 'currentMonth') {
      filteredPayments = filteredPayments.filter(payment => {
        const paymentDate = new Date(payment.date);
        return paymentDate.getMonth() === currentDate.getMonth() && paymentDate.getFullYear() === currentDate.getFullYear();
      });
    } else if (timeFilter === 'lastMonth') {
      filteredPayments = filteredPayments.filter(payment => {
        const paymentDate = new Date(payment.date);
        const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        return paymentDate.getMonth() === lastMonth.getMonth() && paymentDate.getFullYear() === lastMonth.getFullYear();
      });
    } else if (timeFilter === 'lastYear') {
      filteredPayments = filteredPayments.filter(payment => {
        const paymentDate = new Date(payment.date);
        return paymentDate.getFullYear() === currentDate.getFullYear() - 1;
      });
    }

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      filteredPayments = filteredPayments.filter(payment => {
        const paymentDate = new Date(payment.date);
        return paymentDate >= start && paymentDate <= end;
      });
    }

    return filteredPayments;
  };

  useEffect(() => {
    const total = getFilteredPayments().reduce((acc, payment) => acc + payment.price, 0);
    setTotalPrice(total);
  }, [filter, timeFilter, startDate, endDate]);

  const filteredPayments = getFilteredPayments();

  return (
    <div>
      <h1>Payment History</h1>
      <div className='tbtn'>
        <button className='btn1' onClick={() => setFilter('all')}>All</button>
        <button className='btn2' onClick={() => setFilter('success')}>Success</button>
        <button className='btn3' onClick={() => setFilter('canceled')}>Canceled</button>
      </div>
      <br />
      <div className='time-filter'>
        <select onChange={(e) => setTimeFilter(e.target.value)} value={timeFilter}>
          <option value="all">All Time</option>
          <option value="currentMonth">Current Month</option>
          <option value="lastMonth">Last Month</option>
          <option value="lastYear">Last Year</option>
        </select>
      </div>
      <br />
      <div className='date-range-filter'>
        <label>
          From:
          <input 
            type="date" 
            value={startDate} 
            onChange={(e) => setStartDate(e.target.value)} 
          />
        </label>
        <label>
          To:
          <input 
            type="date" 
            value={endDate} 
            onChange={(e) => setEndDate(e.target.value)} 
          />
        </label>
      </div>
      <br />
      <h2>Total Amount: <span>&#8377;</span>{totalPrice}</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>From</th>
            <th>To</th>
            <th>Date</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredPayments.map(payment => (
            <tr key={payment.id}>
              <td>{payment.id}</td>
              <td>{payment.name}</td>
              <td>{payment.from}</td>
              <td>{payment.to}</td>
              <td>{payment.date}</td>
              <td>${payment.price}</td>
              <td>{payment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistoryPage;
