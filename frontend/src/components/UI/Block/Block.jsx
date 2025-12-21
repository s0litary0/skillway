import "./Block.css"


export default function Block({ children, className, onClick }) {
    return (
        <div className={`block-container ${className}`} onClick={onClick}>
            { children }
        </div>
    )
}