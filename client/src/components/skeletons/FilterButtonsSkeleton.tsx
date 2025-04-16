import { cn } from '@/lib/utils'

const FilterButtonsSkeleton = () => {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "h-7 w-[70px] rounded-full animate-pulse bg-zinc-800",
          )}
        />
      ))}
    </div>
  )
}

export default FilterButtonsSkeleton