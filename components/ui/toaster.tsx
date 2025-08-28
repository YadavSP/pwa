// FILE: components/ui/toaster.tsx

"use client"

import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { CheckCircle2, AlertTriangle, Info } from "lucide-react";

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        return (
          <Toast key={id} {...props} variant={variant}>
            <div className="flex items-start gap-3">
              {/* --- UPDATED ICON COLORS TO BE WHITE --- */}
              {variant === "success" && <CheckCircle2 className="h-6 w-6 text-white mt-0.5" />}
              {variant === "destructive" && <AlertTriangle className="h-6 w-6 text-white mt-0.5" />}
              {variant === "default" && <Info className="h-6 w-6 text-white mt-0.5" />}

              <div className="grid gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      
      <ToastViewport />
    </ToastProvider>
  )
}