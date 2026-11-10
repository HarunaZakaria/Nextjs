import NavMenu from "./NavMenu";

export default function NavBar() {
  return (
    <div className="flex justify-around items-center p-5 bg-green-600 text-white ">
      <h1 className="hover:text-red-500 text-xl">Diare Primary B</h1>
      <NavMenu />
    </div>
  );
}
