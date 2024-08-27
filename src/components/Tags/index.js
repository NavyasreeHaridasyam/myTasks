import './index.css'

const Tags = props => {
  const {details, changeActiveTag, isActive} = props
  const {optionId, displayText} = details

  const className = isActive ? 'orange' : 'transparent'
  const onClickButton = () => {
    changeActiveTag(optionId)
  }

  return (
    <li className="list-tags">
      <button
        type="button"
        className={`tag-button ${className}`}
        onClick={onClickButton}
      >
        {displayText}
      </button>
    </li>
  )
}

export default Tags
