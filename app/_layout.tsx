import Colors from '@/constants/Colors'
import '@/global.css'
import { AuthProvider } from '@/lib/contexts/auth'
import { useColorScheme } from '@/lib/use-color-scheme'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  DarkTheme,
  DefaultTheme,
  type Theme,
  ThemeProvider,
} from '@react-navigation/native'
import { PortalHost } from '@rn-primitives/portal'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Platform } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Toaster } from 'sonner-native'

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: Colors.light,
}
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: Colors.dark,
}

export { ErrorBoundary } from 'expo-router'

export default function RootLayout() {
  const hasMounted = useRef(false)
  const { setColorScheme, isDarkColorScheme } = useColorScheme()
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = useState(false)
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        retry: (failureCount, error) => {
          if (error && typeof error === 'object' && 'status' in error) {
            if (error.status === 401 || error.status === 403) {
              return false
            }
          }
          return failureCount < 3
        },
      },
      mutations: {
        retry: false,
      },
    },
  })

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) {
      return
    }

    async function loadTheme() {
      const themeStorageKey = 'preferred-theme'
      const storedTheme = await AsyncStorage.getItem(themeStorageKey)
      if (
        storedTheme === 'light' ||
        storedTheme === 'dark' ||
        storedTheme === 'system'
      ) {
        setColorScheme(storedTheme)
      }
      setIsColorSchemeLoaded(true)
    }

    if (Platform.OS === 'web') {
      document.documentElement.classList.add('bg-background')
    }

    loadTheme()
    hasMounted.current = true
  }, [setColorScheme])

  if (!isColorSchemeLoaded) {
    return null
  }

  return (
    <GestureHandlerRootView>
      <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
        <SafeAreaProvider>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <BottomSheetModalProvider>
                <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
                <Stack screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="index" />
                  <Stack.Screen name="(auth)" />
                  <Stack.Screen name="(tabs)" />
                </Stack>
                <Toaster
                  position="top-center"
                  theme={isDarkColorScheme ? 'dark' : 'light'}
                  richColors
                />
                <PortalHost />
              </BottomSheetModalProvider>
            </AuthProvider>
          </QueryClientProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  )
}

const useIsomorphicLayoutEffect =
  Platform.OS === 'web' && typeof window === 'undefined'
    ? useEffect
    : useLayoutEffect
