import "./Block.css"


export default function Block({ children, className }) {
    return (
        <div className={`block-container ${className}`}>
            { children }
        </div>
    )
}