#base.scss @mixin使用说明

> 个别设置
>如：@if ($r!=0) {
       border-radius: #{$r}px;
     }
>$r为0，表示没有border-radius属性

#@include用法

@mixin a($w: 100, $f: 30, $c: red)

正确用法：

    1、@include a(200, 40, $c: blue)

    2、@include a(200, $f: 40, $c: blue)

错误用法：

    1、@include a(200, $f: 40, blue)

    2、@include a($w: 200, 40, $c: blue)

总结：

    某个参数使用了键值方式传值的话，之后的参数也必须是键值方式，前面的参数可以不是

---

##text-line
< 文本超出隐藏 >

    $num：行数（默认1行）

##g-shadow
< 阴影：数值不加单位 >

    $radius: 圆角（默认5）

    $shadow: 阴影大小（默认10）

    $opa: 阴影透明度设置（默认.1)

    $bg: 背景色（默认白色）

##pd -- mg
< padding -- margin：数值不加单位，用于控制左右或者上下间距 >

    $size: 间距大小

    $d: 方向（lr: 左右-->默认, tb：上下）

##g-list
< 列表外框样式：数值加单位 >

    $align: flex布局对齐方式（r: 中间对齐，n：顶部对齐）

    $pd: padding（默认四边26px，可以分别设置padding值，例如：30px 26px）

    $mg: margin(默认没有margin)

    $bd: 线条（b：底部->默认，t：顶部，0：无）

    $bg: 背景色（默认：#fff）

##g-logo
< 图片大小设置：数值不加单位，$mg例外 >

    $w：宽度

    $r: 圆角（默认5） 

    $mg: margin（默认20px）,2种用法
    
         1. $d有值：$mg只有一个数值
         
         2. $d为''：$mg可以有多个数值
         （例如：26px 20px, 26px 20px 26px 30px）
 
    $h: 高度（不传与宽度相等）

    $d：margin方向（r：right默认，l：left）

##g-logo-r
< 全圆图片，不用传$r参数，其他设置同g-logo >
