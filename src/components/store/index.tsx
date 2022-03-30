import { createContext, useState } from 'react'

export const StoreContext = createContext<any>({})

const StoreProvider = (props: any) => {
  const [toggle, setToggle] = useState(false)
  const [user, setUser] = useState<any>()

  const store = {
    sidebar: { toggle, setToggle },
    employee: { user, setUser }
  }

  return <StoreContext.Provider value={store}>{props.children}</StoreContext.Provider>
}

export default StoreProvider