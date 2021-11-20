import { RichText } from '@tarojs/components'
import { getStyleUnit } from '@util/style'

function Rich(
  {
    className = '', content, float, style = {}
  }
) {
  if (!content) {
    return null
  }
  const regStyle = new RegExp('<img(.+?)style=[^ >]+', 'gi')
  let nodes = content.replace(regStyle, '<img$1')

  const regex = new RegExp('<img', 'gi')
  nodes = nodes && nodes.replace(regex, `<img style="max-width:100%; vertical-align:top; ${float ? 'float:left;' : 'display:block;'}"`)

  return (
    <RichText
      className={`dis-b pre-wrap break-all f-14 ${className}`}
      style={getStyleUnit({ lineHeight: 25, ...style }, ['lineHeight'])}
      nodes={nodes}
    />
  )
}

export default Rich
