from flask import Flask,render_template,jsonify,request
import requests



app = Flask(__name__)

api_key='a7c560aa1b68b9fc9316086b56c59736'

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/weather")
def weather():
    city=request.args.get("city")
    url = "https://api.openweathermap.org/data/2.5/weather"

    params={
        'q':city,
        'appid':api_key
    }
    response=requests.get(url,params=params)

    return jsonify(response.json())


if __name__ == "__main__":
    app.run(debug=True)