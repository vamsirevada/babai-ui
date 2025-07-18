import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef((({ className, children, ...props }, ref) => (
  span]:line-clamp-1",
      className
    )}
    {...props}
  >
    {children}

))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef((({ className, ...props }, ref) => (

))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef((({ className, ...props }, ref) => (

))
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef((({ className, children, position = "popper", ...props }, ref) => ({ children }))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef((({ className, ...props }, ref) => (
  
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef((({ className, children, ...props }, ref) => ({ children }))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef((({ className, ...props }, ref) => (
  
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}