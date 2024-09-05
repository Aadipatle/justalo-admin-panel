import React, { useState, useEffect } from 'react';
import './Ticket.css';

const TicketPage = () => {
  const [filter, setFilter] = useState('all');
  const [totalPrice, setTotalPrice] = useState(0);
  const [tickets, setTickets] = useState([])
  // const tickets = [
  //   { id: 1, passengerName: 'John Doe', from: 'City A', to: 'City B', status: 'confirmed', date: '2024-09-01', price: 100 },
  //   { id: 2, passengerName: 'Jane Smith', from: 'City C', to: 'City D', status: 'canceled', date: '2024-09-02', price: 150 },
  //   { id: 3, passengerName: 'Alice Johnson', from: 'City E', to: 'City F', status: 'confirmed', date: '2024-09-03', price: 200 },
  // ];

  useEffect(() => {
    async function getData() {
      try {
        let url = 'http://68.183.87.102:8080/getpaymentinformation';
        let token = sessionStorage.getItem('token') 

        let response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json'  
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        let emp = await response.json();
        setTickets(emp);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
    }
    getData();
}, []);
console.log(tickets)
  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = tickets
        .filter(ticket => filter === 'all' ? true : ticket.status === filter)
        .reduce((acc, ticket) => acc + ticket.amount, 0);
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [filter, tickets]);

  const filteredTickets = tickets.filter(ticket =>
    filter === 'all' ? true : ticket.status === filter
  );

  return (
    <div>
      <h1>Bus Tickets</h1>
      <div className='tbtn'>
        <button className='btn1' onClick={() => setFilter('all')}>All</button>
        <button className='btn2' onClick={() => setFilter("success")}>Confirmed</button>
        <button className='btn3' onClick={() => setFilter('canceled')}>Canceled</button>
      </div>
      <br />
      <h2>Total Price: <span>&#8377;</span>{totalPrice}</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Passenger Name</th>
            <th>TimeSpam</th>
            <th>Status</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredTickets.map(ticket => (
            <tr key={ticket.id}>
              <td>{ticket.transactionId}</td>
              <td>{ticket.email}</td>
              <td>{ticket.timestamp}</td>
              <td>{ticket.status}</td>
              <td>&#8377;{ticket.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TicketPage;
