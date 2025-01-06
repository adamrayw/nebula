import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/pages/core/components/design-system/ui/alert";
import { AlertCircle } from "lucide-react";

const AlertError = ({ error }: { error: unknown }) => {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Oops!</AlertTitle>
      <AlertDescription>
        {Array.isArray(error) && error.length > 0 ? (
          <>
            {error.map((err: { message: string }, index: number) => (
              <li key={index}>
                <span>{err.message}</span>
              </li>
            ))}
          </>
        ) : (
          <span>
            {typeof error === "string" ? error : "An unknown error occurred."}
          </span>
        )}
      </AlertDescription>
    </Alert>
  );
};

export default AlertError;
