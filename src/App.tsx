import './App.css'

const socket = new WebSocket("ws://localhost:3000/api/v1/ws");

socket.onopen = () => {
  console.log("Connected to server");
  socket.send("Hello from client!");
};

socket.onmessage = (event) => {
  console.log("Message from server:", event.data);
};

function App() {

  return (
    <>
      <h1 className='text-red-800'>Welcome</h1>
      <p>in my website</p>
    </>
  )
}

export default App
