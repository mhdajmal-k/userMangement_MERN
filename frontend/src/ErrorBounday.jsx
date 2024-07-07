import React from "react";

class ErrorBoundary extends React.Component{
    constructor(props){
        super(props)
            this.state={hasError:false}
        
    }
   static getDerivedStateFromError(error){
    return { hasError: true };
   }
   componentDidCatch(error,errorInfo){
    console.error(error)
    console.error(errorInfo)
   }
   handleReload=()=>{
    window.location.reload()
   }

   render(){
    if(this.state.hasError){
        return (
            <div className="text-center w-full max-h-full bg-red-600 text-white p-4">
                <h1 >Something went wrong...</h1>
                <p>We encountered an error. Please try reloading the page.</p>
                <button onClick={this.handleReload} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded ">Reload Page</button>
            </div>
        )
    }
    return this.props.children
   }
}

export default ErrorBoundary