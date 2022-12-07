const tagMap: { [key: string]: string } = {
  diary: '日記',
  poem: 'ポエム',
  made: '作ったもの',
  house: '家',

  game: 'ゲーム',
  anime: 'アニメ',
  book: '読書',
  vr: 'VR',
  pc: 'PC',

  unity: 'Unity',
  ue: 'Unreal Engine',
  javascript: 'JavaScript',
  css: 'CSS',
  ruby: 'Ruby',
  infra: 'インフラ',
  design: 'デザイン',

  'web-components': 'Web Components',

  splatoon: 'スプラトゥーン',
}

export const getTagLabel = (key: string) => {
  const label = tagMap[key] || ''
  return label
}
