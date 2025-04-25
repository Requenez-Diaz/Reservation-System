import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';
import type { Promotion } from '@/types';

interface PromotionDetailsProps {
  promotion: Promotion | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PromotionDetails({
  promotion,
  open,
  onOpenChange
}: PromotionDetailsProps) {
  if (!promotion) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Promoción: {promotion.codePromotions}
            <Badge variant="outline" className="ml-2 bg-red-100 text-red-800">
              {promotion.porcentageDescuent}% OFF
            </Badge>
          </DialogTitle>
          <DialogDescription>
            Válida desde {formatDate(promotion.dateStart)} hasta{' '}
            {formatDate(promotion.dateEnd)}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {promotion.description && (
            <div>
              <h4 className="text-sm font-medium mb-1">Descripción</h4>
              <p className="text-sm text-muted-foreground">
                {promotion.description}
              </p>
            </div>
          )}

          <div>
            <h4 className="text-sm font-medium mb-1">Temporada</h4>
            <p className="text-sm text-muted-foreground">
              {promotion.Seasons?.nameSeason || 'Todas las temporadas'}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-1">
              Habitaciones aplicables
            </h4>
            <div className="flex flex-wrap gap-2">
              {promotion.BedroomsPromotions?.map((bp) => (
                <Badge key={bp.id} variant="outline">
                  {bp.Bedrooms?.typeBedroom || 'Habitación'}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
