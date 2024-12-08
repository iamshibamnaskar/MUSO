import {Card, CardHeader, CardFooter, Image, Button} from "@nextui-org/react";

export default function HeroSection({getSearchResults,data}) {
  console.log(data)
  return (
   <div> 
    {data.length>0&&<div className="max-w-[900px] gap-2 grid grid-cols-12 grid-rows-2 px-8">
   <Card className="col-span-12 sm:col-span-4 h-[300px]" >
     <CardHeader className="absolute z-10 top-1 flex-col !items-start">
       <p className="text-tiny text-white/60 uppercase font-bold">{data[0]['channel']['name']}</p>
     </CardHeader>
     <Image
      onClick={()=>{getSearchResults(data[0]['channel']['name'])}}
       removeWrapper
       alt="Card background"
       className="z-0 w-full h-full object-cover"
       src={data[0]['channel']['icon']}
     />
   </Card>
   <Card className="col-span-12 sm:col-span-4 h-[300px]"  >
     <CardHeader className="absolute z-10 top-1 flex-col !items-start">
       <p className="text-tiny text-white/60 uppercase font-bold">{data[1]['channel']['name']}</p>
     </CardHeader>
     <Image
      onClick={()=>{getSearchResults(data[1]['channel']['name'])}}
       removeWrapper
       alt="Card background"
       className="z-0 w-full h-full object-cover"
       src={data[1]['channel']['icon']}
     />
   </Card>
   <Card className="col-span-12 sm:col-span-4 h-[300px]"  >
     <CardHeader className="absolute z-10 top-1 flex-col !items-start">
       <p className="text-tiny text-white/60 uppercase font-bold">{data[2]['channel']['name']}</p>
     </CardHeader>
     <Image
      onClick={()=>{getSearchResults(data[2]['channel']['name'])}}
       removeWrapper
       alt="Card background"
       className="z-0 w-full h-full object-cover"
       src={data[2]['channel']['icon']}
     />
   </Card>
 </div>}
   </div>
  );
}
