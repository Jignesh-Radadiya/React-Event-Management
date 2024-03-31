import Navigation from "../../components/Navigation/Navigation.jsx";
// import "./Home.css";
const Home = () => {
    
    return (
      <div className="flex flex-col">
    <Navigation/>
    <div className="mt-[90px]"> 
        <div className="h-full w-full p-[20px] bg-transparent bg-cover bg-center rounded-lg" style={{ backgroundImage: "url('./image/Rectangle 7.png')" }}>
            {/* <p className="mt-4 text-white text-25 ml-10">Explore More</p> */}
            <a href="/EventList">
                <button className="rounded-md bg-green-600 mt-[520px] ml-10 px-10 py-2">Explore More Events</button>
            </a>
        </div>
        <div className="flex flex-wrap justify-between mt-8">
            <div className="w-1/4 p-2">
                <img src="./image/2.png" className="w-full" alt="image"></img>
            </div>
            <div className="w-1/4 p-2">
                <img src="./image/5.png" className="w-full" alt="image"/>
            </div>
            <div className="w-1/4 p-2">
                <img src="./image/Black and White Crown Gaming Logo 1.png" className="w-full" alt="image"/>
            </div>
            <div className="w-1/4 p-2">
                <img src="./image/Black Line art Guitar Store Logo (1) 1.png" className="w-full" alt="image"/>
            </div> 
        </div>
        <div className="flex flex-wrap mt-8">
            <div className="w-1/2 p-2">
                <img src="./image/1.jpg" className="w-full rounded-lg" alt="image"/>
                <img src="./image/2.jpg" className="w-full rounded-lg mt-2" alt="image"/>
                <img src="./image/3.jpg" className="w-full rounded-lg mt-2" alt="image"/>
                <img src="./image/4.jpg" className="w-full rounded-lg mt-2" alt="image"/>
                <img src="./image/5.jpg" className="w-full rounded-lg mt-2" alt="image"/>
                <img src="./image/8.jpg" className="w-full rounded-lg mt-2" alt="image"/>
                <img src="./image/7.jpg" className="w-full rounded-lg mt-2" alt="image"/>
                <img src="./image/11.jpg" className="w-full rounded-lg mt-2" alt="image"/>
                
            </div>
            <div className="w-1/2 p-2">
               
                <img src="./image/9.jpg" className="w-full rounded-lg mt-2" alt="image"/>
                <img src="./image/13.jpg" className="w-full rounded-lg mt-2" alt="image"/>
                <img src="./image/9.jpg" className="w-full rounded-lg mt-2" alt="image"/>
                <img src="./image/15.jpg" className="w-full rounded-lg mt-2" alt="image"/>
                <img src="./image/10.jpg" className="w-full rounded-lg mt-2" alt="image"/>
                <img src="./image/14.jpg" className="w-full rounded-lg mt-2" alt="image"/>
                <img src="./image/12.jpg" className="w-full rounded-lg mt-2" alt="image"/>
                <img src="./image/16.jpg" className="w-full rounded-lg" alt="image"/>
            </div>
        </div>
    </div>
</div>

    );
  };
  export default Home;
  






