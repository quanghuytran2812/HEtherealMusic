interface EmptyStateProps {
  title: string;
  description: string;
}

const EmptyState = ({ title, description }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="spinner-headphone mb-6">
        <div className="h-20 w-20 bg-[#242424] blur-sm rounded-full"></div>
      </div>
      <h3 className="text-sm font-medium text-white mb-1">{title}</h3>
      <p className="text-xs text-[#b3b3b3]">{description}</p>
    </div>
  );
};

export default EmptyState;
