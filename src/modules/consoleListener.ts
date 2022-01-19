import readline from 'readline';

const listener = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

export default () => {
  listener.on('line', input => {
    switch(input) {
      default: break;
    }
  });
}