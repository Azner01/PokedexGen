export default function ArrowInfo({ trigger, text, additional }) {
  // console.log(text);
  return (
    <div className="flex items-center justify-center">
      <div className="absolute z-10 p-10 text-[12px] font-medium text-white">
        {additional ? (
          <div className="grid">
            <h4 className="font-bold"> {trigger}: </h4>
            <h4> {text}</h4>
          </div>
        ) : (
          <div className="grid">
            <h4> {trigger}</h4>
          </div>
        )}
        {/* <h4 className="font-bold"> {trigger}: </h4>
        <h4> {text}</h4> */}
      </div>
      <img className="h-40 w-36" src="/ArrowRight.png" alt="" />
    </div>
  );
}
