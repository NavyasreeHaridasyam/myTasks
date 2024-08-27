import {Component} from 'react'

import {v4} from 'uuid'

import Tags from './components/Tags'
import './App.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class App extends Component {
  state = {
    myTasks: [],
    input: '',
    selectTag: tagsList[0].displayText,
    activeTag: 'INITIAL',
  }

  onChangeInput = event => {
    this.setState({input: event.target.value})
  }

  onChangeTag = event => {
    this.setState({selectTag: event.target.value})
  }

  addTaskButton = () => {
    const {input, selectTag} = this.state

    const taskName = input
    const tag = selectTag
    const id = v4()

    this.setState(prevState => ({
      myTasks: [...prevState.myTasks, {id, taskName, tag}],
      input: '',
      selectTag: tagsList[0].optionId,
    }))
  }

  changeActiveTag = optionId => {
    this.setState(prevState => ({
      activeTag: prevState.activeTag === optionId ? 'INITIAL' : optionId,
    }))
  }

  render() {
    const {input, selectTag, myTasks, activeTag} = this.state

    const filteredTasks =
      activeTag === 'INITIAL'
        ? myTasks
        : myTasks.filter(each => each.tag === activeTag)

    return (
      <div className="bg-container">
        <div className="task-container">
          <h1 className="task-heading">Create a task!</h1>
          <form className="task-container">
            <label className="label" htmlFor="task">
              Task
            </label>
            <input
              id="task"
              type="text"
              value={input}
              className="input"
              placeholder="Enter the task here"
              onChange={this.onChangeInput}
            />
            <label htmlFor="tags" className="label">
              Tags
            </label>
            <select
              id="tags"
              value={selectTag}
              className="select-container"
              onChange={this.onChangeTag}
            >
              {tagsList.map(eachTag => (
                <option value={eachTag.optionId} key={eachTag.optionId}>
                  {eachTag.displayText}
                </option>
              ))}
            </select>

            <div className="button-container">
              <button
                className="button"
                type="button"
                onClick={this.addTaskButton}
              >
                Add Task
              </button>
            </div>
          </form>
        </div>
        <div className="tags-container">
          <h1 className="tag-heading">Tags</h1>
          <ul className="tags">
            {tagsList.map(each => (
              <Tags
                key={each.optionId}
                details={each}
                changeActiveTag={this.changeActiveTag}
                isActive={activeTag === each.optionId}
              />
            ))}
          </ul>
          <h1 className="tag-heading">Tasks</h1>
          {filteredTasks.length !== 0 ? (
            <ul>
              {filteredTasks.map(eachTask => (
                <li className="my-tasks-container" key={eachTask.id}>
                  <p className="para">{eachTask.taskName}</p>
                  <p className="mytasks-para">{eachTask.tag}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-tasks">No tasks added yet!</p>
          )}
        </div>
      </div>
    )
  }
}

export default App
