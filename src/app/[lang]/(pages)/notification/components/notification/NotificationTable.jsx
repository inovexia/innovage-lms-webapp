'use client'

import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import tableStyles from '@core/styles/table.module.css';


const timeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count > 1) return `${count} ${interval.label}s ago`;
    if (count === 1) return `${count} ${interval.label} ago`;
  }
  return 'just now';
};

const API_URL = 'https://669806b502f3150fb66fd477.mockapi.io/UserList';

const NotificationTable = () => {
  const [notifications, setNotifications] = useState([]);
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const [clearedNotifications, setClearedNotifications] = useState([]);
  const [readStatus, setReadStatus] = useState({}); // Tracks read/unread status

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const filteredData = data.filter(notification => !clearedNotifications.includes(notification.id));
        setNotifications(filteredData.sort((a, b) => new Date(b.date) - new Date(a.date)));
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, [clearedNotifications]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelectedNotifications = notifications.map((notification) => notification.id);
      setSelectedNotifications(newSelectedNotifications);
      return;
    }
    setSelectedNotifications([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selectedNotifications.indexOf(id);
    let newSelectedNotifications = [];

    if (selectedIndex === -1) {
      newSelectedNotifications = newSelectedNotifications.concat(selectedNotifications, id);
    } else if (selectedIndex === 0) {
      newSelectedNotifications = newSelectedNotifications.concat(selectedNotifications.slice(1));
    } else if (selectedIndex === selectedNotifications.length - 1) {
      newSelectedNotifications = newSelectedNotifications.concat(selectedNotifications.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedNotifications = newSelectedNotifications.concat(
        selectedNotifications.slice(0, selectedIndex),
        selectedNotifications.slice(selectedIndex + 1)
      );
    }

    setSelectedNotifications(newSelectedNotifications);
  };

  //toggle read unread
  const handleToggleRead = () => {
    setReadStatus((prevState) => {
      const updatedStatus = {};
      selectedNotifications.forEach(id => {
        updatedStatus[id] = !prevState[id];
      });
      return { ...prevState, ...updatedStatus };
    });
  };

 //clear  notifications from the view
  const handleClearNotifications = () => {
    setClearedNotifications((prevCleared) => [
      ...prevCleared,
      ...selectedNotifications,
    ]);
    setSelectedNotifications([]);
  };

  const isSelected = (id) => selectedNotifications.indexOf(id) !== -1;

  return (
    <Card>
      <CardHeader
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6">All Notifications</Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleClearNotifications}
              disabled={selectedNotifications.length === 0}
              style={{ marginLeft: 'auto' }}
            >
              Clear Notifications
            </Button>
            <Button
              variant="contained"
              onClick={handleToggleRead}
              disabled={selectedNotifications.length === 0}
              style={{ marginLeft: '10px' }}
            >
              {selectedNotifications.some(id => readStatus[id]) ? 'Mark as Unread' : 'Mark as Read'}
            </Button>
          </div>
        }
      />
      <div className="overflow-x-auto">
        <table className={tableStyles.table}>
          <thead>
            <tr>
              <th>
                <Checkbox
                  indeterminate={selectedNotifications.length > 0 && selectedNotifications.length < notifications.length}
                  checked={notifications.length > 0 && selectedNotifications.length === notifications.length}
                  onChange={handleSelectAllClick}
                />
              </th>
              <th>Title</th>
              <th>Subtitle</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((notification) => {
              const isItemSelected = isSelected(notification.id);
              const isRead = readStatus[notification.id];
              return (
                <tr
                  key={notification.id}
                  onClick={(event) => handleClick(event, notification.id)}
                  style={{
                    backgroundColor: isRead ? '#f0f0f0' : 'white',
                    opacity: isRead ? 0.6 : 1,
                  }}
                >
                  <td>
                    <Checkbox checked={isItemSelected} />
                  </td>
                  <td>
                    <Typography>{notification.title}</Typography>
                  </td>
                  <td>
                    <Typography>{notification.subtitle}</Typography>
                  </td>
                  <td>
                    <Typography>{timeAgo(notification.date)}</Typography>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default NotificationTable;
