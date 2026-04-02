import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ElementType;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "primary";
}

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  variant = "default",
}: StatCardProps) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden",
        variant === "primary" && "bg-primary text-primary-foreground"
      )}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p
              className={cn(
                "text-sm font-medium",
                variant === "primary"
                  ? "text-primary-foreground/80"
                  : "text-muted-foreground"
              )}
            >
              {title}
            </p>
            <p className="mt-2 text-3xl font-bold">{value}</p>
            {description && (
              <p
                className={cn(
                  "mt-1 text-sm",
                  variant === "primary"
                    ? "text-primary-foreground/70"
                    : "text-muted-foreground"
                )}
              >
                {description}
              </p>
            )}
            {trend && (
              <p
                className={cn(
                  "mt-2 text-sm font-medium",
                  trend.isPositive ? "text-green-600" : "text-red-600",
                  variant === "primary" &&
                    (trend.isPositive ? "text-green-300" : "text-red-300")
                )}
              >
                {trend.isPositive ? "+" : "-"}
                {trend.value}% dari bulan lalu
              </p>
            )}
          </div>
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-lg",
              variant === "primary"
                ? "bg-primary-foreground/20 text-primary-foreground"
                : "bg-primary/10 text-primary"
            )}
          >
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
