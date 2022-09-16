interface TabPanelProp {
  children?: JSX.Element
}

const TabPanel = ({ children }: TabPanelProp) => {
  return <div className="border ">{children}</div>
}

export default TabPanel
