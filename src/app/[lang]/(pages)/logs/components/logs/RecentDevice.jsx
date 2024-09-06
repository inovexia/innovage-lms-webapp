
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState, useEffect } from 'react';


import tableStyles from '@core/styles/table.module.css';


const API_URL = 'https://669806b502f3150fb66fd477.mockapi.io/Products';

const RecentDevice = () => {
  const [deviceData, setDeviceData] = useState([]);
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [sortItems, setSortItems] = useState(null);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setDeviceData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelectedDevices = deviceData.map((device) => device.id);
      setSelectedDevices(newSelectedDevices);
      return;
    }
    setSelectedDevices([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selectedDevices.indexOf(id);
    let newSelectedDevices = [];

    if (selectedIndex === -1) {
      newSelectedDevices = newSelectedDevices.concat(selectedDevices, id);
    } else if (selectedIndex === 0) {
      newSelectedDevices = newSelectedDevices.concat(selectedDevices.slice(1));
    } else if (selectedIndex === selectedDevices.length - 1) {
      newSelectedDevices = newSelectedDevices.concat(selectedDevices.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedDevices = newSelectedDevices.concat(
        selectedDevices.slice(0, selectedIndex),
        selectedDevices.slice(selectedIndex + 1)
      );
    }

    setSelectedDevices(newSelectedDevices);
  };

  const handleDelete = async () => {
    try {

      for (const id of selectedDevices) {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      }


      const remainingDevices = deviceData.filter((device) => !selectedDevices.includes(device.id));
      setDeviceData(remainingDevices);
      setSelectedDevices([]);
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleSortMenuClick = (event) => {
    setSortItems(event.currentTarget);
  };

  const handleSortMenuClose = () => {
    setSortItems(null);
  };

  const handleSort = (order) => {
    let sortedData;
    if (order === 'recent') {
      sortedData = [...deviceData].sort((a, b) => new Date(b.activitytimeline) - new Date(a.activitytimeline));
    } else if (order === 'old') {
      sortedData = [...deviceData].sort((a, b) => new Date(a.activitytimeline) - new Date(b.activitytimeline));
    }
    setDeviceData(sortedData);
    handleSortMenuClose();
  };

  const isSelected = (id) => selectedDevices.indexOf(id) !== -1;

  return (
    <Card>
      <CardHeader
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6">Recent Activities</Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleDelete}
              disabled={selectedDevices.length === 0}
              style={{ marginLeft: 'auto' }}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              onClick={handleSortMenuClick}
              style={{ marginLeft: '10px' }}
            >
              Sort by
            </Button>
            <Menu
              anchorEl={sortItems}
              open={Boolean(sortItems)}
              onClose={handleSortMenuClose}
            >
              <MenuItem onClick={() => handleSort('recent')}>Recent</MenuItem>
              <MenuItem onClick={() => handleSort('old')}>Older</MenuItem>
            </Menu>
          </div>
        }
      />
      <div className="overflow-x-auto">
        <table className={tableStyles.table}>
          <thead>
            <tr>
              <th>
                <Checkbox
                  indeterminate={selectedDevices.length > 0 && selectedDevices.length < deviceData.length}
                  checked={deviceData.length > 0 && selectedDevices.length === deviceData.length}
                  onChange={handleSelectAllClick}
                />
              </th>
              <th>User</th>
              <th>Device</th>
              <th>Location</th>
              <th>Activity Timeline</th>
              <th>Activity</th>
            </tr>
          </thead>
          <tbody>
            {deviceData.map((device, index) => {
              const isItemSelected = isSelected(device.id);
              return (
                <tr key={index} onClick={(event) => handleClick(event, device.id)}>
                  <td>
                    <Checkbox checked={isItemSelected} />
                  </td>
                  <td>
                    <Typography>{device.user}</Typography>
                  </td>
                  <td>
                    <Typography>{device.device}</Typography>
                  </td>

                  <td>
                    <Typography>{device.location}</Typography>
                  </td>
                  <td>
                    <Typography>{new Date(device.activitytimeline).toLocaleString()}</Typography>
                  </td>
                  <td>
                    <Typography>{device.activity}</Typography>
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

export default RecentDevice;
