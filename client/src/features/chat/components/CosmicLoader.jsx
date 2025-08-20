// /src/features/chat/components/CosmicLoader.jsx
const CosmicLoader = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="relative w-12 h-12">
        <div className="absolute w-3 h-3 bg-yellow-400 rounded-full animate-bounce"></div>
        <div className="absolute w-3 h-3 bg-blue-400 rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default CosmicLoader;
