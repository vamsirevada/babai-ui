import { GripVertical } from "lucide-react"
import * as React-resizable-panels from "react-resizable-panels"

import { cn } from "@/lib/utils"

const ResizablePanelGroup = ({ className,
  ...props
 }) => (
  
)

const ResizablePanel = ResizablePrimitive.Panel

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps & {
  withHandle?}) => (
  div]:rotate-90",
      className
    )}
    {...props}
  >
    {withHandle && (

    )}
  
)

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }