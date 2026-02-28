interface SectionHeaderProps {
  title: string;
  description?: string;
}

export function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <div className="text-center space-y-2 ">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{title}</h2>
      {description && (
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{description}</p>
      )}
    </div>
  );
}
