// import { useState,useEffect } from "react"
// import { generateDataOptions,months,years } from "../../utils/DataRender"
// // import "./FilterBox.css"
// const FilterBox = ({getMonthYear})=>{
//     const [selectedMonth,setSelectedMonth]=useState("January");
//     const [selectedYear,setSelectedYear]=useState(2023);

//     const monthToRender =()=>generateDataOptions(months)

//     const yearsToRender =()=>generateDataOptions(years)

//     const handleMonthChange=(e)=>{
//         setSelectedMonth(e.target.value)
//     }  
//     const handleYearChange=(e)=>{
//        setSelectedYear(Number(e.target.value))
//     } 
   
//     useEffect(()=>{
//         const updateParent=()=>{
//             getMonthYear(selectedMonth,selectedYear)
//         }
//         updateParent()
//     },[selectedMonth,selectedYear,getMonthYear])
//     return(
//         <div>
//            <form>
//                 <div className="w-[500px] h-[100px] px-6 flex justify-between items-center  rounded-[12px] border-[1px] border-green-300">
//                     <div className="month">
//                         <label htmlFor="month" className="text-[16px]">Month : </label>
//                         <select
//                             value={selectedMonth}
//                             onChange={handleMonthChange}
//                             className="text-[16px]"
//                         >
//                             {monthToRender()}
//                         </select>
//                     </div>
//                     <div className="year">
//                         <label htmlFor="year" className="text-[16px]">Year : </label>
//                         <select
//                             value={selectedYear}
//                             onChange={handleYearChange}
//                             className="text-[16px]"
//                         >
//                             {yearsToRender()}
//                         </select>
//                     </div>
//                 </div>
//             </form>
//         </div>
//     )
// }
// export default FilterBox;