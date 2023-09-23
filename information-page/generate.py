import requests
import json

def GetWeather(content):
    urls=["https://qqlykm.cn/api/weather/get","https://qqlykm.cn/api/alarm/get"]
    params={"key":"HOk7ppA6zlBoU7iW0q0ffLjahJ","city":"南昌"}
    respond=[requests.get(urls[0],params),requests.get(urls[1],params)]
    result=[json.loads(respond[0].text),json.loads(respond[1].text)]
    success=[result[0]["success"],result[1]["success"]]
    if success[0]:
        data=result[0]["data"]
        content+="## 🌤️**"+params["city"]+"**天气预报\n"
        content+="更新时间**"+result[0]["update_time"]+"**\n"
        content+="### ⏱️实时天气\n"
        content+="- "+data["current_weather"]+str(data["current_temperature"])+"℃\n"
        content+="### 😊今日天气预报\n"
        content+="- 今日天气："+data["today_weather"]+"\n"
        content+="- 气温："+str(data["today_high_temperature"])+"/"+str(data["today_low_temperature"])+"℃\n"
        content+="- AQI指数："+str(data["aqi"])+data["quality_level"]+"\n"
        content+="- 风向与风力："+data["wind_direction"]+str(data["wind_level"])+"级\n"
        content+="### 🤩未来六天天气预报\n"
        for i in range(2,len(data["forecast_list"])):
            forecast=data["forecast_list"][i]
            content+="- "+forecast["date"]+"\n"
            content+="  - 当日天气："+forecast["weather"]+"\n"
            content+="  - 当日气温："+str(forecast["high_temperature"])+"/"+str(forecast["low_temperature"])+"℃\n"
            content+="  - 当日风向与风力："+forecast["wind_direction"]+str(forecast["wind_level"])+"级\n"
    else:
        content+="😒天气数据获取失败\n"
    if success[1]:
        data=result[1]["data"]
        content+="### ❗天气预警\n"
        if type(data)==list:
            for i in range(len(data)):
                content+="#### "+data[i]["title"]+"\n"
                content+="> "+data[i]["content"]+"\n"
                content+="> ###### 发布时间："+data[i]["pub_time"]+"\n"
                content+="> ###### 结束时间："+data[i]["end_time"]+"\n"
            else:
                content+=data["msg"]+"\n"


    content+="\n"
    return content

content="# 这是一个信息页 \n"

content=GetWeather(content)

file=open("./index.md",mode='w',encoding="utf-8")
file.write(content)
file.close()
