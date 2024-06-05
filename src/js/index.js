// 创建vue实例
const { createApp } = Vue
const app = createApp({
  data() {
    return {
      heroList: [],
      query: {
        key: 'dingwei',
        value: 0,
      },
      checked: 0,
      keyword: '',
      typeList: {
        zonghe: [
          { name: '本周免费', value: 10 },
          { name: '新手推荐', value: 11 },
        ],
        dingwei: [
          { name: '全部', value: 0 },
          { name: '坦克', value: 3 },
          { name: '战士', value: 1 },
          { name: '法师', value: 2 },
          { name: '刺客', value: 4 },
          { name: '射手', value: 5 },
          { name: '辅助', value: 6 },
        ],
      },
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
      return (value) =>
        `https://game.gtimg.cn/images/yxzj/img201606/heroimg/${value}/${value}.jpg`
    },
    filterHeros() {
      const { key, value } = this.query // 'pay_type' || 'dingwei'
      const keyword = this.keyword
      if (keyword === '') {
        // const res = this.heroList.filter(item=>item.cname.inlcudes(this.keyword))
        if (key === 'pay_type') {
          return this.heroList.filter((item) => item.pay_type === value)
        } else if (key === 'dingwei') {
          if (value === 0) {
            return this.heroList
          }
          return this.heroList.filter(
            (item) => item.hero_type === value || item.hero_type2 === value
          )
        }
      } else {
        
        let res = this.heroList.filter((item) => item.cname.includes(keyword))
        res = _.cloneDeep(res)
        return res.map(item => {
          item.cname = item.cname.replace(keyword,`<span style="color:red">${keyword}</span>`)
          return item
        })
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
      this.keyword = ''
    },
    changeKeyword(event) {
      this.keyword = event.target.value
      //重置chekcked为0
      this.checked = 0
    },
  },

  // mounted 生命周期函数
  mounted() {
    // 异步请求数据
    this.getHeroList()
  },
})
app.mount('#app')
