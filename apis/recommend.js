import { commonParams,options } from './config'
import { Request } from '@/utils/request'
export function getRecommend () {
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
    const data =  Object.assign({},commonParams,{
        platform: 'h5',
        uin: 0,
        needNewCode: 1
    })
    return Request.get(url,data)
    //https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8%C2%ACice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=27&_=1519963122923
}
export function getDiscList() {
    const url ='https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?uin=0&notice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=27'

  
    // const data = Object.assign({}, commonParams, {
    //     platform: 'yqq',
    //     hostUin: 0,
    //     sin: 0,
    //     ein: 29,
    //     sortId: 5,
    //     needNewCode: 0,
    //     categoryId: 10000000,
    //     rnd: Math.random(),
    //     format: 'json'
    // })
    return Request.get(url)

  }