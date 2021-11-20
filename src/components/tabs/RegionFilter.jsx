import { useState } from 'react'
import FilterArea from './FilterArea'
import PopFilter from './PopFilter'

function RegionFilter(
  {
    placeholder = '地区', items = [], selectItem = null,
    onChange = () => {
    },
    onClear = () => {
    }
  }
) {
  const [show, setShow] = useState(false)
  
  return (
    <PopFilter
      placeholder={placeholder}
      show={show}
      onShow={setShow}
      selectItem={selectItem}
      onClear={onClear}
    >
      <FilterArea
        items={items}
        onChange={item => {
          setShow(false)
          item ? onChange(item) : onClear()
        }}
      />
    </PopFilter>
  )
}

export default RegionFilter
