// 创建vue实例
const { createApp } = Vue
const app = createApp({
  data() {
    return {
      heroList: [],
      query:{
        key:'dingwei',
        value:0,
      },
      checked:0
    }
  },
  computed: {
    // 计算属性(将一些复杂的逻辑或者很长表达式封装)
    heroDetail() {
      return (value) => {
        return `https://pvp.qq.com/web201605/herodetail/${value}.shtml`
      }
    },
    heroImage() {
      return (value) => `https://game.gtimg.cn/images/yxzj/img201606/heroimg/${value}/${value}.jpg`
    },
    filterHeros() {
      const { key, value } = this.query // 'pay_type' || 'dingwei'
      if (key === 'pay_type') {
        return this.heroList.filter((item) => item.pay_type === value)
      } else if (key === 'dingwei') {
        if (value === 0) {
          return this.heroList
        }
        return this.heroList.filter((item) => item.hero_type === value || item.hero_type2 === value)
      }
    },
  },
  methods: {
    async getHeroList() {
      // http://project.x-zd.net:3001/apis/herolist
      // 如果有问题, 拆分过程, 打印看
      const { data } = await axios.get(
        'http://project.x-zd.net:3001/apis/herolist'
      )
      this.heroList = data.data
    },
    changeType(key, value) {
      this.query.key = key
      this.query.value = value
      this.checked = value
    },
  },

  // mounted 生命周期函数
  mounted() {
    // 异步请求数据
    this.getHeroList()
  },
  
})
app.mount('#app')
