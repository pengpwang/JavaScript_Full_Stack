const redis = require('redis');

const db = redis.createClient(6379, '127.0.0.1');

db.on('connect', () => console.log(`Redis client connected to server.`));
db.on('ready', () => console.log(`Redis server is ready.`));
db.on('error', (err) => console.error(`Redis error`, err));

db.set('color', 'red', err => {
  if(err) throw err; 
});

db.get('color', (err, val) => {
  if(err) throw err;
  console.log(`color: ${val}`);
});

db.get('noExits', (err, val) => {
  if(err) throw err;
  console.log(`noExits: ${val}`);
});
