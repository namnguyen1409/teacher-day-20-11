export default function PlayButton({ onClick }: { onClick: () => void }) {
  return (
    <div
      className="h-screen w-screen relative flex flex-col items-center justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #ffe3f3 0%, #ffdada 40%, #e0f4ff 100%)",
      }}
    >
      {/* Soft glowing orbs */}
      <div className="absolute w-[500px] h-[500px] bg-pink-300/30 rounded-full blur-[120px] top-[-150px] left-[-150px]" />
      <div className="absolute w-[500px] h-[500px] bg-blue-300/30 rounded-full blur-[140px] bottom-[-200px] right-[-150px]" />

      {/* Floating petal emojis */}
      <div className="absolute text-5xl animate-[float_6s_ease-in-out_infinite]">
        🌸
      </div>
      <div className="absolute text-4xl animate-[float_7s_ease-in-out_infinite_reverse] top-[70%] left-[20%]">
        🌿
      </div>
      <div className="absolute text-4xl animate-[float_5s_ease-in-out_infinite] top-[20%] right-[25%]">
        🌺
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-6xl font-bold text-pink-700 drop-shadow-md text-center px-6 leading-tight animate-fadeIn">
        Chào mừng Ngày Nhà Giáo Việt Nam 💗
      </h1>

      <p className="mt-4 text-lg md:text-xl text-pink-600 opacity-90 animate-fadeInSlow">
        Gửi tặng thầy cô món quà nhỏ đầy yêu thương 🌿
      </p>

      {/* Start button */}
      <button
        onClick={onClick}
        className="mt-10 px-12 py-5 bg-pink-500/80 hover:bg-pink-500 text-white text-2xl font-semibold 
        rounded-3xl shadow-2xl backdrop-blur-md transition-all hover:scale-110 active:scale-95
        animate-fadeInSlow"
      >
        Bắt đầu 🎵
      </button>

      {/* Animations */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-25px); }
          100% { transform: translateY(0px); }
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease forwards;
        }

        .animate-fadeInSlow {
          animation: fadeIn 1.6s ease forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0px); }
        }
      `}</style>
    </div>
  );
}
