export interface ExhibitImage {
  src: string
  alt: string
  caption: string
}

// Paths are relative to public/; BASE_URL is applied by the viewer.
export const exhibitImages: Record<string, ExhibitImage> = {
  'brick-display': {
    src: 'images/brick-display.jpg',
    alt: '南京城墙博物馆展厅中的城砖陈列',
    caption: '南京城墙博物馆展厅城砖陈列（局部）',
  },
  'brick-production': {
    src: 'images/brick-production.jpg',
    alt: '南京城墙博物馆「城砖制作 / Production of Bricks」展板',
    caption: '南京城墙博物馆「城砖制作 / Production of Bricks」展板（南京城墙博物馆实地调研拍摄，2026）',
  },
  'inscribed-brick': {
    src: 'images/inscribed-brick.jpg',
    alt: '南京城墙博物馆展出的铭文城砖砖面特写',
    caption: '南京城墙博物馆铭文城砖砖面特写（南京城墙博物馆实地调研拍摄，2026）',
  },
  'imperial-city': {
    src: 'images/imperial-city.jpg',
    alt: '南京城墙博物馆「皇城 / 宫城」展陈',
    caption: '南京城墙博物馆「皇城 / 宫城」展陈（南京城墙博物馆实地调研拍摄，2026）',
  },
  'zhengyang-gate': {
    src: 'images/zhengyang-gate.jpg',
    alt: '南京城墙博物馆「正阳门（光华门）」展板',
    caption: '南京城墙博物馆「正阳门（光华门）」展板（南京城墙博物馆实地调研拍摄，2026）',
  },
  'gate-modern-changes': {
    src: 'images/gate-modern-changes.jpg',
    alt: '南京城墙博物馆武定门、雨花门、中华东门近现代变迁展板',
    caption: '武定门、雨花门、中华东门近现代变迁展板（南京城墙博物馆实地调研拍摄，2026）',
  },
  'liudehua-brick': {
    src: 'images/liudehua-brick.jpg',
    alt: '南京城墙博物馆藏刘德華铭文城砖',
    caption: '南京城墙博物馆藏「刘德華」铭文城砖',
  },
}
