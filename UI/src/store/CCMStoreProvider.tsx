import type { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { store } from './store'

interface CCMStoreProviderProps {
  children: ReactNode
}

const CCMStoreProvider = ({ children }: CCMStoreProviderProps) => (
  <Provider store={store}>{children}</Provider>
)

export default CCMStoreProvider
