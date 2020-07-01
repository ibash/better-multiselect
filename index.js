// NOTE(ibash)
// For keyboards:
// 1. up / down is treated like a click on the elment in that direction
// 2. shift+up / shift+down is treated like shift click in that direction
export default class Multiselect {

  constructor() {
    this.anchor = 0
    this.focus = 0
    this.selection = new Set()
  }

  reset() {
    this.anchor = 0
    this.focus = 0
    this.selection = new Set()
  }

  isSelected(index) {
    return this.selection.has(index)
  }

  click(index) {
    // anchor and focus collapse to the element
    this.anchor = index
    this.focus = index

    // only the clicked element is selected
    this.selection.clear()
    this.selection.add(index)
  }

  // NOTE(ibash) in finder command takes precedence over shift. That is if you
  // command+shift+click an element, it acts like a command click.
  commandClick(index) {
    if (this.selection.has(index)) {
      // anchor/focus move to the next selected element with a larger index, if
      // there isn't one then it moves to the next selected with a smaller
      // index. Finally, if that doesn't exist they reset to 0.

      let isFound

      // search forwards
      const values = Array.from(this.selection.values())
      const max = Math.max(...values)
      for (var i = index + 1; i < max; i++) {
        if (this.selection.has(i)) {
          this.anchor = i
          this.focus = i
          isFound = true
          break
        }
      }

      // search backwards
      if (!isFound) {
        for (i = index - 1; i > -1; i--) {
          if (this.selection.has(i)) {
            this.anchor = i
            this.focus = i
            isFound = true
            break
          }
        }
      }

      // nothing selected
      if (!isFound) {
        this.anchor = 0
        this.focus = 0
      }

      this.selection.delete(index)

    } else {
      this.anchor = index
      this.focus = index
      this.selection.add(index)
    }
  }

  shiftClick(index) {
    let start = Math.min(this.anchor, this.focus)
    let end = Math.max(this.anchor, this.focus)

    // remove between anchor and focus
    for (var i = start; i <= end; i++) {
      this.selection.delete(i)
    }

    this.focus = index

    start = Math.min(this.anchor, this.focus)
    end = Math.max(this.anchor, this.focus)

    for (i = start; i <= end; i++) {
      this.selection.add(i)
    }
  }
}
