/**
 * 雪花
 * @param  {domID} box 容器ID
 * @param {string} src1 雪花图片路径1
 * @param {string} src2 雪花图片路径2
 */
class CreateSnow {
  private snowBox

  private maxLeft

  private maxTop

  private left

  private top

  private angle

  private minAngle

  private maxAngle

  private angleDelta

  private speed

  private ele

  constructor(box: string, src1: string, src2: string) {
    this.snowBox = document.getElementById(box) as HTMLElement // 雪花盒子
    this.maxLeft = this.snowBox.offsetWidth - Math.random() * 5 + 3 // 运动范围L
    this.maxTop = this.snowBox.offsetHeight - Math.random() * 5 + 3 // 运动范围T
    this.left = this.snowBox.offsetWidth * Math.random() // 起始位置L
    this.top = this.snowBox.offsetHeight * Math.random() // 起始位置T
    this.angle = 1.1 + 0.8 * Math.random() // 飘落角度
    this.minAngle = 1.1
    this.maxAngle = 1.9
    this.angleDelta = 0.01 * Math.random()
    this.speed = 1.4 + Math.random() // 下落速度
    this.ele = document.createElement('img')
    const random = Math.floor(Math.random() * 2 + 1)
    random === 1 ? this.createEle(src1) : this.createEle(src2)
  }

  // 生成雪花元素
  createEle(baseSrc: string) {
    const image = new Image()
    image.src = baseSrc
    this.ele.setAttribute('src', baseSrc)
    this.ele.style.position = 'absolute'
    this.ele.style.zIndex = '99'
    this.snowBox.appendChild(this.ele)
    // 设置雪花尺寸
    const img = this.ele
    // 判断IE
    function isIE() {
      const b = document.createElement('b')
      b.innerHTML = '<!--[if lte IE 8]><i></i><![endif]-->'
      return b.getElementsByTagName('i').length === 1
    }
    function imgLoad() {
      const imgW = image.width
      const propW = Math.ceil(imgW * (0.1 + Math.random()))
      img.setAttribute('width', propW.toString())
      // 如果旧IE，设置高度
      if (isIE()) {
        const imgH = image.height
        const propH = Math.ceil(imgH * (0.1 + Math.random()))
        img.setAttribute('height', propH.toString())
      }
    }
    image.onload = imgLoad
  }

  // 雪花运动
  move() {
    if (this.angle < this.minAngle || this.angle > this.maxAngle) {
      this.angleDelta = -this.angleDelta
    }
    this.angle += this.angleDelta
    this.left += this.speed * Math.cos(this.angle * Math.PI)
    this.top -= this.speed * Math.sin(this.angle * Math.PI)
    if (this.left < 0) {
      this.left = this.maxLeft
    } else if (this.left > this.maxLeft) {
      this.left = 0
    }
    // 雪花掉出来后回到顶部
    if (this.top > this.maxTop) {
      this.top = 0
    }
    this.ele.style.left = `${this.left}px`
    this.ele.style.top = `${this.top}px`
  }
}

export default CreateSnow
