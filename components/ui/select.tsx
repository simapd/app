import Colors from '@/constants/Colors'
import { useColorScheme } from '@/lib/use-color-scheme'
import { cn } from '@/utils/utils'
import * as SelectPrimitive from '@rn-primitives/select'
import {
  Check,
  ChevronDown,
  ChevronDownIcon,
  ChevronUp,
} from 'lucide-react-native'
import type * as React from 'react'
import { Platform, ScrollView, StyleSheet, View } from 'react-native'
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'

type Option = SelectPrimitive.Option

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

function SelectTrigger({
  ref,
  className,
  children,
  ...props
}: SelectPrimitive.TriggerProps & {
  ref?: React.RefObject<SelectPrimitive.TriggerRef>
  children?: React.ReactNode
}) {
  const { colorScheme } = useColorScheme()
  const { open } = SelectPrimitive.useRootContext()

  const animatedIconStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: withTiming(open ? '180deg' : '0deg', { duration: 250 }),
        },
      ],
    }
  })

  return (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(
        'group flex flex-row h-10 native:h-12 items-center text-sm justify-between rounded-xl border border-input bg-background px-3 py-2 web:ring-offset-background web:focus:outline-none web:focus:ring-2 web:focus:ring-ring web:focus:ring-offset-2 [&>span]:line-clamp-1',
        props.disabled && 'web:cursor-not-allowed opacity-50',
        className
      )}
      {...props}
    >
      {children}
      <Animated.View style={animatedIconStyle}>
        <ChevronDownIcon
          size={16}
          aria-hidden={true}
          color={Colors[colorScheme].popoverForeground}
          className="opacity-50"
        />
      </Animated.View>
    </SelectPrimitive.Trigger>
  )
}

/**
 * Platform: WEB ONLY
 */
function SelectScrollUpButton({
  className,
  ...props
}: SelectPrimitive.ScrollUpButtonProps) {
  if (Platform.OS !== 'web') {
    return null
  }

  const { colorScheme } = useColorScheme()

  return (
    <SelectPrimitive.ScrollUpButton
      className={cn(
        'flex web:cursor-default items-center justify-center py-1',
        className
      )}
      {...props}
    >
      <ChevronUp size={14} color={Colors[colorScheme].popoverForeground} />
    </SelectPrimitive.ScrollUpButton>
  )
}

/**
 * Platform: WEB ONLY
 */
function SelectScrollDownButton({
  className,
  ...props
}: SelectPrimitive.ScrollDownButtonProps) {
  if (Platform.OS !== 'web') {
    return null
  }

  const { colorScheme } = useColorScheme()

  return (
    <SelectPrimitive.ScrollDownButton
      className={cn(
        'flex web:cursor-default items-center justify-center py-1',
        className
      )}
      {...props}
    >
      <ChevronDown size={14} color={Colors[colorScheme].popoverForeground} />
    </SelectPrimitive.ScrollDownButton>
  )
}

function SelectContent({
  className,
  children,
  position = 'popper',
  portalHost,
  ...props
}: SelectPrimitive.ContentProps & {
  ref?: React.RefObject<SelectPrimitive.ContentRef>
  className?: string
  portalHost?: string
}) {
  const { open } = SelectPrimitive.useRootContext()

  return (
    <SelectPrimitive.Portal hostName={portalHost}>
      <SelectPrimitive.Overlay
        style={Platform.OS !== 'web' ? StyleSheet.absoluteFill : undefined}
      >
        <Animated.View className="z-50" entering={FadeIn} exiting={FadeOut}>
          <SafeAreaView className="bg-background px-6 flex-1 justify-center">
            <SelectPrimitive.Content
              className={cn(
                'relative z-50 max-h-80 w-full rounded-xl border border-border bg-popover shadow-md mt-1 py-2 px-1 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
                position === 'popper' &&
                  'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
                open
                  ? 'web:zoom-in-95 web:animate-in web:fade-in-0'
                  : 'web:zoom-out-95 web:animate-out web:fade-out-0',
                className
              )}
              position={position}
              {...props}
            >
              <SelectScrollUpButton />
              <ScrollView
                className="max-h-72"
                showsVerticalScrollIndicator={false}
                bounces={false}
              >
                <SelectPrimitive.Viewport
                  className={cn(
                    'p-1',
                    position === 'popper' &&
                      'w-full min-w-[var(--radix-select-trigger-width)]'
                  )}
                >
                  {children}
                </SelectPrimitive.Viewport>
              </ScrollView>
              <SelectScrollDownButton />
            </SelectPrimitive.Content>
          </SafeAreaView>
        </Animated.View>
      </SelectPrimitive.Overlay>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: SelectPrimitive.LabelProps & {
  ref?: React.RefObject<SelectPrimitive.LabelRef>
}) {
  return (
    <SelectPrimitive.Label
      className={cn(
        'py-1.5 native:pb-2 pl-8 native:pl-10 pr-2 text-popover-foreground text-sm native:text-base font-semibold',
        className
      )}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: SelectPrimitive.ItemProps & {
  ref?: React.RefObject<SelectPrimitive.ItemRef>
}) {
  const { colorScheme } = useColorScheme()

  return (
    <SelectPrimitive.Item
      className={cn(
        'relative web:group flex flex-row w-full web:cursor-default web:select-none items-center rounded-sm py-1.5 native:py-2 px-4 pr-2 web:hover:bg-accent/50 active:bg-accent web:outline-none web:focus:bg-accent',
        props.disabled && 'web:pointer-events-none opacity-50',
        className
      )}
      {...props}
    >
      <View className="absolute right-3.5 flex h-3.5 native:pt-px w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check
            size={16}
            strokeWidth={3}
            color={Colors[colorScheme].popoverForeground}
            className="text-popover-foreground"
          />
        </SelectPrimitive.ItemIndicator>
      </View>
      <SelectPrimitive.ItemText className="text-sm native:text-lg text-popover-foreground native:text-base web:group-focus:text-accent-foreground" />
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: SelectPrimitive.SeparatorProps & {
  ref?: React.RefObject<SelectPrimitive.SeparatorRef>
}) {
  return (
    <SelectPrimitive.Separator
      className={cn('-mx-1 my-1 h-px bg-muted', className)}
      {...props}
    />
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  type Option,
}
