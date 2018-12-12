
const ws = new WebSocket('ws://localhost:3010');

// event emmited when connected
ws.onopen = () => {
  console.log('websocket is connected ...');
  // sending a send event to websocket server
  ws.send('connected');
};
// event emmited when receiving message
ws.onmessage = (ev) => {
  console.log('message', ev);
};
ws.onerror = (event) => {
  console.error('WebSocket error observed:', event);
};
ws.onclose = (event) => {
  console.log('WebSocket is closed now.');
};
