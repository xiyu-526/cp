//共享状态 
export function useCount() {
  const count = useState('count', () => Math.round(Math.random() * 20))

  const linkIndex = useState('linkIndex', () => 0)

  const links = useState('links', () => 'https://yszt.ztgame.com/index.shtml')

  const listIndex = useState('listIndex', () => [])

  function inc() {
    count.value += 1
  }

  function dec() {
    count.value -= 1
  }

  function setlinkIndex(u) {
    linkIndex.value = u
  }

  function setlink(u) {
    links.value = u
  }

  function setlistIndex(u) {
    listIndex.value = u
  }

  return {
    count,
    inc,
    dec,

    listIndex,
    linkIndex,
    links,
    setlistIndex,
    setlinkIndex,
    setlink,
  }
}