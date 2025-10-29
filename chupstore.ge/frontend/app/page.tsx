import Categoryslider from "./components/Categoryslider/Categoryslider";
import Cardbox from "./components/Cardbox/Cardbox";
import Anchor from "./components/Anchor/Anchor";
import LatestProducts from "./components/LatestProducts/LatestProducts";
import DeliveryInfo from "./components/DeliveryInfo/DeliveryInfo";



export default function Home() {
  return (
    <>
    <Categoryslider />
    <Cardbox />
    <Anchor />
    <LatestProducts />
    <DeliveryInfo />
    </>
  );
} 