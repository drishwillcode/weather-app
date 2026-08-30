import requests
from dotenv import load_dotenv
import os
from dataclasses import dataclass

load_dotenv()
api_key=os.getenv('API_KEY')

@dataclass
class weatherdata:
    temp: float
    feels_like: float
    description: str
    humidity: int
    wind_speed: float
    sunrise: int
    sunset: int
    icon: str


def get_lat_long(city,api_key):
    resp=requests.get(f"http://api.openweathermap.org/geo/1.0/direct?q=+{city}&appid={api_key}").json()
    data=resp[0]
    lat,lon=data.get('lat'),data.get('lon')
    return lat,lon

def get_current_weather(lat,lon,api_key):
    resp=requests.get(f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lat}&units=metric&appid={api_key}").json()
    data=weatherdata(
        temp=resp.get('main').get('temp'),
        feels_like=resp.get('main').get('feels_like'),
        description=resp.get('weather')[0].get('description'),
        humidity=resp.get('main').get('humidity'),
        wind_speed=resp.get('wind').get('speed'),
        sunrise=resp.get('sys').get('sunrise'),
        sunset=resp.get('sys').get('sunset'),
        icon=resp.get('weather')[0].get('icon')

    )
    return data

if __name__=="__main__":
    lat,lon=get_lat_long("delhi",api_key)
    print(get_current_weather(lat,lon,api_key))