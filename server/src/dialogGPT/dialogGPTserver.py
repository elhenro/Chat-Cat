import logging
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
#CORS(app, resources={r"/chat": {"origins": "http://localhost:3000"}})
CORS(app)

#app.config['CORS_HEADERS'] = 'Content-Type'

tokenizer = AutoTokenizer.from_pretrained("microsoft/DialoGPT-medium")
model = AutoModelForCausalLM.from_pretrained("microsoft/DialoGPT-medium")

@app.route('/chat', methods=['POST'])
@cross_origin()
def chat():
    logging.getLogger('flask_cors').level = logging.DEBUG
    input_text = request.json['input']
    new_user_input_ids = tokenizer.encode(input_text + tokenizer.eos_token, return_tensors='pt')
    # append the new user input tokens to the chat history
    chat_history_ids = new_user_input_ids
    # generate a response
    chat_history_ids = model.generate(chat_history_ids, max_length=1000, pad_token_id=tokenizer.eos_token_id)

    response = tokenizer.decode(chat_history_ids[:, new_user_input_ids.shape[-1]:][0], skip_special_tokens=True)
    return jsonify({'response': response})

if __name__ == '__main__':
    print('Server is running on port 5000')
    app.run(debug=True)

#importlib.reload(app)