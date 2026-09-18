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
  'liudehua-brick': {
    src: 'images/liudehua-brick.jpg',
    alt: '南京城墙博物馆藏刘德華铭文城砖',
    caption: '南京城墙博物馆藏「刘德華」铭文城砖',
  },
}
