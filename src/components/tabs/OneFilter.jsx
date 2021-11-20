import { useState } from 'react'
import PopFilter from './PopFilter'
import FilterOne from './FilterOne'

function OneFilter(
  {
    placeholder, selectItem,
    nameKey, hasBorder, onClear,
    items, idKey, initId, ids, onChange
  }
) {
  const [show, setShow] = useState(false)

  return (
    <PopFilter
      placeholder={placeholder}
      nameKey={nameKey}
      hasBorder={hasBorder}
      show={show}
      onShow={setShow}
      selectItem={selectItem}
      onClear={onClear}
    >
      <FilterOne
        placeholder={placeholder}
        items={items}
        idKey={idKey}
        selectItem={selectItem}
        initId={initId}
        ids={ids}
        onChange={(item) => {
          setShow(false)
          onChange(item)
        }}
      />
    </PopFilter>
  )
}

export default OneFilter
