const ExploreSkeleton = () => {
  return (
    <div className="grid-list animate-pulse">
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="h-48 w-full rounded-lg bg-[#323633]" />
      ))}
    </div>
  );
};

export default ExploreSkeleton;
