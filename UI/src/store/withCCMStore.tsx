import type { ComponentType } from 'react'
import CCMStoreProvider from './CCMStoreProvider'

export const withCCMStore = <P extends object>(
  Component: ComponentType<P>
): ComponentType<P> => {
  const WrappedComponent = (props: P) => (
    <CCMStoreProvider>
      <Component {...props} />
    </CCMStoreProvider>
  )

  WrappedComponent.displayName = `WithCCMStore(${Component.displayName || Component.name || 'Component'})`
  return WrappedComponent
}
