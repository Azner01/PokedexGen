export default function ImageChart({ text, image }) {
  return (
    <div className="grid items-center text-center">
      <img className="w-48 h-48" src={image} alt="" />
      <h4 className="text-xl">{text}</h4>
    </div>
  );
}
