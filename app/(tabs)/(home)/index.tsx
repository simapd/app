import { usePullToRefresh } from '@/lib/hooks/use-pull-to-refresh'
import { useRouter } from 'expo-router'
import { RefreshControl, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CreateReportButton } from './components/create-report-button'
import { RecentReports } from './components/recent-reports'
import { RiskAlert } from './components/risk-alert'
import { RiskAreaHeader } from './components/risk-area-header'
import { RiskStats } from './components/risk-stats'

export default function Home() {
  const router = useRouter()

  const { isRefreshing, onRefresh } = usePullToRefresh([
    ['userReports'],
    ['measurements'],
  ])

  const handleCreateReport = () => {
    router.push('./create-report')
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          gap: 24,
          paddingHorizontal: 24,
          paddingVertical: 16,
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <RiskAreaHeader />
        
        <RiskAlert />
        
        <RiskStats />
        
        <RecentReports />
        
        <CreateReportButton onPress={handleCreateReport} />
      </ScrollView>
    </SafeAreaView>
  )
}
