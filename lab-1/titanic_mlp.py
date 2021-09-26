import numpy as np
import tensorflow as tf
import tensorflow_datasets as tfds

# Config
TRAIN_DATA_URL = "https://storage.googleapis.com/tf-datasets/titanic/train.csv"
TEST_DATA_URL = "https://storage.googleapis.com/tf-datasets/titanic/eval.csv"
BATCH_SIZE = 30
TRAINING_EPOCHS = 20
SHUFFLE_TIMES = 500

# Get dataset files
train_file_path = tf.keras.utils.get_file("train.csv", TRAIN_DATA_URL)
test_file_path = tf.keras.utils.get_file("eval.csv", TEST_DATA_URL)

# Make numpy values easier to read.
np.set_printoptions(precision=3, suppress=True)

LABEL_COLUMN = 'survived'
LABELS = [0, 1]

def get_dataset(file_path):
  dataset = tf.data.experimental.make_csv_dataset(
      file_path,
      batch_size=BATCH_SIZE,
      label_name=LABEL_COLUMN,
      na_value="?",
      num_epochs=1,
      ignore_errors=True)
  return dataset

raw_train_data = get_dataset(train_file_path)
raw_test_data = get_dataset(test_file_path)

print('Got {} batches, {} tensors each'.format(len(list(raw_train_data)), BATCH_SIZE))

# examples, labels = next(iter(raw_train_data)) # Just the first batch.
# print("EXAMPLES: \n", examples, "\n")
# print("LABELS: \n", labels)

# Crearte categorical columns 

CATEGORIES = {
    'sex': ['male', 'female'],
    'class' : ['First', 'Second', 'Third'],
    'deck' : ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
    'embark_town' : ['Cherbourg', 'Southhampton', 'Queenstown'],
    'alone' : ['y', 'n']
}

categorical_columns = []
for feature, vocab in CATEGORIES.items():
  cat_col = tf.feature_column.categorical_column_with_vocabulary_list(
        key=feature, vocabulary_list=vocab)
  categorical_columns.append(tf.feature_column.indicator_column(cat_col))

# print(categorical_columns)  

# Create numerical columns by normalizing number data 
def process_continuous_data(mean, data):
  # Normalize data
  data = tf.cast(data, tf.float32) * 1/(2*mean)
  return tf.reshape(data, [-1, 1])

MEANS = {
    'age' : 29.631308,
    'n_siblings_spouses' : 0.545455,
    'parch' : 0.379585,
    'fare' : 34.385399
}

numerical_columns = []

for feature in MEANS.keys():
  normalizer_fn = lambda data, mean=MEANS[feature]: process_continuous_data(mean, data)
  num_col = tf.feature_column.numeric_column(feature, normalizer_fn=normalizer_fn)
  numerical_columns.append(num_col)

#print(numerical_columns)

# Creating and compiling MLP model
preprocessing_layer = tf.keras.layers.DenseFeatures(categorical_columns+numerical_columns)

model = tf.keras.Sequential([
  preprocessing_layer,
  tf.keras.layers.Dense(128, activation='relu'),
  tf.keras.layers.Dense(128, activation='relu'),
  tf.keras.layers.Dense(1, activation='sigmoid'),
])

model.compile(
    loss='binary_crossentropy',
    optimizer='adam',
    metrics=['accuracy'])

# Preparing shuffled data for training 
train_data = raw_train_data.shuffle(SHUFFLE_TIMES)
test_data = raw_test_data

# Training
model.fit(train_data, epochs=TRAINING_EPOCHS)

#Evaluating
test_loss, test_accuracy = model.evaluate(test_data)
print('\n\nTest Loss {}, Test Accuracy {}'.format(test_loss, test_accuracy))