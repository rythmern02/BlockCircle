import Link from "next/link";

export default function Hero({
  cursorPos,
}: {
  cursorPos: { x: number; y: number };
}) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="stars" />
        <div className="twinkling" />
      </div>
      <div
        className="magical-orb"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
        }}
      />
      <div className="text-center z-10">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Welcome to ChainPot
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-300">
          Unlock the Magic of Decentralized Finance
        </p>
        <Link href={"/signup"}>
          <button className="px-8 py-3 bg-purple-600 text-white rounded-full text-lg font-semibold hover:bg-purple-700 transition-all duration-300 pulsate-glow">
            Get Started
          </button>
        </Link>
      </div>
    </section>
  );
}
