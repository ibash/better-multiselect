# Better Multiselect

I like macos finder's multiselect. For some reason no one gets this right for
lists of items on the web. 

`Multiselect` tracks the selection state for various kinds of clicks so
selection doesn't feel broken.

[Try it out](https://codepen.io/ibash/pen/bGEYobb)

# The Rules

The rules of selection:

1. Anchor is where selection starts
2. Focus is where selection ends

--

1. Click

    1. move anchor and selection to the element clicked
    2. selection is the element clicked

2. Command click

    1. if the element is not selected
        1. move anchor and selection to the element clicked
        2. add it to the selection

    2. if the element is selected
        1. remove it from the selection
        2. anchor / focus move to: the next greatest selected, or the least index (backwards) from click point

3. shift click

    1. remove everything between anchor and focus
    2. move focus to where clicked
    3. add everything between focus and anchor

4. command takes precedence over shift


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
