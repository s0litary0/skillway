import "./Card.css"
import Block from "../Block/Block"
import { useNavigate } from "react-router-dom"


export default function Card({ item, className }) {
    const navigate = useNavigate()
    return (
        <Block className={`card-container ${className}`} onClick={() => navigate(`/courses/${item.id}/enroll`)}>
            <img src={item.image_url} alt="Course image" />
            <div className="course-info">
                <h2> {item.name} </h2>
                <p>Difficulty: {item.difficulty_level} </p>
                <p>Category: {item.category} </p>
            </div>
            <p className="course-description"> {item.description.slice(0, 100) + "..."} </p>
        </Block>
    )
}