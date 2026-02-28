interface StatsSectionProps {
  averageRating: number;
  totalReviews: number;
  satisfactionPercentage: number;
}

export default function StatsSection({
  averageRating,
  totalReviews,
  satisfactionPercentage
}: StatsSectionProps) {
  return (
    <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div>
          <div className="text-3xl font-bold text-blue-600">
            {averageRating}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Calificación promedio</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-blue-600">{totalReviews}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Reseñas totales</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-blue-600">
            {satisfactionPercentage}%
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Huéspedes satisfechos</div>
        </div>
      </div>
    </div>
  );
}
