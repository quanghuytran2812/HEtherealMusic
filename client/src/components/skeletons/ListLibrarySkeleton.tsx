const ListLibrarySkeleton = () => {
  return Array.from({length: 4}).map((_, i) => (
    <div key={i} className="py-2 px-4 rounded-md flex items-center gap-3 animate-pulse">
        <div className="size-12 bg-zinc-800 rounded-md flex-shrink-0" />
        <div className="flex-1 space-y-2">
            <div className="h-4 bg-zinc-800 rounded w-3/4" />
            <div className="h-3 bg-zinc-800 rounded w-1/2" />
        </div>
    </div>
  ));
};

export default ListLibrarySkeleton