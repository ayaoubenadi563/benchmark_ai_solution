from flask import Flask, request, jsonify
import time

app = Flask(__name__)

@app.route('/generate', methods=['POST'])
def generate():
    data = request.get_json()
    prompt = data.get('prompt', '')

    start_time = time.time()

    # Réponse simulée IA
    time.sleep(1.0)
    response = f"Réponse simulée pour : {prompt}"

    return jsonify({
        "response": response,
        "time": round(time.time() - start_time, 2)
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
