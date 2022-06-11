import { AtInput } from 'taro-ui'
import { Button, View } from '@tarojs/components'
import BaseView from '@com/BaseView'
import PopSingle from '@com/tabs/PopSingle'
import RegionFilter from '@com/tabs/RegionFilter'
import OneFilter from '@com/tabs/OneFilter'
import UpLoadImage from '@com/upload'
import TitImg from '@com/title/TitImg'
import LeftLine from '@com/title/LeftLine'
import IconNav from '@com/icon/IconNav'
import IconText from '@com/icon/IconText'
import Skeleton from '@com/skeleton'
import Breadcrumb from '@com/breadcrumb'
import Search from '@com/search'
import TabsX from '@com/tabs/TabsX'
import DateTime from '@com/form/DateTime'
import PickerSel from '@com/form/Select'
import CheckBox from '@com/form/CheckBox'
import CheckRadio from '@com/form/CheckRadio'
import { useShopSearch } from '@inc/store/shopSearch'
import { uploadImagesObj } from '@com/upload/util'
import { useInput } from '@inc/use-form'
import Test from './widget/Test'
import './index.scss'

function Index() {
  const type = [{ name: '手机直播', val: 1 }, { name: '推流直播', val: 2 }]
  const { value, other, onChange, onUpdate, onError } = useInput()
  const { filters, onSet, onClear } = useShopSearch()
  const cats = [
    {
      type: 'gcid',
      name: '分类',
      child: [
        {
          name: '新型建材',
          value: '009001001'
        },
        {
          name: '电气',
          value: '015'
        },
        {
          name: '门窗',
          value: '005001'
        },
        {
          name: '地板',
          value: '001001002'
        },
        {
          name: '陶瓷',
          value: '019'
        },
        {
          name: '钢结构',
          value: '003001015'
        },
        {
          name: '灯具',
          value: '006001'
        },
        {
          name: '家具',
          value: '006002'
        },
        {
          name: '涂料',
          value: '002002002'
        },
        {
          name: '厨柜厨具',
          value: '004001'
        },
        {
          name: '幕墙壁纸',
          value: '002001003'
        },
        {
          name: '吊顶',
          value: '003001003'
        },
        {
          name: '采暖',
          value: '007001004'
        },
        {
          name: '家电电器',
          value: '043'
        },
        {
          name: '五金',
          value: '006003002'
        },
        {
          name: '工艺饰品',
          value: '041'
        },
        {
          name: '铁艺',
          value: '018'
        },
        {
          name: '电工电气',
          value: '007001001'
        },
        {
          name: '木业',
          value: '010001'
        },
        {
          name: '作业保护',
          value: '014'
        },
        {
          name: '园艺',
          value: '05'
        },
        {
          name: '油漆',
          value: '002002001'
        },
        {
          name: '家居',
          value: '07'
        },
        {
          name: '电梯',
          value: '007001007'
        },
        {
          name: '机械',
          value: '012001'
        },
        {
          name: '板材',
          value: '010002'
        },
        {
          name: '管材',
          value: '012002'
        },
        {
          name: '酒店用品',
          value: '040'
        },
        {
          name: '洁具',
          value: '004002'
        },
        {
          name: '钢材',
          value: '013001'
        },
        {
          name: '工程机械',
          value: '08'
        },
        {
          name: '防水',
          value: '011001003'
        },
        {
          name: '节能环保',
          value: '03'
        },
        {
          name: '家纺',
          value: '06'
        },
        {
          name: '阀门',
          value: '016001'
        },
        {
          name: '玻璃',
          value: '009001006'
        },
        {
          name: '窗帘',
          value: '005002001'
        },
        {
          name: '楼梯',
          value: '025'
        },
        {
          name: '管件',
          value: '020'
        },
        {
          name: '石材',
          value: '001001003'
        },
        {
          name: '安防',
          value: '007002'
        }
      ]
    },
    {
      type: 'rid',
      name: '地区',
      child: [
        {
          name: '广东',
          value: 263,
          child: [
            {
              name: '深圳',
              value: 265
            },
            {
              name: '佛山',
              value: 276
            },
            {
              name: '广州',
              value: 264
            },
            {
              name: '东莞',
              value: 273
            },
            {
              name: '中山',
              value: 274
            },
            {
              name: '江门',
              value: 275
            },
            {
              name: '惠州',
              value: 271
            },
            {
              name: '潮州',
              value: 282
            },
            {
              name: '珠海',
              value: 266
            },
            {
              name: '肇庆',
              value: 280
            },
            {
              name: '揭阳',
              value: 283
            },
            {
              name: '清远',
              value: 281
            },
            {
              name: '汕头',
              value: 267
            },
            {
              name: '云浮',
              value: 284
            },
            {
              name: '韶关',
              value: 268
            },
            {
              name: '湛江',
              value: 278
            },
            {
              name: '阳江',
              value: 277
            },
            {
              name: '茂名',
              value: 279
            },
            {
              name: '梅州',
              value: 270
            },
            {
              name: '河源',
              value: 269
            },
            {
              name: '汕尾',
              value: 272
            }
          ]
        },
        {
          name: '四川',
          value: 304,
          child: [
            {
              name: '成都',
              value: 305
            },
            {
              name: '绵阳',
              value: 310
            },
            {
              name: '泸州',
              value: 308
            },
            {
              name: '南充',
              value: 315
            },
            {
              name: '西昌',
              value: 325
            },
            {
              name: '达州',
              value: 318
            },
            {
              name: '广元',
              value: 311
            },
            {
              name: '攀枝花',
              value: 307
            },
            {
              name: '内江',
              value: 313
            },
            {
              name: '自贡',
              value: 306
            },
            {
              name: '宜宾',
              value: 316
            },
            {
              name: '乐山',
              value: 314
            },
            {
              name: '德阳',
              value: 309
            },
            {
              name: '眉山',
              value: 321
            },
            {
              name: '广安',
              value: 317
            },
            {
              name: '巴中',
              value: 319
            },
            {
              name: '雅安',
              value: 320
            },
            {
              name: '遂宁',
              value: 312
            },
            {
              name: '资阳',
              value: 322
            },
            {
              name: '甘孜',
              value: 324
            },
            {
              name: '阿坝',
              value: 323
            }
          ]
        },
        {
          name: '山东',
          value: 192,
          child: [
            {
              name: '济南',
              value: 193
            },
            {
              name: '潍坊',
              value: 198
            },
            {
              name: '青岛',
              value: 194
            },
            {
              name: '济宁',
              value: 201
            },
            {
              name: '临沂',
              value: 206
            },
            {
              name: '德州',
              value: 205
            },
            {
              name: '泰安',
              value: 202
            },
            {
              name: '淄博',
              value: 195
            },
            {
              name: '聊城',
              value: 207
            },
            {
              name: '烟台',
              value: 199
            },
            {
              name: '枣庄',
              value: 196
            },
            {
              name: '滨州',
              value: 208
            },
            {
              name: '东营',
              value: 197
            },
            {
              name: '日照',
              value: 203
            },
            {
              name: '菏泽',
              value: 209
            },
            {
              name: '威海',
              value: 200
            },
            {
              name: '莱芜',
              value: 204
            },
            {
              name: '莱州',
              value: 210
            }
          ]
        },
        {
          name: '江苏',
          value: 122,
          child: [
            {
              name: '苏州',
              value: 135
            },
            {
              name: '南京',
              value: 123
            },
            {
              name: '无锡',
              value: 134
            },
            {
              name: '常州',
              value: 133
            },
            {
              name: '徐州',
              value: 124
            },
            {
              name: '泰州',
              value: 130
            },
            {
              name: '扬州',
              value: 129
            },
            {
              name: '盐城',
              value: 128
            },
            {
              name: '南通',
              value: 131
            },
            {
              name: '镇江',
              value: 132
            },
            {
              name: '淮安',
              value: 126
            },
            {
              name: '宿迁',
              value: 127
            },
            {
              name: '连云港',
              value: 125
            },
            {
              name: '宜兴',
              value: 136
            },
            {
              name: '泰兴',
              value: 138
            },
            {
              name: '靖江',
              value: 137
            }
          ]
        },
        {
          name: '河北',
          value: 45,
          child: [
            {
              name: '沧州',
              value: 54
            },
            {
              name: '衡水',
              value: 56
            },
            {
              name: '廊坊',
              value: 55
            },
            {
              name: '石家庄',
              value: 46
            },
            {
              name: '保定',
              value: 51
            },
            {
              name: '邢台',
              value: 50
            },
            {
              name: '邯郸',
              value: 49
            },
            {
              name: '唐山',
              value: 47
            },
            {
              name: '秦皇岛',
              value: 48
            },
            {
              name: '承德',
              value: 53
            },
            {
              name: '张家口',
              value: 52
            },
            {
              name: '晋州',
              value: 57
            }
          ]
        },
        {
          name: '浙江',
          value: 139,
          child: [
            {
              name: '温州',
              value: 142
            },
            {
              name: '杭州',
              value: 140
            },
            {
              name: '宁波',
              value: 141
            },
            {
              name: '金华',
              value: 146
            },
            {
              name: '嘉兴',
              value: 143
            },
            {
              name: '台州',
              value: 149
            },
            {
              name: '绍兴',
              value: 145
            },
            {
              name: '衢州',
              value: 147
            },
            {
              name: '湖州',
              value: 144
            },
            {
              name: '丽水',
              value: 150
            },
            {
              name: '永康',
              value: 151
            },
            {
              name: '舟山',
              value: 148
            }
          ]
        },
        {
          name: '河南',
          value: 211,
          child: [
            {
              name: '郑州',
              value: 212
            },
            {
              name: '新乡',
              value: 218
            },
            {
              name: '洛阳',
              value: 214
            },
            {
              name: '安阳',
              value: 219
            },
            {
              name: '许昌',
              value: 221
            },
            {
              name: '焦作',
              value: 216
            },
            {
              name: '南阳',
              value: 224
            },
            {
              name: '信阳',
              value: 226
            },
            {
              name: '平顶山',
              value: 215
            },
            {
              name: '商丘',
              value: 225
            },
            {
              name: '鹤壁',
              value: 217
            },
            {
              name: '周口',
              value: 227
            },
            {
              name: '驻马店',
              value: 228
            },
            {
              name: '开封',
              value: 213
            },
            {
              name: '漯河',
              value: 222
            },
            {
              name: '濮阳',
              value: 220
            },
            {
              name: '济源',
              value: 229
            },
            {
              name: '三门峡',
              value: 223
            }
          ]
        },
        {
          name: '湖北',
          value: 230,
          child: [
            {
              name: '武汉',
              value: 231
            },
            {
              name: '襄樊',
              value: 233
            },
            {
              name: '宜昌',
              value: 236
            },
            {
              name: '随州',
              value: 242
            },
            {
              name: '黄冈',
              value: 240
            },
            {
              name: '黄石',
              value: 232
            },
            {
              name: '荆州',
              value: 235
            },
            {
              name: '孝感',
              value: 239
            },
            {
              name: '荆门',
              value: 237
            },
            {
              name: '鄂州',
              value: 238
            },
            {
              name: '十堰',
              value: 234
            },
            {
              name: '咸宁',
              value: 241
            },
            {
              name: '恩施',
              value: 243
            },
            {
              name: '潜江',
              value: 246
            },
            {
              name: '仙桃',
              value: 244
            },
            {
              name: '天门',
              value: 245
            }
          ]
        },
        {
          name: '湖南',
          value: 248,
          child: [
            {
              name: '长沙',
              value: 249
            },
            {
              name: '株洲',
              value: 250
            },
            {
              name: '湘潭',
              value: 251
            },
            {
              name: '岳阳',
              value: 254
            },
            {
              name: '衡阳',
              value: 252
            },
            {
              name: '益阳',
              value: 257
            },
            {
              name: '娄底',
              value: 261
            },
            {
              name: '常德',
              value: 255
            },
            {
              name: '邵阳',
              value: 253
            },
            {
              name: '怀化',
              value: 260
            },
            {
              name: '郴州',
              value: 258
            },
            {
              name: '永州',
              value: 259
            },
            {
              name: '湘西',
              value: 262
            },
            {
              name: '张家界',
              value: 256
            }
          ]
        },
        {
          name: '安徽',
          value: 152,
          child: [
            {
              name: '合肥',
              value: 153
            },
            {
              name: '安庆',
              value: 160
            },
            {
              name: '滁州',
              value: 162
            },
            {
              name: '马鞍山',
              value: 157
            },
            {
              name: '宣城',
              value: 168
            },
            {
              name: '芜湖',
              value: 154
            },
            {
              name: '蚌埠',
              value: 155
            },
            {
              name: '淮北',
              value: 158
            },
            {
              name: '黄山',
              value: 161
            },
            {
              name: '六安',
              value: 166
            },
            {
              name: '阜阳',
              value: 163
            },
            {
              name: '铜陵',
              value: 159
            },
            {
              name: '池州',
              value: 169
            },
            {
              name: '宿州',
              value: 164
            },
            {
              name: '淮南',
              value: 156
            },
            {
              name: '亳州',
              value: 167
            },
            {
              name: '巢湖',
              value: 165
            }
          ]
        },
        {
          name: '陕西',
          value: 361,
          child: [
            {
              name: '西安',
              value: 362
            },
            {
              name: '宝鸡',
              value: 364
            },
            {
              name: '咸阳',
              value: 365
            },
            {
              name: '汉中',
              value: 368
            },
            {
              name: '榆林',
              value: 369
            },
            {
              name: '渭南',
              value: 366
            },
            {
              name: '安康',
              value: 370
            },
            {
              name: '商洛',
              value: 371
            },
            {
              name: '铜川',
              value: 363
            },
            {
              name: '延安',
              value: 367
            }
          ]
        },
        {
          name: '江西',
          value: 180,
          child: [
            {
              name: '南昌',
              value: 181
            },
            {
              name: '景德镇',
              value: 182
            },
            {
              name: '赣州',
              value: 187
            },
            {
              name: '九江',
              value: 185
            },
            {
              name: '宜春',
              value: 189
            },
            {
              name: '萍乡',
              value: 183
            },
            {
              name: '吉安',
              value: 188
            },
            {
              name: '上饶',
              value: 191
            },
            {
              name: '抚州',
              value: 190
            },
            {
              name: '新余',
              value: 184
            },
            {
              name: '鹰潭',
              value: 186
            }
          ]
        },
        {
          name: '贵州',
          value: 326,
          child: [
            {
              name: '贵阳',
              value: 327
            },
            {
              name: '遵义',
              value: 329
            },
            {
              name: '安顺',
              value: 330
            },
            {
              name: '铜仁',
              value: 331
            },
            {
              name: '毕节',
              value: 332
            },
            {
              name: '义兴',
              value: 333
            },
            {
              name: '六盘水',
              value: 328
            },
            {
              name: '都匀',
              value: 335
            },
            {
              name: '凯里',
              value: 334
            }
          ]
        },
        {
          name: '福建',
          value: 170,
          child: [
            {
              name: '福州',
              value: 171
            },
            {
              name: '厦门',
              value: 172
            },
            {
              name: '泉州',
              value: 175
            },
            {
              name: '莆田',
              value: 174
            },
            {
              name: '漳州',
              value: 176
            },
            {
              name: '龙岩',
              value: 178
            },
            {
              name: '宁德',
              value: 179
            },
            {
              name: '三明',
              value: 173
            },
            {
              name: '南平',
              value: 177
            }
          ]
        },
        {
          name: '新疆',
          value: 401,
          child: [
            {
              name: '乌鲁木齐',
              value: 402
            },
            {
              name: '奎屯',
              value: 418
            },
            {
              name: '伊宁',
              value: 414
            },
            {
              name: '昌吉',
              value: 412
            },
            {
              name: '石河子',
              value: 404
            },
            {
              name: '克拉玛依',
              value: 403
            },
            {
              name: '阿克苏',
              value: 408
            },
            {
              name: '喀什',
              value: 409
            },
            {
              name: '库尔勒',
              value: 411
            },
            {
              name: '哈密',
              value: 406
            },
            {
              name: '吐鲁番',
              value: 405
            }
          ]
        },
        {
          name: '辽宁',
          value: 83,
          child: [
            {
              name: '沈阳',
              value: 84
            },
            {
              name: '大连',
              value: 85
            },
            {
              name: '鞍山',
              value: 86
            },
            {
              name: '锦州',
              value: 90
            },
            {
              name: '营口',
              value: 92
            },
            {
              name: '丹东',
              value: 89
            },
            {
              name: '葫芦岛',
              value: 91
            },
            {
              name: '铁岭',
              value: 96
            },
            {
              name: '抚顺',
              value: 87
            },
            {
              name: '辽阳',
              value: 95
            },
            {
              name: '阜新',
              value: 94
            },
            {
              name: '盘锦',
              value: 93
            },
            {
              name: '朝阳',
              value: 97
            },
            {
              name: '本溪',
              value: 88
            }
          ]
        },
        {
          name: '广西',
          value: 285,
          child: [
            {
              name: '南宁',
              value: 286
            },
            {
              name: '桂林',
              value: 288
            },
            {
              name: '柳州',
              value: 287
            },
            {
              name: '梧州',
              value: 289
            },
            {
              name: '玉林',
              value: 294
            },
            {
              name: '贵港',
              value: 293
            },
            {
              name: '北海',
              value: 290
            },
            {
              name: '钦州',
              value: 292
            },
            {
              name: '贺州',
              value: 297
            },
            {
              name: '百色',
              value: 298
            },
            {
              name: '河池',
              value: 299
            },
            {
              name: '防城港',
              value: 291
            }
          ]
        },
        {
          name: '山西',
          value: 58,
          child: [
            {
              name: '太原',
              value: 59
            },
            {
              name: '大同',
              value: 60
            },
            {
              name: '运城',
              value: 68
            },
            {
              name: '晋中',
              value: 65
            },
            {
              name: '晋城',
              value: 63
            },
            {
              name: '临汾',
              value: 67
            },
            {
              name: '吕梁',
              value: 69
            },
            {
              name: '长治',
              value: 62
            },
            {
              name: '阳泉',
              value: 61
            },
            {
              name: '忻州',
              value: 66
            },
            {
              name: '朔州',
              value: 64
            }
          ]
        },
        {
          name: '吉林',
          value: 98,
          child: [
            {
              name: '长春',
              value: 99
            },
            {
              name: '白山',
              value: 104
            },
            {
              name: '四平',
              value: 101
            },
            {
              name: '延边',
              value: 107
            },
            {
              name: '白城',
              value: 106
            },
            {
              name: '通化',
              value: 103
            },
            {
              name: '松原',
              value: 105
            },
            {
              name: '辽源',
              value: 102
            }
          ]
        },
        {
          name: '内蒙古',
          value: 70,
          child: [
            {
              name: '包头',
              value: 72
            },
            {
              name: '赤峰',
              value: 74
            },
            {
              name: '呼和浩特',
              value: 71
            },
            {
              name: '鄂尔多斯',
              value: 76
            },
            {
              name: '呼伦贝尔',
              value: 77
            },
            {
              name: '通辽',
              value: 75
            },
            {
              name: '兴安盟',
              value: 82
            },
            {
              name: '锡林郭勒盟',
              value: 79
            },
            {
              name: '巴彦淖尔盟',
              value: 80
            },
            {
              name: '乌兰察布盟',
              value: 78
            },
            {
              name: '阿拉善盟',
              value: 81
            }
          ]
        },
        {
          name: '云南',
          value: 336,
          child: [
            {
              name: '昆明',
              value: 337
            },
            {
              name: '昭通',
              value: 341
            },
            {
              name: '曲靖',
              value: 338
            },
            {
              name: '楚雄',
              value: 348
            },
            {
              name: '大理',
              value: 349
            },
            {
              name: '红河',
              value: 346
            },
            {
              name: '丽江',
              value: 344
            },
            {
              name: '德宏',
              value: 350
            },
            {
              name: '玉溪',
              value: 339
            },
            {
              name: '保山',
              value: 340
            },
            {
              name: '迪庆',
              value: 352
            },
            {
              name: '思茅',
              value: 342
            }
          ]
        },
        {
          name: '甘肃',
          value: 372,
          child: [
            {
              name: '兰州',
              value: 373
            },
            {
              name: '天水',
              value: 376
            },
            {
              name: '白银',
              value: 375
            },
            {
              name: '陇南',
              value: 382
            },
            {
              name: '嘉峪关',
              value: 377
            },
            {
              name: '张掖',
              value: 383
            },
            {
              name: '甘南',
              value: 385
            },
            {
              name: '定西',
              value: 379
            },
            {
              name: '临夏',
              value: 386
            },
            {
              name: '平凉',
              value: 380
            },
            {
              name: '酒泉',
              value: 384
            },
            {
              name: '武威',
              value: 378
            }
          ]
        },
        {
          name: '黑龙江',
          value: 108,
          child: [
            {
              name: '哈尔滨',
              value: 109
            },
            {
              name: '大庆',
              value: 114
            },
            {
              name: '齐齐哈尔',
              value: 110
            },
            {
              name: '牡丹江',
              value: 116
            },
            {
              name: '佳木斯',
              value: 117
            },
            {
              name: '伊春',
              value: 115
            },
            {
              name: '七台河',
              value: 118
            },
            {
              name: '绥化',
              value: 120
            },
            {
              name: '黑河',
              value: 119
            }
          ]
        },
        {
          name: '海南',
          value: 300,
          child: [
            {
              name: '海口',
              value: 301
            },
            {
              name: '三亚',
              value: 302
            },
            {
              name: '其它',
              value: 303
            }
          ]
        },
        {
          name: '宁夏',
          value: 396,
          child: [
            {
              name: '银川',
              value: 397
            },
            {
              name: '石嘴山',
              value: 398
            },
            {
              name: '固原',
              value: 400
            },
            {
              name: '吴忠',
              value: 399
            }
          ]
        },
        {
          name: '青海',
          value: 387,
          child: [
            {
              name: '西宁',
              value: 388
            },
            {
              name: '共和',
              value: 392
            }
          ]
        }
      ]
    }
  ]

  const breadcrumb = [
    { icon: 'at-icon at-icon-settings', text: '首页', onTap: () => console.log(1) },
    { text: '新闻', onTap: () => console.log(2) },
    { icon: 'at-icon at-icon-settings', text: '详情', onTap: () => console.log(3) }
  ]

  const foot = [
    { text: '发现好券', icon: 'at-icon at-icon-settings c-lan', name: 'info' },
    { text: '促销活动', icon: 'at-icon at-icon-settings c-red', name: 'list' },
    { text: '查找产品', icon: 'at-icon at-icon-settings c-lan', name: 'radar' },
    { text: '进入首页', icon: 'at-icon at-icon-settings c-red', name: 'discover' },
    { text: '名片夹', icon: 'at-icon at-icon-settings c-lan', name: 'mine' }
  ]

  const iconText = {
    left: [
      { text: '名片', icon: 'at-icon at-icon-settings', name: 'card', share: { cid: 1 } },
      { text: '动态', icon: 'at-icon at-icon-settings', name: 'trends' },
      { text: '店铺', icon: 'at-icon at-icon-settings', name: 'shop' }
    ],
    right: [
      { text: '建名片回传', bg: 'bg-red', share: { cid: 1 } },
      { text: '我的名片', bg: 'bg-f5' }
    ]
  }

  const tabsx = [{ id: 1, name: 'tab1' }, { id: 2, name: 'tab2' }]
  const onSubmit = async () => {
    // 一种图片
    /*
    const { imgArr, isFail } = await uploadImages(value.img, onUpdate) // count === 1时，传[value.img]
    某张图片上传失败，清空失败的图片
    isFail && onUpdate('img', imgArr)
    */

    // 多种图片
    /* 都是多图
    const { imgRes } = await uploadImagesObj(value, ['img1', 'img2'], onUpdate)
   */

    onError({ phone: 1, start_time: 1, type: 1, sex1: 1, sex2: 1, img1: 1 }, '请输入完整！')
    console.log(111, value, other)

    return
    // 单图+多图上传
    const { imgRes } = await uploadImagesObj(value, [{ key: 'img1', single: true }, { key: 'img2' }], onUpdate)
    console.log('submitData', { ...value, ...imgRes })
  }

  return (
    <BaseView>
      <View className='flex-r'>
        <PopSingle
          isSelected={filters.sort}
          onClick={() => onSet({ type: 'sort', value: 'new' })}
        />
        <RegionFilter
          items={cats[1] && cats[1].child}
          selectItem={filters.rid}
          onChange={item => onSet({ type: 'rid', ...item })}
          onClear={() => onClear('rid')}
        />
        <OneFilter
          hasBorder={false}
          items={cats[0] && cats[0].child}
          selectItem={filters.gcid}
          onChange={item => onSet({ type: 'gcid', ...item })}
          onClear={() => onClear('gcid')}
        />
      </View>
      {/***********************form + UpLoadImage*************************/}

      <View className='diy-form input-error mt-15 pb-1 bg-f'>
        <AtInput
          name='phone'
          required
          title='手机号'
          placeholder='请输入手机号'
          type='number'
          error={Boolean(other.phone)}
          onChange={onChange.phone}
        />
        {other.phone && <View className='error'>请按正确格式填写您的手机号！</View>}

        <CheckRadio
          label='性别'
          required
          error={other.sex1}
          tip={other.sex1 ? '请选择性别!' : ''}
          items={tabsx}
          onChange={ck => value.sex1 = ck}
        />

        <CheckBox
          label='性别'
          required
          error={other.sex2}
          tip={other.sex2 ? '请选择性别!' : ''}
          items={tabsx}
          onChange={ck => value.sex2 = ck}
        />

        <DateTime
          label='开播时间'
          required
          error={other.start_time}
          placeholder='请选择开播时间'
          tip={other.start_time ? '请选择开播时间!' : ''}
          onSure={e => value.start_time = e}
        />

        <PickerSel
          required
          items={type}
          label='直播类型'
          txt={type[0].key}
          error={other.type}
          tip={other.type ? '请选择直播类型!' : ''}
          onChange={e => value.type = e.val}
        />

        <UpLoadImage
          files={[
            'http://rs-demo.jc001.cn/media/597/597/2020/de256631181b524d24cf8151a714ec62.jpg',
            'http://rs-demo.jc001.cn/media/597/597/2020/de256631181b524d24cf8151a714ec62.jpg'
          ]}
          label='上传图片'
          error={other.img1}
          tip={other.img1 ? '请上传图片!' : ''}
          onChange={files => value.img1 = files}
        />

        <UpLoadImage
          required
          files={['http://rs-demo.jc001.cn/media/597/597/2020/de256631181b524d24cf8151a714ec62.jpg']}
          count={1}
          label='上传图片'
          onChange={files => value.img2 = files}
        />

        <Button className='btn-1-sty bg-red' onClick={onSubmit}>上传图片</Button>
      </View>
      {/*************************TabsX***********************/}

      <Test text='TabsX'>
        <TabsX items={tabsx} />
      </Test>

      <Test text='TabsX'>
        <TabsX items={tabsx} isBtn />
      </Test>
      {/**********************Search**************************/}

      <Test text='Search'>
        <Search placeholder='请输入' onConfirm={e => console.log(111, e)} />
      </Test>

      <Test text='Search-不可输入'>
        <Search placeholder='请输入' isText hasBtn={false} />
      </Test>

      <Test text='Search'>
        <Search placeholder='请输入' hasBtn />
      </Test>
      {/*********************新闻详情导航***************************/}

      <Test text='Breadcrumb'>
        <Breadcrumb items={breadcrumb} />
      </Test>

      <Test text='TitImg'>
        <TitImg tit='为您推荐' />
      </Test>

      <Test text='TitImg'>
        <TitImg tit='为您推荐' type='o' />
      </Test>
      {/*********************LeftLine***************************/}

      <Test text='LeftLine'>
        <LeftLine text='为您推荐' />
      </Test>

      <Test text='LeftLine'>
        <LeftLine text='为您推荐' hasMore />
      </Test>
      {/********************IconNav****************************/}

      <Test text='IconNav'>
        <IconNav
          items={foot} bgArr={[1, 2, 3, 4, 4, 3, 2, 1]} bgNum={8}
        />
      </Test>

      <Test text='IconNav'>
        <IconNav items={foot} imgKey='image' />
      </Test>

      <Test text='IconNav'>
        <IconNav type='foot' items={foot} column={5} />
      </Test>

      <Test text='IconText'>
        <IconText leftWidth={100} leftArr={iconText.left} rightArr={iconText.right} active='card' />
      </Test>
      {/**********************骨架屏**************************/}

      <View className='p-13 f-19 bold text-center bg-f'>骨架屏 rows：默认1行</View>

      <View>slider</View>
      <Skeleton type='slider' />

      <View>row - btn</View>
      <Skeleton type='row' />

      <View>row - no btn</View>
      <Skeleton type='row' hasBtn={false} />

      <View>column</View>
      <Skeleton type='column' />

      <View>list</View>
      <Skeleton type='list' />

      <View>list rightList</View>
      <Skeleton type='list' rightList />

      <View>list - leftImg: false</View>
      <Skeleton type='list' leftImg={false} />

      <View>detail</View>
      <Skeleton type='detail' />
    </BaseView>
  )
}

export default Index
