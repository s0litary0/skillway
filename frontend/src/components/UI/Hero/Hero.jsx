import Button from "../Button/Button";
// import { useEffect } from "react";


export default function Hero({ children, title, btns }) {

  // useEffect(() => {
  //   fetch('http://localhost:8000/api/accounts/users/')
  //   .then(response => response.json())
  //   .then((users) => {
  //     console.log(users);
  //   })
  //   .catch(error => console.log(error))
  // }, [])

  const handleClick = () => {
    alert("Goes to another page")
  }

  return (
    <section
      className="w-full h-[600px]
      px-[64px] py-[120px] mb-[30px]"
    >
      <div
        className="w-[800px] h-[300px] flex flex-col items-center 
        mx-auto"
      >
        <h1 className="text-[64px]/[1.1] font-extrabold text-center">
          {title}
        </h1>
        <p
          className="mt-[32px]
          text-[24px]/[1.3] tracking-[-0.03] text-(--text-color-black) text-center"
        >
          {children}
        </p>
      </div>

      <div className="mt-[48px] flex justify-center gap-[16px]">
        <Button className="bg-black" onClick={handleClick}>
          {btns.btn1}
        </Button>
        <Button
          className="border-[2px] border-(--text-color-black) 
        text-black
        bg-white"
          onClick={handleClick}
        >
          {btns.btn2}
        </Button>
      </div>
    </section>
  );
}
