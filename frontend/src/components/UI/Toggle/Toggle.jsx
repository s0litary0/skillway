import './Toggle.css'

export default function Toggle({className, onToggle}) {

  return (
    <label className={"switch " + className}>
      <input type="checkbox" onChange={onToggle}/>
      <span className="slider round"></span>
    </label>
  )
}