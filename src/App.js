import { useState } from 'react';
import './styles.css';

import { Modal } from './components/Modal/Modal';

function App() {
  const [open, setOpen] = useState(false);
  const handleClose = e => {
    console.log(e);
    setOpen(false);
  };
  const handleOpen = () => setOpen(true);
  return (
    <div className="App">
      <h1>NewDay</h1>
      <h2>Let’s see a modal</h2>
      <button onClick={handleOpen}>Open Modal</button>
      <Modal isOpen={open} onClose={handleClose} title="Example Modal">
        <div>Some Content</div>
      </Modal>
    </div>
  );
}

export default App;
