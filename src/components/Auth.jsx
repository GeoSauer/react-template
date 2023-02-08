import { useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { authUser } from '../services/auth';

export default function Auth() {
  const { type } = useParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { user, setUser } = useUser();

  const clickHandler = async () => {
    // call authUser with state
    const userResp = await authUser(email, password, type);
    // set user
    setUser(userResp);
    // reset the inputs
    setEmail('');
    setPassword('');
    // redirect to /whatever
  };

  if (user) {
    return <Redirect to="/whatever" />;
  }

  return (
    <div>
      <div className="form-controls">
        <label>Email:</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="form-controls">
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={clickHandler}>Submit</button>
    </div>
  );
}
