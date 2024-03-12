import { useNavigate } from 'react-router-dom';
import { supabase } from '../../superbaseClient';
import './index.css'
const Header = () => {
    const navigate= useNavigate();

    const signout= async()=>{
        try {
            const { error } = await supabase.auth.signOut()
            navigate('/');
            window.location.reload();
        } catch (error) {
            alert('sommething went wrong. please try again later')
        }
    }
    return (<header className="Header">
        <h2 style={{color:'white'}}>Meal Planner</h2>

        <button onClick={signout}>
            logout
        </button>
    </header>)
}

export { Header }