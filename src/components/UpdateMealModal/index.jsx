import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

const UpdateMealModal = (props) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const updateMeal = async () => {
        if (!name) {
            alert('name is required ');
            return
        }
        try {
            let res = await axios.put('https://ltqxswwcopgjllxpcfja.supabase.co/functions/v1/meals/', {
                name, description, imageUrl, mealid: props.selectedMeal.mealid
            })
            alert('meal updated ');
            props.getMeals()
            props.onHide();
        } catch (error) {
            alert(error)
        }


    }
    const deleteMeal = async () => {
        try {
            let res = await axios.delete('https://ltqxswwcopgjllxpcfja.supabase.co/functions/v1/meals/', {
                mealid: props.selectedMeal.mealid
            })
            alert('meal deleted ');
            props.getMeals()
            props.onHide();
        } catch (error) {
            alert(error)
        }


    }
    useEffect(() => {
        setName(props.selectedMeal.title);
        setDescription(props.selectedMeal.description);
        setImageUrl(props.selectedMeal.imageUrl)
    }, [])
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Modify the meal
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
                <Button onClick={updateMeal}>Update</Button>
                <Button onClick={deleteMeal}>Delete</Button>
            </Modal.Footer>
        </Modal>
    );
}

export { UpdateMealModal }