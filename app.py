from flask import Flask,render_template,jsonify,request
from weather import main 


app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/weather')
def weather():
    city=request.args.get("city")
    data=main(city)
    if data is None:
        return jsonify({'error':"City not found"}),404
    return jsonify(data.__dict__)
if __name__ == "__main__":
    app.run(debug=True)