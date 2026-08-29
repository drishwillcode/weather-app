import requests
from dotenv import load_dotenv
import os

load_dotenv()
api_key=os.getenv('API_KEY')

def get_lat_long(city,api_key):
    resp=requests.get(f"http://api.openweathermap.org/geo/1.0/direct?q=+{city}&appid={api_key}").json()
    data=resp[0]
    lat,lon=data.get('lat'),data.get('lon')
    return lat,lon
lat,lon=get_lat_long("delhi",api_key)
def get_current_weather(lat,lon,api_key):
    resp=requests.get(f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lat}&units=metric&appid={api_key}").json()
    return resp
print(get_current_weather(lat,lon,api_key))