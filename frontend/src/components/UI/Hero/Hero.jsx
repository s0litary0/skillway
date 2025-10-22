import Button from "../Button/Button";

export default function Hero() {
  return (
    <section className="w-full h-[600px]
      px-[64px] py-[120px]"
    >
      <div
        className="w-[800px] h-[300px] flex flex-col items-center 
        mx-auto"
      >
        <h1 className="text-[64px]/[1.1] font-extrabold text-center">
          Unlock Your Full Potential with SkillWay
        </h1>
        <p
          className="mt-[32px]
          text-[24px]/[1.3] tracking-[-0.03] text-(--text-color-black) text-center"
        >
          Learn smarter, faster, and better through interactive lessons and
          AI-powered guidance.
        </p>
      </div>

      <div className="mt-[48px] flex justify-center gap-[16px]">
        <Button className="bg-black" onClick={() => alert(123)}>
          Start learning
        </Button>
        <Button
          className="border-[2px] border-(--text-color-black) 
        text-black
        bg-white"
          onClick={() => alert(123)}
        >
          Try demo
        </Button>
      </div>
    </section>
  );
}
