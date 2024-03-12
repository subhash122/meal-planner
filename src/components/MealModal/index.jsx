import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

const MealModal = (props) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const createMeal = async () => {
        if (!name) {
            alert('name is required ');
            return
        }
        let date = props.selectedDate;
        try {
            let res = await axios.post('https://ltqxswwcopgjllxpcfja.supabase.co/functions/v1/meals/', {
                name, description, imageUrl, date, userid: localStorage.getItem('userId')
            })
            alert('meal successfully created');
            props.getMeals()
            props.onHide()
        } catch (error) {
            alert(error)
        }


    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Create New Meal for {props.selectedDate}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input value={name} onChange={(e) => setName(e.target.value)}></input>
                <p>Name</p>
                <input value={description} onChange={(e) => setDescription(e.target.value)}></input>
                <p>Description</p>
                <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}></input>
                <p>ImageUrl</p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={createMeal}>Create</Button>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export { MealModal }