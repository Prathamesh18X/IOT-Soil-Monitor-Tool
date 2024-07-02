# IoT Agriculture Monitoring System
This IoT monitoring system uses ESP8266 microcontroller such as NodeMCU to monitor and upload soil's parameters. NodeMCU act as data acquisition node for soil's parameter such as soil moisture and temperature. Moreover, NodeMCU also used as server node so that the data from acquisition node can be upload to the IoT platform (ThingsBoard).

<br/>  
 

[comment]: # (Start of Requirements for this repo)
## <a name="repo-req"></a> Requirements for this repo  
**Hardware**
1. NodeMCU x 2
2. 5V Relay x 1  
4. AC Power Socket Rocker Switch 3 Pin x 1
5. 3 pin Wall Socket x 1
6. An Enclosure Box for Relay and MCU x 1
7. Soil Moisture Sensor x 2
8. DHT11 Soil and Humidity Sensor x2
9. ACS712 Current Sensor x1
10. 25V Voltage Sensor x1
11. CD4051 Analog Mux/ Demux x1
12. Schottky Diode 1N5822 x1
13. 3.3V Voltage Regulator x2  

<br/>  

**Software**
1. [Arduino IDE](https://www.arduino.cc/en/Main/Software)  
2. ThingsBoard (Demo version/ Professional Edition if you want to export the data to local PC)
3. VS code IDE
4. [MQTTX](https://mqttx.app/)
5. [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database)
  


<br/><br/>      
 
 
[comment]: # (Start of Hardware Setup)  
## <a name="hard-set"></a> Hardware Setup
The project consists of 4 hardware nodes which are sensor nodes, relay node, server node and power measure node (just to test power consumption). Figure below shows the fully integrated system for this project.  

<a name="BDFull"></a>  

<p align="center">
   <img src="https://i.ibb.co/C2PzJq8/AP-UOt6s-XOv7hcomx6-a-Cx-LBGX-F-s-Ge-IZLc-QI5ic7cpt-D41-YTys-REdvf-AOPL4531-Iyhiur-Km-Ro-Cz-Ir-S2ro-MAOj-P8f-Cx-Oq-Abqq-Dgs-PEgm-CFRNRGu8v-HXjm-Fpy-CLXhx-Zj-Vyc3w.png)">
</p>    


<br/><br/>    


## <a name="soft-set"></a> Software Setup   
### Arduino IDE
1. Setup the Arduino IDE.
2. Install the following libraries:  
> - ArduinoJson ver 5.13.5
> - ThingsBoard ver 0.2.0
> - PubSubClient ver 2.7.0
> - SDHT sensor library ver 2.0.0
> - uMQTTBroker 
> - ACS712 arduino 
3. Get the credentials such as TOKEN_ADDRESS, IP addresses of respective node (exclude power measure node) this and wifi credentials.  
4. Upload the codes to respective node.  

<br/>  

  
  
### DashBoard for Monitoring
1. Interface to representation of all devices/sensors
![image](https://github.com/Prathamesh18X/IOT-Soil-Monitor-Tool/assets/109477390/bb4726ea-429d-41f1-a38a-3b09a4b8110c)
2. Feature to add Device with serial number
![image](https://github.com/Prathamesh18X/IOT-Soil-Monitor-Tool/assets/109477390/fdc673d4-4a08-4cfd-b289-3355616ecc8e)


### MQTTX Interface
![image](https://github.com/Prathamesh18X/IOT-Soil-Monitor-Tool/assets/109477390/f3ddca87-369d-404f-b678-5bbed93f2026)

### ThingsBoard
1. Setup the ThingsBoard dashboard by referring  the setup should look like figure below.
![](https://i.ibb.co/M8qm8s5/FYP-Things-Board-Full-Dashboard.png)
2. Setup the rule engine of the ThingsBoard as shown below.
![](https://i.ibb.co/pXJvH0N/ny9fz-Nefm3-OMo-Gx4v-Wu-W46-FNu0h-Zx38-Kq-Ch-KBbx01zo5-Yj-Xg-Fv-Bob-Kjvm088-FSPyp8v7-Gvfd-BUW4p-U-Sl-Ul-NMD7-Wu-Wvu-J8-Eo-w-KXF-Pr4q-Pav-D7q-D0nxr-FLPT1v-LYEvb-ml-V4c.png)
