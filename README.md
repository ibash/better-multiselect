# Better Multiselect

I like macos finder's multiselect. For some reason no one gets this right for
lists of items on the web. 

`Multiselect` tracks the selection state for various kinds of clicks so
selection doesn't feel broken.

[Try it out](https://codepen.io/ibash/pen/bGEYobb)

## Example

```
class Example extends React.Component {
  constructor() {
    super()
    this.selection = new Multiselect()
  }

  onClick(event, index) {
    console.log('click', index)
    if (event.metaKey) {
      this.selection.commandClick(index)
    } else if (event.shiftKey) {
      this.selection.shiftClick(index)
    } else {
      this.selection.click(index)
    }
    this.forceUpdate()
  }

  render() {
    const indexes = []
    for (var i = 0; i < 100; i++) {
      indexes.push(i)
    }

    const elements = []
    indexes.forEach((i) => {
      let style = {height: '16px', userSelect: 'none', '-webkit-user-select': 'none'}
      if (this.selection.isSelected(i)) {
        style.backgroundColor = 'blue'
        style.color = 'white'
      }

      elements.push(
        <div key={i} style={style} onClick={(event) => { this.onClick(event, i) }}>
          element - {i}
        </div>
      )
    })

    return (
      <div>
        {elements}
      </div>
    )
  }
}

ReactDOM.render(
  <Example/>,
  document.getElementById('root')
)

```
