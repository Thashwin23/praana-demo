import React from 'react';
import { Redirect } from 'expo-router';

export default function Index() {
  // In Phase 6, this entry point will route based on authentication status:
  // if (!isAuthenticated) => '/(auth)/welcome'
  // else => '/(tabs)'
  return <Redirect href="/(tabs)" />;
}
