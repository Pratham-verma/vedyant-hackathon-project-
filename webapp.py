from flask import Flask, render_template, request
from PIL import Image
import numpy as np
from tensorflow.keras.preprocessing.image import load_img, img_to_array
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input
import os
import tensorflow as tf
from io import BytesIO

app = Flask(__name__)

# Load the trained model
model = tf.keras.models.load_model('vgg16model-3.h5')

# Create label mapping based on subdirectory names
main_data_dir = 'Segmented Medicinal Leaf Images\Segmented Medicinal Leaf Images'
label_mapping = {i: label for i, label in enumerate(sorted(os.listdir(main_data_dir)))}

# Function to preprocess image
def preprocess_image(image):
    image = load_img(image, target_size=(224, 224))
    image_array = img_to_array(image)
    image_array = np.expand_dims(image_array, axis=0)
    preprocessed_image = preprocess_input(image_array)
    return preprocessed_image

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return 'No file part'
    
    file = request.files['file']
    uploaded_image = request.files['file']
    img = Image.open(uploaded_image)

    # Convert image to BytesIO object
    img_bytes = BytesIO()
    img.save(img_bytes, format='JPEG')
    img_bytes = img_bytes.getvalue()

    # Preprocess and predict the image
    preprocessed_image = preprocess_image(BytesIO(img_bytes))
    predictions = model.predict(preprocessed_image)
    predicted_label_index = np.argmax(predictions)
    predicted_label = label_mapping[predicted_label_index]
    # Calculate confidence
    confidence = np.max(predictions) * 100
    

    # Render prediction template with results
    return render_template('result.html', predicted_label=predicted_label, confidence=confidence)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
