export default function ButtonNavbar({ text }) {
  return (
    <div>
      <h3 className="text-white hover:text-red-600">
        <button className="text-xl">{text}</button>
      </h3>
    </div>
  );
}
