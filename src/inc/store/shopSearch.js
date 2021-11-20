import { searchInit, useSearch } from './useSearch'

const search = searchInit('shopSearchStore')

export const useShopSearch = () => {
  return useSearch({ search })
}
