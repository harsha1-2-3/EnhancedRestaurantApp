import './index.css'

const TabItem = props => {
  const {onClickTab, tabDetails, isTabActive} = props
  const {menuCategoryId, menuCategory} = tabDetails

  const clickedTab = () => {
    onClickTab(menuCategoryId)
  }

  const activeTabClass = isTabActive ? 'TabBtnActive' : ''

  return (
    <li className="TabLi">
      <button
        type="button"
        onClick={clickedTab}
        className={`TabBtn ${activeTabClass}`}
      >
        {menuCategory}
      </button>
    </li>
  )
}
export default TabItem
