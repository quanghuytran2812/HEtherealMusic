import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2, Terminal, TriangleAlert, XCircle } from "lucide-react";

type VariantType = "default" | "destructive" | "info" | "success" | "warning";

interface NotificationAlertProps {
  message: React.ReactNode;
  title?: string;
  open: boolean;
  variant: VariantType;
}

const NotificationAlert: React.FC<NotificationAlertProps> = ({
  message,
  title,
  open,
  variant
}) => {
  if (!open) return null;

  return (
    <Alert variant={variant}>
      {variant === "default" && <Terminal className="h-4 w-4" />}   
      {variant === "info" && <AlertCircle className="h-4 w-4 mt-[2px]" />}
      {variant === "success" && <CheckCircle2 className="h-4 w-4 mt-[2px]" />}
      {variant === "warning" && <TriangleAlert className="h-4 w-4 mt-[2px]" />}
      {variant === "destructive" && <XCircle className="h-4 w-4 mt-[2px]" />}
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export default NotificationAlert;
