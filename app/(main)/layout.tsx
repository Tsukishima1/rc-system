import NavigationBar from "@/components/navigation/NavigationBar";

const MainLayout = ({children}:{
    children: React.ReactNode
  }) => {
    return ( 
        <div>
            <NavigationBar />
            {children}
        </div>
     );
  }
  
  export default MainLayout;