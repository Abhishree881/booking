'use client';

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import "@/styles/profile.css"
import { withAuth } from '@/utils/withAuth';
import toast from 'react-hot-toast';
import { Card, Badge, Space, Typography, Button, Tag  } from 'antd';
import { FaTicketAlt } from "react-icons/fa";

const page = () => {
  const { user } = useSelector((state) => state.user)
  const [tickets, setTickets] = useState([])

  const fetchProfileTickets = async () => {
    const res = await fetch("/api/booking/user-bookings", {
      method: "POST",
      body: JSON.stringify({
        userId: user.id
      })
    })
    const data = await res.json()
    if (data.error) toast.error(data.error)
    await fetch("/api/booking/user-bookings", {
      method: "POST",
      body: JSON.stringify({
        userId: user.id
      })
    }).then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error)
          return;
        }
        setTickets(data.tickets);  // Update the tickets state with the fetched data
      })

  }

  const handleCancelTicket = async (seats, id) => {
    const res = await fetch("/api/tickets/cancel", {
      method: "POST",
      body: JSON.stringify({
        pnr: id,
        userId: user.id,
        seatNumbers: seats
      })
    });
    const data = await res.json();
    if (data.error) {
      toast.error(data.error);
      return;
    }
    toast.success("Ticket cancelled successfully"); // after ticket is cancelled, we are again fetching the tickets
    fetchProfileTickets();
  }  

  useEffect(() => {
    if (user?.id) {
      fetchProfileTickets() //  this function is called to fetch the tickets of the user for initial rendering of the page
    }
  }, [user])

  if (!user) return;
// this is the code for the profile page, profile page is completely built using antd to show skills of using different readymade components.
  return (
    <div className='profile-page'>
      <h3>Hello {user.name ? user.name : user.email}!</h3>
      <h4>Tickets</h4>
      <div>
        {tickets.length === 0 ? (
          <Typography.Text type="secondary">No tickets booked</Typography.Text>
        ) : (
          <Space direction="vertical" style={{ width: '100%' }}>
            {tickets.map((ticket) => (
              <Card
                key={ticket.id}
                hoverable
                style={{
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
                extra={
                  <Button 
                    danger
                    type="primary"
                    // icon={<CloseCircleOutlined />}
                    onClick={() => handleCancelTicket(ticket.seats, ticket.id)}
                  >
                    Cancel Ticket
                  </Button>
                }
              >
                <Space direction="vertical">
                  <Space>
                    <FaTicketAlt  style={{ fontSize: '20px', color: '#1890ff' }} />
                    <Typography.Text strong>PNR: </Typography.Text>
                    <Badge status="processing" text={ticket.id} />
                  </Space>
                  <Space>
                    {ticket.seats.map((seat) => (
                      <Tag color="green">
                      <Typography.Text strong>Seats: </Typography.Text>
                      <Typography.Text>{seat}</Typography.Text>
                      </Tag>
                    ))}
                  </Space>
                </Space>
              </Card>
            ))}
          </Space>
        )}


      </div>
    </div>
  )
}

export default withAuth(page)
