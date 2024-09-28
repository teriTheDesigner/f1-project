export default function GrandPrix() {
  let imageUrl = "/jeddah.jpg";
  return (
    <div>
      <div
        className="w-full h-[38rem] bg-center bg-cover relative"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="h-[38rem] flex relative z-10">
          <div className="m-auto flex flex-col items-center gap-6">
            <h1 className="text-white text-7xl font-extrabold">
              JEDDAH Grand Prix
            </h1>
            <h2 className="text-white text-3xl font-normal">
              Formula 1 Jeddah Grand Prix 2024
            </h2>
            <div className="flex gap-4 text-white mt-16 text-3xl font-extrabold">
              <p>ROUND 18</p>
              <p>|</p>
              <p>20 SEP - 22 SEP</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3>Weekend Schedule</h3>
      </div>
    </div>
  );
}
