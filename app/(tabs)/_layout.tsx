import { Tabs } from 'expo-router';
import { Home, Search, BarChart2, Users, User } from "lucide-react-native";
import { TranslationProvider } from '../components/TranslationProvider';

export default function TabLayout() {
  return (
    <TranslationProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: 'white',
            borderTopWidth: 1,
            borderTopColor: '#e5e7eb',
            paddingTop: 8,
            paddingBottom: 16,
            height: 70,
          },
          tabBarActiveTintColor: '#8b5cf6',
          tabBarInactiveTintColor: '#6b7280',
          tabBarLabelStyle: {
            fontSize: 12,
            marginTop: 4,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ size, color }) => (
              <Home size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="analyze"
          options={{
            title: 'Analyze',
            tabBarIcon: ({ size, color }) => (
              <Search size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="names"
          options={{
            title: 'Names',
            tabBarIcon: ({ size, color }) => (
              <BarChart2 size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="compatibility"
          options={{
            title: 'Match',
            tabBarIcon: ({ size, color }) => (
              <Users size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            title: 'Account',
            tabBarIcon: ({ size, color }) => (
              <User size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </TranslationProvider>
  );
}