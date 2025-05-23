import { useNavigate } from 'react-router-dom';
import EventForm from '../components/eventform';
import { addEvent } from '../utils/CRUDevents';
import Header from '../components/header';

export default function CreateEvent() {
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    await addEvent(data);  {/* <-- make sure to actually make this function later lol */}
    navigate('/calendar');
  };

  return (
    <>
      <Header/>
      <div style={{ padding: '2rem',  marginTop: '8rem' }}>
      <h2>Create New Event</h2>
        <EventForm onSubmit={handleCreate} />
      </div>
    </>
    
  );
}