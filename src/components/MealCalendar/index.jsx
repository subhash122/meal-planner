import { useCallback, useEffect, useRef, useState } from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './index.css'
import { MealModal } from "../MealModal";
import { supabase } from "../../superbaseClient";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { modifiedMeals } from "../../Utils/util";
import { UpdateMealModal } from "../UpdateMealModal";
import { Header } from "../Header";

const MealCalendar = () => {
  const localizer = momentLocalizer(moment);

  const [selectedDate, setSelectedDate] = useState();
  const [modalShow, setCreateModalShow] = useState(false);
  const [userMeals, setUserMeals] = useState([]);
  const [updateModalShow, setUpdateModalShow] = useState(false);
  const [selectedMeal, setselectedMeal] = useState();
  const navigator = useNavigate();
  useEffect(() => {
    async function getSession() {
      const { data, error } = await supabase.auth.getSession();
      if (!data.session) {
        navigator('/login');
        return
      }
      localStorage.setItem('userId', data.session.user.id);
      getMeals();
    }
    getSession();
  }, [])

  const getMeals = async () => {
    let mealsRes = await axios.get(`https://ltqxswwcopgjllxpcfja.supabase.co/functions/v1/meals/${localStorage.getItem('userId')}`);

    let meals = mealsRes.data.meals;
    let newMeals = modifiedMeals(meals)
    setUserMeals(newMeals);
  }
  const onSelecting = useCallback((slotInfo) => {

    setSelectedDate(slotInfo.start.toLocaleDateString());
    setCreateModalShow(true);
  }, [])

  const onSelectEvent = useCallback((calEvent) => {
    console.log(calEvent)
    setUpdateModalShow(true);
    setselectedMeal(calEvent);
  }, [])

  return (
    <>
    <Header></Header>
    <div style={{ height: 500, width: 1000, marginTop: 30 }} >
      <Calendar

        localizer={localizer}
        events={userMeals}
        views={['week']}
        defaultView="week"
        onSelectSlot={onSelecting}
        selectable
        onSelectEvent={onSelectEvent}
        min={new Date()} // Allow selection only from today onwards
        max={new Date(new Date().setDate(new Date().getDate() + 6))}

      />
      {modalShow && <MealModal show={modalShow} onHide={() => setCreateModalShow(false)}
        selectedDate={selectedDate} getMeals={getMeals}></MealModal>}
      {updateModalShow && <UpdateMealModal show={updateModalShow} onHide={() => setUpdateModalShow(false)}
       selectedMeal={selectedMeal} getMeals={getMeals}></UpdateMealModal>}
    </div>
    </>
  )
}

export { MealCalendar }