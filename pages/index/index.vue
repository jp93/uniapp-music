<template>
  <view class="container">
    <div class="recommend-list">
      <ul>
        <li
          @click="selectItem(item,index)"
          v-for="(item,index) in discList"
          :key="index"
          class="item"
        >
          <div class="icon">
            <image width="60" height="60" :src="item.imgUrl" />
          </div>
          <div class="text">
            <h2 class="name" v-html="item.data.songname"></h2>
            <p class="desc" v-html="item.data.singer[0].name"></p>
          </div>
        </li>
      </ul>
    </div>
  </view>
</template>

<script>
import { getRecommend, getDiscList } from "@/apis/recommend.js";
import { ERR_OK } from "@/apis/config";
export default {
  components: {},
  data() {
    return {
      discList: []
    };
  },
  onShow() {},
  onLoad() {
    // this._getRecommend()
    this._getDiscList();
    // this.$request.get('https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8%C2%ACice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=27&_=1519963122923').then(e => {
    //   console.log('e')
    // })
  },
  onShareAppMessage(res) {
    return {
      title: "音离",
      imageUrl: "http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/2402284.jpg"
    };
  },

  methods: {
    _getRecommend() {
      getRecommend().then(e => {
        console.log("e", e);
      });
    },
    _getDiscList() {
      getDiscList().then(res => {
        console.log("res", res);
        this.discList = res.songlist.map(e => {
          e.imgUrl = `http://imgcache.qq.com/music/photo/album_300/17/300_albumpic_${e.data.albumid}_0.jpg`;
          return e;
        });
      });
    },
    selectItem() {
      uni.navigateTo({
        url: '/pages/detail/detail'
      });
    }
  },

  onReachBottom() {}
};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/variable';

.recommend-list {
  .list-title {
    height: 65px;
    line-height: 65px;
    text-align: center;
    font-size: $font-size-medium;
    color: $color-theme;
  }

  .item {
    display: flex;
    box-sizing: border-box;
    align-items: center;
    padding: 0 20px 20px 20px;

    .icon {
      flex: 0 0 60px;
      width: 60px;
      padding-right: 20px;

      image {
        width: 60px;
        height: 60px;
      }
    }

    .text {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
      line-height: 20px;
      overflow: hidden;
      font-size: $font-size-medium;

      .name {
        margin-bottom: 10px;
        color: $color-text;
      }

      .desc {
        color: $color-text-d;
      }
    }
  }
}
</style>
