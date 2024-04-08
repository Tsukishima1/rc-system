import NavigationBar from "@/components/navigation/NavigationBar";

const MainLayout = ({children}:{
    children: React.ReactNode
  }) => {
    return ( 
        <div className="min-h-screen pt-16">
            <NavigationBar />
            {children}
        </div>
     );
  }
  
  export default MainLayout;