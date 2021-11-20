import { useState } from 'react'
import PopFilter from './PopFilter'
import FilterSecond from './FilterSecond'

function SecondFilter(
  {
    placeholder, selectOne, selectTwo,
    nameKey, nameKeyTwo, hasBorder, onClear,
    items, idKey, itemIsSwap, initId, ids, onChange
  }
) {
  const [show, setShow] = useState(false)
  
  return (
    <PopFilter
      placeholder={placeholder}
      nameKey={nameKey}
      nameKeyTwo={nameKeyTwo}
      itemIsSwap={selectTwo ? itemIsSwap : false}
      hasBorder={hasBorder}
      show={show}
      onShow={setShow}
      selectItem={selectTwo || selectOne}
      onClear={onClear}
    >
      <FilterSecond
        placeholder={placeholder}
        items={items}
        idKey={idKey}
        nameKey={nameKey}
        nameKeyTwo={nameKeyTwo}
        itemIsSwap={itemIsSwap}
        initId={initId}
        selectOne={selectOne}
        selectTwo={selectTwo}
        ids={ids}
        onChange={(item, other) => {
          setShow(false)
          onChange(item, other)
        }}
      />
    </PopFilter>
  )
}

export default SecondFilter
