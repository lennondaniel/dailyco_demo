import React from "react";
import { ReactInternetSpeedMeter } from "react-internet-meter";
import './NetworkCheck.css'

function NetworkCheck ({ onCheckSpeed }) {
  
  const handleSpeedNetwork = speed => {
    // Calculate the bandwidth from the download speed
    const bandWidth = 1.7812869999999998/(speed/8);
    onCheckSpeed(bandWidth);
  }

  return (
    <ReactInternetSpeedMeter
      txtSubHeading="Checking the speed"
      outputType="empty"
      customClassName="speedmeter"
      txtMainHeading="Opps..."
      pingInterval={10000}
      thresholdUnit="megabyte"
      threshold={100}
      imageUrl="https://images.pexels.com/photos/3396664/pexels-photo-3396664.jpeg?cs=srgb&dl=pexels-josiah-farrow-3396664.jpg&fm=jpg"
      downloadSize="1781287" // bytes
      callbackFunctionOnNetworkTest={handleSpeedNetwork}
    />
  )
}

export default NetworkCheck;
