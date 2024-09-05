'use client'

import { useState, useEffect } from 'react'

const NotificationTable = () => {
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('https://669806b502f3150fb66fd477.mockapi.io/UserList')
        const data = await response.json()
        setNotifications(data)
      } catch (error) {
        console.error('Error fetching notifications:', error)
      }
    }

    fetchNotifications()
  }, [])

  return (
    <div>
      <h2>All Notifications</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Subtitle</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {notifications.map(notification => (
            <tr key={notification.id}>
              <td>{notification.title}</td>
              <td>{notification.subtitle}</td>
              <td>{new Date(notification.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default NotificationTable
