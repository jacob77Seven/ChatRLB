import os
from gtts import gTTS

filename = 'input.txt'
file = open(filename, 'r')

text = ''

for line in file:
    text += line

file.close()

tts = gTTS(text)

tts.save('speech1.mp3')

os.system('speech1.mp3')