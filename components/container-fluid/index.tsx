function ContainerFluid({ className = '', children }) {
    return <div className={'container-fluid mx-auto px-8 ' + className}>{children}</div>
  }
  
  export default ContainerFluid
  