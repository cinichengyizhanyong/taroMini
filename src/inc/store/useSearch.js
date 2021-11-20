import { Store } from 'laco'
import { useEffect, useRef, useState } from 'react'
import { makeStore } from '@util'

const setStory = stores => {
  return val => {
    stores.set(() => {
      return val
    })
  }
}

const setSearch = (stores, clearKey) => {
  const key = clearKey || 'sort'
  return (filterItem, isReset, other) => {
    stores.set((state) => {
      if (isReset || !filterItem) {
        state.filter = filterItem ? { [filterItem.type]: filterItem } : {}
      } else {
        state.filter[filterItem.type] = filterItem
        if (filterItem.type !== key) {
          delete state.filter[key]
        }
      }
      return { filter: { ...state.filter }, isEmpty: Object.keys(state.filter).length === 0, ...other }
    })
  }
}

const clearSearch = (stores) => {
  return (type, other) => {
    stores.set((state) => {
      if (type === 'all') {
        for (let key in state) {
          delete state[key]
        }
        return { filter: {}, isEmpty: true }
      }
      
      const filter = state.filter
      delete filter[type]
      other && other.forEach(item => {
        delete state[item]
      })
      return { filter: { ...filter }, isEmpty: Object.keys(filter).length === 0 }
    })
  }
}

export const searchInit = (searchKey, clearKey, initFilter = {}) => {
  const stores = new Store({
    filter: initFilter,
    isEmpty: Object.keys(initFilter).length === 0
  }, searchKey)
  
  return {
    stores,
    searchStore: makeStore(stores),
    setStory: setStory(stores),
    onSet: setSearch(stores, clearKey),
    onClear: clearSearch(stores)
  }
}

export const useSearch = ({ search, initArgs = { nums: 10 }, deps = true, itemKey }) => {
  const isReq = useRef(false)
  const [args, setArgs] = useState({})
  const stores = search.searchStore()
  const { filter, isEmpty } = stores
  
  useEffect(() => {
    if (!deps) {
      return
    }
    const apiArgs = initArgs
    for (let key in filter) {
      const item = filter[key]
      apiArgs[item.type] = item[itemKey || 'value']
    }
    setArgs(apiArgs)
    isReq.current = true
  }, [filter, deps])
  
  return {
    stores,
    args,
    filters: filter,
    isReq: isReq.current,
    isEmpty,
    setStory: search.setStory,
    onSet: search.onSet,
    onClear: search.onClear
  }
}
