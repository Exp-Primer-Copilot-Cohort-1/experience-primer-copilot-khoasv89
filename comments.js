// Create web server

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create event handler
app.post('/events', async (req, res) => {
  // Get data from event
  const { type, data } = req.body;

  // Check event type
  if (type === 'CommentCreated') {
    // If comment contains 'orange' then set status to 'rejected'
    const status = data.content.includes('orange') ? 'rejected' : 'approved';
    // Send event to event bus
    await axios.post('http://localhost:4005/events', {
      type: 'CommentModerated',
      data: {
        ...data,
        status,
      },
    });
  }

  // Send response
  res.send({});
});

// Start server
app.listen(4003, () => {
  console.log('Listening on 4003');
});