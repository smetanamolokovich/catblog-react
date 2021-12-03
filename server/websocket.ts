import ws from 'ws';

const wss = new ws.Server(
    {
        port: 5000,
    },
    () => {
        console.log('WS server started');
    }
);
