interface TabPanelProp {
  children?: JSX.Element
}

const TabPanel = ({ children }: TabPanelProp) => {
  return (
    <div className="bg-blue-400">
      여기는 tab panel
      {children}
    </div>
  )
}

export default TabPanel
