export default function ButtonNavbar({ text, url }) {
  return (
    <div>
      <h3 className="text-white hover:text-red-600">
        <button className="text-xl">
          <a href={url}>{text}</a>
        </button>
      </h3>
    </div>
  );
}
