import * as React from "react"
import * as MenubarPrimitive from "@radix-ui/react-menubar"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const MenubarMenu = MenubarPrimitive.Menu

const MenubarGroup = MenubarPrimitive.Group

const MenubarPortal = MenubarPrimitive.Portal

const MenubarSub = MenubarPrimitive.Sub

const MenubarRadioGroup = MenubarPrimitive.RadioGroup

const Menubar = React.forwardRef((({ className, ...props }, ref) => (
  
))
Menubar.displayName = MenubarPrimitive.Root.displayName

const MenubarTrigger = React.forwardRef((({ className, ...props }, ref) => (
  
))
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName

const MenubarSubTrigger = React.forwardRef((({ className, inset, children, ...props }, ref) => ({ children }))
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName

const MenubarSubContent = React.forwardRef((({ className, ...props }, ref) => (
  
))
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName

const MenubarContent = React.forwardRef((
  (
    { className, align = "start", alignOffset = -4, sideOffset = 8, ...props },
    ref
  ) => (

  )
)
MenubarContent.displayName = MenubarPrimitive.Content.displayName

const MenubarItem = React.forwardRef((({ className, inset, ...props }, ref) => (
  
))
MenubarItem.displayName = MenubarPrimitive.Item.displayName

const MenubarCheckboxItem = React.forwardRef((({ className, children, checked, ...props }, ref) => ({ children }))
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName

const MenubarRadioItem = React.forwardRef((({ className, children, ...props }, ref) => ({ children }))
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName

const MenubarLabel = React.forwardRef((({ className, inset, ...props }, ref) => (
  
))
MenubarLabel.displayName = MenubarPrimitive.Label.displayName

const MenubarSeparator = React.forwardRef((({ className, ...props }, ref) => (
  
))
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName

const MenubarShortcut = ({ className,
  ...props
 }) => {
  return (
    
  )
}
MenubarShortcut.displayname = "MenubarShortcut"

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
}